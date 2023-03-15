# Generated by Django 4.1.7 on 2023-03-15 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import uuid


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Client",
            fields=[
                (
                    "pkid",
                    models.BigAutoField(
                        editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "id",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "first_name",
                    models.CharField(max_length=50, verbose_name="Client First Name"),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=50, verbose_name="Client Last Name"
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        max_length=254, verbose_name="Client Email Address"
                    ),
                ),
                (
                    "country",
                    django_countries.fields.CountryField(
                        max_length=2, verbose_name="Client Country"
                    ),
                ),
                ("city", models.CharField(max_length=180, verbose_name="Client City")),
                (
                    "street",
                    models.CharField(max_length=255, verbose_name="Client Street"),
                ),
                (
                    "post_code",
                    models.CharField(max_length=150, verbose_name="Client Post Code"),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="clients",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "unique_together": {("user", "email")},
            },
        ),
    ]
