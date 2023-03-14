from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def apiHome(request):
    print("hello apiHome is called")
    return HttpResponse("DJANGO API")