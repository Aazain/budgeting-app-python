from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.urls import reverse
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from .models import Budget
from decimal import Decimal

def user_signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('/')
    else:
        form = CustomUserCreationForm()
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
                messages.success(request, 'Logged in successfully!')
                return redirect('/')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


@login_required
def home_page(request):
    if request.method == 'POST':
        add_income(request)
        return redirect('home')

    return render(request, 'home.html')


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
            return JsonResponse("no budget set")
    
    return HttpResponseRedirect(reverse('home'))