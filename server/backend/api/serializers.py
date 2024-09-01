from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Property, Tenant, Payment


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8, 
        error_messages={"min_length": "Password must be at least 8 characters long."},
    )

    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    



class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class TenantSerializer(serializers.ModelSerializer):
    property_name = serializers.CharField(source='property.name', read_only=True)

    class Meta:
        model = Tenant
        fields = ['id', 'name', 'telephone', 'section', 'property','property_name', 'created_at', 'updated_at']

class PaymentSerializer(serializers.ModelSerializer):
    property_name = serializers.CharField(source='tenant.property.name', read_only=True)
    tenant_name = serializers.CharField(source='tenant.name', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'tenant','tenant_name', 'amount', 'date', 'is_settled', 'property_name']
    


