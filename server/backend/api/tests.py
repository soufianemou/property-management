# myapp/tests.py
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Tenant, Property

class TenantViewSetCreateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.property = Property.objects.create(
            name='Test Property',
            address='123 Test Street',
            type='house',
            units=3,
            rental_cost=1500.00
        )

    def test_create_tenant(self):
        tenant_data = {
            'name': 'Jane Doe',
            'telephone': '0987654321',
            'property': self.property.id,
        }
        response = self.client.post(reverse('tenant-list'), tenant_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Tenant created successfully')

        self.assertEqual(Tenant.objects.count(), 1)
        new_tenant = Tenant.objects.first()
        self.assertEqual(new_tenant.name, 'Jane Doe')
        self.assertEqual(new_tenant.telephone, '0987654321')
        self.assertEqual(new_tenant.property, self.property)
