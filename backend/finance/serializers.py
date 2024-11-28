from rest_framework import serializers
from .models import Transaction, Category, Budget
from django.contrib.auth.models import User

# Import coin and country models
from .models import Moneda, Pais

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    category_icon = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = '__all__'

    def get_category_name(self, obj):
        return obj.category.name

    def get_category_icon(self, obj):
        return obj.category.icon

class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = '__all__'

    def get_category_name(self, obj):
        return obj.category.name

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = '__all__'
    
    def get_category_name(self, obj):
        return obj.category.name
    

# Serializer for Moneda model
class MonedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moneda
        fields = ['id', 'nombre']

# Serializer for Pais model
class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ['id', 'nombre']