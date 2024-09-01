# Generated by Django 5.1 on 2024-08-31 21:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_property_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='due_date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='payment',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
    ]