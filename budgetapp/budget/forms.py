from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class signUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'password1', 'password2')
