from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    middle_name = models.CharField(max_length=255, blank=True)
    groups = models.ManyToManyField('auth.Group', related_name='budget_users')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='budget_users')

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    category = models.CharField(max_length=255)
    month = models.IntegerField()