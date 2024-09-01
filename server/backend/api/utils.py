import logging
from django.utils import timezone
from .models import Payment

logger = logging.getLogger(__name__)

def mock_send_email(subject, message, recipient_email):
    """
    Mock function to simulate sending an email.
    """
    logger.info(f"Mocking email send to: {recipient_email}")
    logger.info(f"Subject: {subject}")
    logger.info(f"Message: {message}")

def check_and_notify_due_payments():
    """
    Check for due payments and send mock notifications.
    """
    today = timezone.now().date()
    due_payments = Payment.objects.filter(due_date__lte=today, is_paid=False)
    
    for payment in due_payments:
        tenant = payment.tenant
        subject = f"Payment Due for {payment.tenant.property.name}"
        message = f"Dear {tenant.name},\n\nYour payment of {payment.amount} for {payment.tenant.property.name} was due on {payment.due_date}. Please make the payment as soon as possible.\n\nThank you."
        
        recipient_email = f"{tenant.name.replace(' ', '.')}@gmail.com"
        
        mock_send_email(subject, message, recipient_email)
        
    logger.info(f"Checked {due_payments.count()} due payments and sent notifications.")
