# Generated by Django 4.1.1 on 2022-09-21 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessmentbaseinfo', '0003_alter_answertemplate_caption'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answertemplate',
            name='caption',
            field=models.CharField(max_length=255),
        ),
    ]
