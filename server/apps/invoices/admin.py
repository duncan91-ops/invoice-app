from django.contrib import admin

from .models import Invoice, ClientAddress, SenderAddress, Item


class ClientAddressInline(admin.TabularInline):
    model = ClientAddress


class SenderAddressInline(admin.TabularInline):
    model = SenderAddress


class ItemInline(admin.TabularInline):
    model = Item


class InvoiceAdmin(admin.ModelAdmin):
    inlines = [
        SenderAddressInline,
        ClientAddressInline,
        ItemInline,
    ]
    list_display = [
        "pkid",
        "id",
        "invoice_no",
        "user",
        "payment_terms",
        "status",
        "total",
    ]
    list_display_links = ["id", "invoice_no"]
    list_filter = ["user", "payment_terms", "status"]


admin.site.register(Invoice, InvoiceAdmin)
