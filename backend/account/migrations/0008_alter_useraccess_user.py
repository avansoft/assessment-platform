# Generated by Django 4.1.5 on 2023-01-10 14:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_useraccess_invite_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccess',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
