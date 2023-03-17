from datetime import timedelta

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import ClientAddress


@receiver(post_save, sender=ClientAddress)
def update_invoice_payment_due_date(sender, instance, **kwargs):
    invoice = instance.invoice
    status = invoice.status
    if status == "pending":
        invoice.payment_due = invoice.created_at + timedelta(days=invoice.payment_terms)
        invoice.save()
