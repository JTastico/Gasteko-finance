from django.contrib import admin
from .models import Transaction, Category, Budget, Moneda, Pais
# Register your models here.

admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Budget)
admin.site.register(Moneda)
admin.site.register(Pais)

class MonedaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')

class PaisAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')