from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    CategoryViewSet,
    BudgetViewSet,
    MonedaListView,
    PaisListView
)

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'budgets', BudgetViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('monedas/', MonedaListView.as_view(), name='monedas-list'),
    path('paises/', PaisListView.as_view(), name='paises-list'),
]