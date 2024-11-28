from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction, Category, Budget


from .serializers import (
    TransactionSerializer, 
    CategorySerializer, 
    BudgetSerializer
)
from django.db.models import Sum
from django.utils import timezone
import calendar

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def monthly_summary(self, request):
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        transactions = self.get_queryset().filter(
            transaction_date__year=year,
            transaction_date__month=month
        )
        
        total_income = transactions.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expenses = transactions.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        
        return Response({
            'total_income': total_income,
            'total_expenses': total_expenses,
            'balance': total_income - total_expenses
        })

    @action(detail=False, methods=['GET'])
    def expense_by_category(self, request):
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        expenses = self.get_queryset().filter(
            transaction_date__year=year,
            transaction_date__month=month,
            type='expense'
        ).values('category__name', 'category__icon').annotate(total=Sum('amount'))
        
        return Response(list(expenses))

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