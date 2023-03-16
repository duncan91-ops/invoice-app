from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import InvoiceNotFound, NotYourInvoice
from .models import Invoice
from .serializers import InvoiceSerializer


class InvoiceListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Invoice.objects.filter(user=user)
        return queryset


class InvoiceCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = InvoiceSerializer(data=data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


class InvoiceUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, invoice_id):
        try:
            invoice = Invoice.objects.get(id=invoice_id)
        except Invoice.DoesNotExist:
            raise InvoiceNotFound

        user_email = invoice.user.email
        if user_email != request.user.email:
            return NotYourInvoice

        data = request.data
        serializer = InvoiceSerializer(instance=invoice, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)
