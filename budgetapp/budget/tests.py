from django.test import TestCase, Client
from django.urls import reverse
from .models import Budget
from .models import User
import json
from decimal import Decimal

class addIncomeTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client.login(username='testuser', password='password')

    def test_income(self):
        test = self.client.post(reverse('add_income'), {'month': 1, 'income_amount': 2500})
        self.assertRedirects(test, reverse('home'))

        budget = Budget.objects.get(user=self.user, month=1)
        self.assertEqual(budget.income, 2500)


class addExpensesTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client.login(username='testuser', password='password')

    def test_expenses(self):
        test = self.client.post(reverse('add_expenses'), {'month': 1, 'expenses_amount': 2500})
        self.assertRedirects(test, reverse('home'))

        budget = Budget.objects.get(user=self.user, month=1)
        self.assertEqual(budget.expenses, 2500)


class UserSignupTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_signup(self):
        self.client.post(reverse('signup'), {
            'username': 'testuser',
            'password1': 'testpassword',
            'password2': 'testpassword',
        })

        self.assertTrue(User.objects.filter(username='testuser').exists())


class UserLoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='password')

    def test_login(self):
        self.client.post(reverse('login'), {
            'username': 'testuser',
            'password': 'testpassword',
        })

        self.assertTrue(User.objects.filter(username='testuser').exists())


class budgetTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        self.budget = Budget.objects.create(user=self.user, month=1, income=2500, expenses=500)

    def test_budget(self):
        test = self.client.get(reverse('get_budget'), {'month': self.budget.month})

        content = test.json()
        self.assertEqual(int(Decimal(content['income'])), 2500)
        self.assertEqual(content['month'], 1)
        self.assertEqual(int(Decimal(content['expenses'])), 500)

    def test_nobudget(self):
        self.budget.delete()
        test = self.client.get(reverse('get_budget'), {'month': self.budget.month})

        self.assertEqual(test.status_code, 400)
        self.assertEqual(test.json(), {'error': 'no budget set'})