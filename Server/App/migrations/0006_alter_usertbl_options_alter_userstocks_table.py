# Generated by Django 4.1.7 on 2023-03-25 06:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0005_userstocks_alter_usertbl_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usertbl',
            options={'managed': False},
        ),
        migrations.AlterModelTable(
            name='userstocks',
            table='UserStocks',
        ),
    ]