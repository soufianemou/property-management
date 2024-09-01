from django.core.management.base import BaseCommand
from ...utils import check_and_notify_due_payments

class Command(BaseCommand):
    help = 'Send notifications for due payments'

    def handle(self, *args, **options):
        check_and_notify_due_payments()
        self.stdout.write(self.style.SUCCESS('Successfully sent payment notifications'))