import logging
from datetime import datetime, timedelta

from django.utils import timezone

from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Invoice, Item, ClientAddress, SenderAddress

logger = logging.getLogger(__name__)


class ClientAddressSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = ClientAddress
        fields = ["country", "city", "street", "post_code"]


class SenderAddressSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = SenderAddress
        fields = ["country", "city", "street", "post_code"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "quantity", "price", "total"]


class InvoiceSerializer(serializers.ModelSerializer):
    sender_address = SenderAddressSerializer()
    client_address = ClientAddressSerializer()
    items = ItemSerializer(many=True)
    payment_due = serializers.DateTimeField(format="%d %b %Y")

    class Meta:
        model = Invoice
        fields = [
            "id",
            "invoice_no",
            "created_at",
            "description",
            "payment_terms",
            "payment_due",
            "sender_address",
            "client_name",
            "client_email",
            "client_address",
            "status",
            "items",
            "total",
        ]
    
    def create(self, validated_data):
        user = self.context["request"].user
        client_address_data = validated_data.pop("client_address")
        sender_address_data = validated_data.pop("sender_address")
        items_data = validated_data.pop("items")
        invoice = Invoice.objects.create(
            user=user, **validated_data
        )
        ClientAddress.objects.create(invoice=invoice, **client_address_data)
        SenderAddress.objects.create(invoice=invoice, **sender_address_data)
        for item_data in items_data:
            Item.objects.create(invoice=invoice, **item_data)
        return invoice

    def update(self, instance, validated_data):
        client_address_data = validated_data.pop("client_address")
        sender_address_data = validated_data.pop("sender_address")
        items_data = validated_data.pop("items")
        if validated_data.get("status") == "pending" and instance.status == "draft":
            payment_due = datetime.now() + timedelta(
                days=validated_data.get("payment_terms")
            )
            instance.payment_due = payment_due
        instance.description = validated_data.get("description", instance.description)
        instance.payment_terms = validated_data.get(
            "payment_terms", instance.payment_terms
        )
        instance.client_name = validated_data.get("client_name", instance.client_name)
        instance.client_email = validated_data.get(
            "client_email", instance.client_email
        )
        instance.status = validated_data.get("status", instance.status)
        instance.total = validated_data.get("total", instance.total)
        instance.save()

        client_address = instance.client_address
        client_address.country = client_address_data.get(
            "country", client_address.country
        )
        client_address.city = client_address_data.get("city", client_address.city)
        client_address.street = client_address_data.get("street", client_address.street)
        client_address.post_code = client_address_data.get(
            "post_code", client_address.post_code
        )
        client_address.save()

        sender_address = instance.sender_address
        sender_address.country = sender_address_data.get(
            "country", sender_address.country
        )
        sender_address.city = sender_address_data.get("city", sender_address.city)
        sender_address.street = sender_address_data.get("street", sender_address.street)
        sender_address.post_code = sender_address_data.get(
            "post_code", sender_address.post_code
        )
        sender_address.save()

        items = instance.items.all()
        for item in items:
            item.delete()

        for item_data in items_data:
            Item.objects.create(invoice=instance, **item_data)

        return instance
