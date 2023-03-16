from rest_framework.exceptions import APIException


class InvoiceNotFound(APIException):
    status_code = 404
    default_detail = "The requested invoice cannot be found"


class NotYourInvoice(APIException):
    status_code = 403
    default_detail = (
        "You are not allowed to edit an invoice that does not belong to you"
    )
