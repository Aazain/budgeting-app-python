from django.contrib import admin
from .models import Budget, User


admin.site.register(User)
admin.site.register(Budget)