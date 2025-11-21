import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .forms import signUpForm
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Budget
from decimal import Decimal 


@require_POST
def user_signup(request):
    data = json.loads(request.body)
    username = data.get("username")  
    password1 = data.get("password1")
    form = signUpForm(data={'username': username, 'password1': password1, 'password2': password1})
    print(form.is_valid())
    if form.is_valid():
        user = form.save()
        user = authenticate(username=username, password=password1)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Signup successful'}, status=200)
    return JsonResponse({'message': 'Unable to create account, please try again.', 'details': form.errors}, status=400)

# @require_POST
# def user_login(request):
#     data = json.loads(request.body)
#     username = data.get("username")
#     password = data.get("password")
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return JsonResponse({'message': 'Login successful'}, status=200)
#     return JsonResponse({'message': 'Invalid username or password'}, status=400)


def home_page(request):
    return render(request, 'home.html')

def logout_user(request):
    logout(request)
    return redirect('/login/')

# This add_income function adds the income to the database table. The request information (year, month, date)
# comes from the form data with the action /add-income/ (home.html). 
def add_income(request):
    user = request.user
    year = request.POST.get('incomeYear')
    month = request.POST.get('incomeMonth')
    day = request.POST.get('incomeDate')
    income_amount = request.POST.get('income_amount')
    income_amount_decimal = Decimal(income_amount)
    budget, created = Budget.objects.get_or_create(user=user, year=year, month=month, day=day)

    if not created:
        budget.income += income_amount_decimal
    else:
        budget.income = income_amount_decimal
    budget.save()
    return JsonResponse({ "message": "Income added!"}, status=200)

def add_expenses(request):
    user = request.user
    year = request.POST.get('expenseYear')
    month = request.POST.get('expenseMonth')
    day = request.POST.get('expenseDate')
    income_amount = request.POST.get('expenses_amount')
    income_amount_decimal = Decimal(income_amount)
    budget, created = Budget.objects.get_or_create(user=user, year=year, month=month, day=day)

    if not created:
        budget.expenses += income_amount_decimal
    else:
        budget.expenses = income_amount_decimal
    budget.save()
    return JsonResponse({ "message": "Expenses added!"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_transaction(request):
    data = json.loads(request.body)
    user = request.user
    transaction_type= data.get('transactionType')
    year = data.get('year')
    month = data.get('month')
    day = data.get('day')
    amount = Decimal(data.get('amount'))
    budget = Budget.objects.create(user=user, year=year, month=month, day=day, transaction_type=transaction_type)

    budget.amount = amount

    print(transaction_type, user, year, month, day, amount)


    budget.save()
    return Response({'message': 'success'})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_budget(request):
    if request.method == 'GET':
        user = request.user
        month = request.GET.get('month')
        year = request.GET.get('year')
        print(user, month, year)
        budget = Budget.objects.filter(user=user, year=year, month=month).values()
        if budget:
            return Response(list(budget))
        else:
            return Response({"error": "no budget set"}, status=400)
    return Response({"error": "please try again"}, status=400)

    
    