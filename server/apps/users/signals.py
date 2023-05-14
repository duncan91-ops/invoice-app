from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.invoices.models import Invoice


@receiver(post_save, sender=Invoice)
def update_invoice_count(sender, instance, created, **kwargs):
    if created:
        if instance.status == 'draft':
            instance.user.total_invoice_count += 1
            instance.user.draft_invoice_count += 1
        elif instance.status == 'pending':
            instance.user.total_invoice_count += 1
            instance.user.pending_invoice_count += 1
        instance.user.save()
    else:
        if instance.status == 'pending':
            instance.user.draft_invoice_count -= 1
            instance.user.pending_invoice_count += 1
        elif instance.status == 'pending':
            instance.user.pending_invoice_count -= 1
            instance.user.paid_invoice_count += 1
        instance.user.save()