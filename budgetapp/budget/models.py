from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    category = models.CharField(max_length=255)
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    