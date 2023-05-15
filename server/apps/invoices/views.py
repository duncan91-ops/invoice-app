from datetime import timedelta

from django.utils import timezone

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import InvoiceNotFound, NotYourInvoice
from .models import Invoice
from .pagination import InvoicePagination
from .serializers import InvoiceSerializer, InvoiceCreateSerializer, InvoiceUpdateSerializer


class InvoiceFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name="status", lookup_expr='iexact')
    client_email = django_filters.CharFilter(field_name="client_email", lookup_expr="iexact")

    class Meta:
        model = Invoice
        fields = [
            'status',
            'client_email',
        ]


class InvoiceListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InvoiceSerializer
    pagination_class = InvoicePagination
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    filterset_class = InvoiceFilter
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        queryset = Invoice.objects.filter(user=user)
        return queryset


class InvoiceCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        payment_due = timezone.now() + timedelta(days=data.get('payment_terms'))
        data['payment_due'] = payment_due
        serializer = InvoiceCreateSerializer(data=data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


class InvoiceDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InvoiceSerializer
    lookup_field = "id"
    lookup_url_kwarg = "invoice_id"

    def get_queryset(self):
        user = self.request.user
        queryset = Invoice.objects.filter(user=user)
        return queryset


class InvoiceUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, invoice_id):
        try:
            invoice = Invoice.objects.get(id=invoice_id)
        except Invoice.DoesNotExist:
            raise InvoiceNotFound

        user_email = invoice.user.email
        if user_email != request.user.email:
            return NotYourInvoice

        data = request.data
        serializer = InvoiceUpdateSerializer(instance=invoice, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_invoice_api_view(request, invoice_id):
    try:
        invoice = Invoice.objects.get(id=invoice_id)
    except Invoice.DoesNotExist:
        return Response(
            {"error": "invoice does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    user_email = invoice.user.email
    if user_email != request.user.email:
        return Response(
            {"error": "Cannot delete invoice that does not belong to you"},
            status=status.HTTP_403_FORBIDDEN,
        )

    delete_operation = invoice.delete()
    if delete_operation:
        return Response({"success": "Deletion Successful"})
    return Response({"failure": "Deletion failed"})
