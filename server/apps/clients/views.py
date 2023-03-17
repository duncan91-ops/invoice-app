from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Client
from .serializers import ClientSerializer


class ClientListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClientSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Client.objects.filter(user=user)
        return queryset


class ClientUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, client_id):
        try:
            client = Client.objects.get(id=client_id)
        except Client.DoesNotExist:
            return Response(
                {"error": "client requested does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        user_email = client.user.email
        if user_email != request.user.email:
            return Response(
                {
                    "error": "You are not allowed to edit client that does not belong to you"
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data
        serializer = ClientSerializer(instance=client, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_client_api_view(request, client_id):
    try:
        client = Client.objects.get(id=client_id)
    except Client.DoesNotExist:
        return Response(
            {"error": "client requested does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    user_email = client.user.email
    if user_email != request.user.email:
        return Response(
            {
                "error": "You are not allowed to delete client that does not belong to you"
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    delete_operation = client.delete()
    if delete_operation:
        return Response({"success": "Deletion was successful"})
    return Response({"error": "Deletion failed"})
