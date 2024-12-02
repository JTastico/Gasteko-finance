from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction, Category, Budget

# Import coin and country models
from .models import Moneda, Pais, Usuario
# Import serializer coins, country and user
from .serializers import MonedaSerializer, PaisSerializer, UsuarioSerializer

# Import APIView
from rest_framework.views import APIView


from .serializers import (
    TransactionSerializer, 
    CategorySerializer, 
    BudgetSerializer
)
from django.db.models import Sum
from django.utils import timezone
import calendar
from rest_framework.permissions import IsAuthenticated

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """ Filtra las transacciones por el usuario autenticado. """
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def monthly_summary(self, request):
        """
        Devuelve un resumen mensual de ingresos, gastos y balance.
        """
        # Obtener el año y mes desde los parámetros de la solicitud
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        # Filtrar las transacciones por fecha y tipo
        transactions = self.get_queryset().filter(
            transaction_date__year=year,
            transaction_date__month=month
        )
        
        # Agregar los totales de ingresos y gastos
        total_income = transactions.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expenses = transactions.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        
        # Calcular el balance
        balance = total_income - total_expenses
        
        return Response({
            'total_income': total_income,
            'total_expenses': total_expenses,
            'balance': balance
        })

    @action(detail=False, methods=['GET'])
    def expense_by_category(self, request):
        """
        Devuelve los gastos por categoría para el mes y año especificado.
        """
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        # Filtrar solo los gastos del usuario y por fecha
        expenses = self.get_queryset().filter(
            transaction_date__year=year,
            transaction_date__month=month,
            type='expense'
        ).values('category__name', 'category__icon').annotate(total=Sum('amount'))
        
        return Response(list(expenses))


class CategoryCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder a esta vista

    def post(self, request):
        """
        Crea una nueva categoría con el nombre proporcionado en la solicitud.
        """
        serializer = CategorySerializer(data=request.data)

        # Verificar que los datos proporcionados sean válidos
        if serializer.is_valid():
            # Guardar la nueva categoría en la base de datos
            serializer.save()

            # Devolver la categoría creada
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Si los datos no son válidos, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AddTransactionView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder a esta vista

    def post(self, request):
        """
        Agrega una nueva transacción de tipo 'expense' (gasto) con el monto y la categoría proporcionada.
        """
        amount = request.data.get('amount')  # Obtener el monto del gasto desde la solicitud
        category_id = request.data.get('category')  # Obtener el ID de la categoría desde la solicitud

        # Verificar que los datos necesarios estén presentes
        if amount is None or category_id is None:
            return Response({'error': 'Se requiere monto y categoría'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Verificar si la categoría existe
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({'error': 'Categoría no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        # Crear la transacción
        transaction = Transaction.objects.create(
            amount=amount,
            category=category,
            type='expense',  # Tipo 'expense' para un gasto
            user=request.user  # Asignar al usuario autenticado
        )

        # Serializar la transacción y devolver la respuesta
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def check_budget_status(self, request):
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        budgets = self.get_queryset().filter(year=year, month=month)
        budget_status = []

        for budget in budgets:
            total_expenses = Transaction.objects.filter(
                user=request.user,
                category=budget.category,
                transaction_date__year=year,
                transaction_date__month=month,
                type='expense'
            ).aggregate(Sum('amount'))['amount__sum'] or 0

            status_percentage = (total_expenses / budget.amount) * 100 if budget.amount > 0 else 0

            budget_status.append({
                'category_name': budget.category.name,
                'budget_amount': budget.amount,
                'total_expenses': total_expenses,
                'status_percentage': status_percentage
            })

        return Response(budget_status)







class MonedaListView(APIView):
    def get(self, request):
        monedas = Moneda.objects.all()
        serializer = MonedaSerializer(monedas, many=True)
        return Response(serializer.data)

class PaisListView(APIView):
    def get(self, request):
        paises = Pais.objects.all()
        serializer = PaisSerializer(paises, many=True)
        return Response(serializer.data)
    
class CategoryListView(APIView):
    def get(self, request):
        categorias = Category.objects.all()
        serializer = CategorySerializer(categorias, many=True)
        return Response(serializer.data)
    
class TransactionListView(APIView):
    def get(self, request):
        transacciones = Transaction.objects.all()
        serializer = TransactionSerializer(transacciones, many=True)
        return Response(serializer.data)

class BudgetListView(APIView):
    def get(self, request):
        presupuestos = Budget.objects.all()
        serializer = BudgetSerializer(presupuestos, many=True)
        return Response(serializer.data)
# Users view
class UsuarioCreateView(APIView):
    def post(self, request):
        print("Datos recibidos:", request.data)  # Imprime los datos recibidos
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            usuario.set_password(request.data['password'])  # Encripta la contraseña
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Errores del serializador:", serializer.errors)  # Imprime los errores del serializador
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
class UsuarioLoginView(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        password = request.data.get('password')

        try:
            usuario = Usuario.objects.get(correo=correo)
            if usuario.check_password(password):
                return Response({'message': 'Login successful', 'user_id': usuario.id}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



class UsuarioListView(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all()  # Fetch all users
        serializer = UsuarioSerializer(usuarios, many=True)  # Serialize the data
        return Response(serializer.data) # Devuelve los usuarios en formato JSON