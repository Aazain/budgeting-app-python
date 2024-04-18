from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from .forms import signUpForm
from django.contrib.auth.decorators import login_required
from .models import Budget
from decimal import Decimal

def user_signup(request):
    if request.method == 'POST':
        form = signUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('/login')
    else:
        form = signUpForm()
    return render(request, 'signup.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


@login_required
def home_page(request):
    return render(request, 'home.html')

def logout_user(request):
    logout(request)
    return redirect('/login/')

def add_income(request):
    user = request.user
    month = request.POST.get('month')
    income_amount = request.POST.get('income_amount')
    income_amount_decimal = Decimal(income_amount)
    budget, created = Budget.objects.get_or_create(user=user, month=month)

    if not created:
        budget.income += income_amount_decimal
    else:
        budget.income = income_amount_decimal
    budget.save()
    return redirect('home') 

def add_expenses(request):
    user = request.user
    month = request.POST.get('month')
    income_amount = request.POST.get('expenses_amount')
    income_amount_decimal = Decimal(income_amount)
    budget, created = Budget.objects.get_or_create(user=user, month=month)

    if not created:
        budget.expenses += income_amount_decimal
    else:
        budget.expenses = income_amount_decimal
    budget.save()
    return redirect('home') 


def get_budget(request):
    if request.method == 'GET':
        user = request.user
        month = request.GET.get('month')
        budget = Budget.objects.filter(user=user, month=month).first()
        if budget:
            data = {
                'income': budget.income,
                'month': budget.month,
                'expenses': budget.expenses
            }
            return JsonResponse(data)
        else:
            return JsonResponse({"error": "no budget set"}, status=400)
    
    return HttpResponseRedirect(reverse('home'))