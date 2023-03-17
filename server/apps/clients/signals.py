from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from apps.invoices.models import Invoice, ClientAddress
from .models import Client


@receiver(post_save, sender=ClientAddress)
def add_client(sender, instance, **kwargs):
    invoice = instance.invoice
    status = invoice.status
    if status == "pending":
        email = invoice.client_email
        try:
            Client.objects.get(email=email)
        except Client.DoesNotExist:
            user = invoice.user
            names = invoice.client_name.split(" ")
            first_name = names[0]
            try:
                last_name = names[1]
            except IndexError:
                last_name = ""
            country = instance.country
            city = instance.city
            street = instance.street
            post_code = instance.post_code
            Client.objects.create(
                user=user,
                first_name=first_name,
                last_name=last_name,
                email=email,
                country=country,
                city=city,
                street=street,
                post_code=post_code,
            )
