# Generated by Django 5.1 on 2024-08-29 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_property_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='type',
            field=models.CharField(choices=[('house', 'house'), ('apartment', 'apartment'), ('office', 'office'), ('duplex', 'duplex')], max_length=50),
        ),
    ]
