from __future__ import absolute_import
import os
from invoices_project.settings import base
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "invoices_project.settings.development")

app = Celery("invoices")

app.config_from_object("invoices_project.settings.development", namespace="CELERY")

app.autodiscover_tasks(lambda: base.INSTALLED_APPS)
