from django.db import models

class Usertbl(models.Model):
    k_name = models.CharField(max_length=20)
    k_email = models.CharField(max_length=50, primary_key=True)
    k_image = models.TextField()
    k_gender = models.CharField(max_length=10)
    k_age_range = models.CharField(max_length=20)
    class Meta:
        managed = False
        db_table = 'UserTBL'

class UserStocks(models.Model):
    no = models.AutoField(primary_key=True)
    email = models.CharField(max_length=20)
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=20)
    weight = models.FloatField()
    amount = models.FloatField()
    investmentperiod = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'UserStocks'
    
    