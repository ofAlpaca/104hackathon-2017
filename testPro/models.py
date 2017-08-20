from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Data(models.Model):
    area = models.CharField(max_length=100)
    no = models.CharField(max_length=200)
    def __str__(self):
        return self.area
class Jobs(models.Model):
    name = models.CharField(max_length=100)
    no = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name