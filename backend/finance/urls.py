from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    CategoryViewSet,
    BudgetViewSet,
    MonedaListView,
    PaisListView,
    UsuarioCreateView,
    UsuarioListView,
    UsuarioLoginView  # Importación de la vista de inicio de sesión
)

# Registro de rutas para los viewsets
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'budgets', BudgetViewSet)

# Definición de rutas
urlpatterns = [
    # Rutas para los viewsets
    path('', include(router.urls)),

    # Rutas específicas para las vistas basadas en APIView
    path('monedas/', MonedaListView.as_view(), name='monedas-list'),
    path('paises/', PaisListView.as_view(), name='paises-list'),

    # Rutas para usuario (registro y listado)
    path('usuario/registro/', UsuarioCreateView.as_view(), name='usuario-registro'),
    path('usuario/', UsuarioListView.as_view(), name='usuarios-list'),

    # Ruta para inicio de sesión
    path('usuario/login/', UsuarioLoginView.as_view(), name='usuario-login'),
]
