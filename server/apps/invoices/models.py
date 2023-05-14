import random
import string

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import TimeStampedUUIDModel, Address

CustomUser = get_user_model()


class Invoice(TimeStampedUUIDModel):
    class PaymentTerms(models.IntegerChoices):
        ONE = 1, _("Net 1 Day")
        SEVEN = 7, _("Net 7 Days")
        FOURTEEN = 14, _("Net 14 Days")
        THIRTY = 30, _("Net 30 Days")

    class Status(models.TextChoices):
        PENDING = "pending", _("Pending")
        PAID = "paid", _("Paid")
        DRAFT = "draft", _("Draft")

    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="invoices"
    )
    invoice_no = models.CharField(
        verbose_name=_("Invoice Number"), max_length=6, blank=True, null=True
    )
    description = models.CharField(
        verbose_name=_("Description"), max_length=255, blank=True
    )
    payment_terms = models.IntegerField(
        verbose_name=_("Payment Terms"),
        choices=PaymentTerms.choices,
        default=PaymentTerms.ONE,
    )
    payment_due = models.DateTimeField(
        verbose_name=_("Payment Due Date")
    )
    client_name = models.CharField(
        verbose_name=_("Client Name"), max_length=150, blank=True
    )
    client_email = models.EmailField(verbose_name=_("Client Email Address"), blank=True)
    status = models.CharField(
        verbose_name=_("Status"),
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )
    total = models.DecimalField(
        verbose_name=_("Total Cost"),
        max_digits=10,
        decimal_places=2,
        blank=True,
        default=0.00,
    )

    class Meta:
        unique_together = ["user", "invoice_no"]

    def __str__(self):
        return f"Invoice #{self.invoice_no}"

    def save(self, *args, **kwargs):
        if not self.invoice_no:
            letters = "".join(random.choices(string.ascii_uppercase, k=2))
            nums = "".join(random.choices(string.digits, k=4))
            self.invoice_no = letters + nums
        return super(Invoice, self).save(*args, **kwargs)


class ClientAddress(Address):
    invoice = models.OneToOneField(
        Invoice, on_delete=models.CASCADE, related_name="client_address"
    )

    def __str__(self):
        return "Client Address"


class SenderAddress(Address):
    invoice = models.OneToOneField(
        Invoice, on_delete=models.CASCADE, related_name="sender_address"
    )

    def __str__(self):
        return "Sender Address"


class Item(TimeStampedUUIDModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(verbose_name=_("Item Name"), max_length=255, blank=True)
    quantity = models.IntegerField(verbose_name=_("Quantity"), default=0, blank=True)
    price = models.DecimalField(
        verbose_name=_("Item Price"),
        max_digits=8,
        decimal_places=2,
        blank=True,
        default=0.00,
    )
    total = models.DecimalField(
        verbose_name=_("Total Cost"),
        max_digits=10,
        decimal_places=2,
        blank=True,
        default=0.00,
    )

    class Meta:
        unique_together = ["invoice", "name"]

    def __str__(self):
        return f"Item -> {self.name}"
