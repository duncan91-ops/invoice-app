from django.urls import path

from .views import InvoiceCreateAPIView, InvoiceListAPIView, InvoiceUpdateAPIView

urlpatterns = [
    path("", InvoiceListAPIView.as_view(), name="invoice_list"),
    path("create/", InvoiceCreateAPIView.as_view(), name="invoice_create"),
    path(
        "update/<str:invoice_id>/",
        InvoiceUpdateAPIView.as_view(),
        name="invoice_update",
    ),
]
