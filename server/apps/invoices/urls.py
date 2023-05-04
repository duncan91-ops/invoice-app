from django.urls import path

from .views import (
    InvoiceCreateAPIView,
    InvoiceListAPIView,
    InvoiceUpdateAPIView,
    delete_invoice_api_view,
    delete_item_api_view,
)

urlpatterns = [
    path("", InvoiceListAPIView.as_view(), name="invoice_list"),
    path("create/", InvoiceCreateAPIView.as_view(), name="invoice_create"),
    path(
        "<str:invoice_id>/update/",
        InvoiceUpdateAPIView.as_view(),
        name="invoice_update",
    ),
    path("<str:invoice_id>/delete/", delete_invoice_api_view, name="invoice_delete"),
    path("items/delete/<str:item_id>/", delete_item_api_view, name="item_delete"),
]
