from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    AddTransactionView,
    CategoryViewSet,
    BudgetViewSet,
    MonedaListView,
    PaisListView,
    CategoryListView,
    TransactionListView,
    BudgetListView,
    UsuarioCreateView,
    UsuarioListView,
    CategoryCreateView,
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
    path('categorias/', CategoryListView.as_view(), name='categorias-list'),
    path('transactions/', TransactionListView.as_view(), name='transactions-list'),
    path('categorias/crear/', CategoryCreateView.as_view(), name='categorias-crear'),
    path('transacciones/', TransactionListView.as_view(), name='transacciones-list'),
    path('presupuestos/', BudgetListView.as_view(), name='presupuestos-list'),
    path('api/finance/add_transaction/', AddTransactionView.as_view(), name='add_transaction'),

    # Rutas para usuario (registro y listado)
    path('usuario/registro/', UsuarioCreateView.as_view(), name='usuario-registro'),
    path('usuario/', UsuarioListView.as_view(), name='usuarios-list'),

    # Ruta para inicio de sesión
    path('usuario/login/', UsuarioLoginView.as_view(), name='usuario-login'),
]
