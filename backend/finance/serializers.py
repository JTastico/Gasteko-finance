from rest_framework import serializers
from .models import Transaction, Category, Budget
from django.contrib.auth.models import User

# Import coin and country models
from .models import Moneda, Pais

# Import model of user
from .models import Usuario

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
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Transaction
        fields = '__all__'

    def get_category_name(self, obj):
        return obj.category.name

    def get_category_icon(self, obj):
        return obj.category.icon

    def create(self, validated_data):
        # Asegurarse de que el usuario autenticado se asocie a la transacción
        user = self.context['request'].user  # Obtener el usuario autenticado
        validated_data['user'] = user
        return super().create(validated_data)



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
    
class MonedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moneda
        fields = '__all__'

class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'  # Incluir todos los campos, incluyendo 'password'
