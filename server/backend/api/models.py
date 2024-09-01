from django.db import models
from datetime import date as d


class Property(models.Model):
    TYPE_CHOICES = [
        ('house', 'house'),
        ('apartment', 'apartment'),
        ('office', 'office'),
        ('duplex', 'duplex'),
    ]
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=255)
    type = models.CharField(max_length=50,choices=TYPE_CHOICES)
    units = models.IntegerField(default=0)
    rental_cost = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'

class Tenant(models.Model):
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=15)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='tenants')
    section = models.CharField(max_length=50, default='Unknown')  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'

class Payment(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    is_settled = models.BooleanField(default=False)
    due_date = models.DateField(default=d.today)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Payment of {self.amount} by {self.tenant.name}"