from django.db import models

class Usertbl(models.Model):
    k_number = models.BigAutoField(primary_key=True)
    k_name = models.CharField(max_length=20)
    k_email = models.CharField(max_length=50)
    k_image = models.TextField()
    k_gender = models.CharField(max_length=10)
    k_age_range = models.CharField(max_length=20)
    

    class Meta:
        managed = False
        db_table = 'UserTBL'