from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, TenantViewSet, PaymentViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'tenants', TenantViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]