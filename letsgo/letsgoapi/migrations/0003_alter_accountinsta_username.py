# Generated by Django 3.2.6 on 2021-08-21 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('letsgoapi', '0002_auto_20210821_1220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountinsta',
            name='username',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]