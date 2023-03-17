from django.urls import path

from .views import ClientListAPIView, ClientUpdateAPIView, delete_client_api_view

urlpatterns = [
    path("", ClientListAPIView.as_view(), name="client_list"),
    path(
        "update/<str:client_id>/", ClientUpdateAPIView.as_view(), name="client_update"
    ),
    path("delete/<str:client_id>/", delete_client_api_view, name="client_delete"),
]
