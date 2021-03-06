# Generated by Django 3.2.6 on 2021-08-21 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('letsgoapi', '0006_auto_20210821_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presstour',
            name='created',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='presstour',
            name='current',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='presstour',
            name='status',
            field=models.IntegerField(choices=[(1, 'Набор блогеров'), (2, 'Проведение'), (3, 'Завершен')], default=1, null=True),
        ),
    ]
