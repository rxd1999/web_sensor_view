from django.db import models

# Create your models here.
class temperature(models.Model):
    date = models.DateTimeField(primary_key=True, max_length=16)
    temper = models.IntegerField()
    humi = models.IntegerField()

class current_status(models.Model):
    update_count=models.SmallIntegerField()
    temper = models.DecimalField(max_digits=3, decimal_places=1)
    humi = models.DecimalField(max_digits=3, decimal_places=1)

