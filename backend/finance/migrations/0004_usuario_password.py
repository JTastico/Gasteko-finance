# Generated by Django 5.1.3 on 2024-12-01 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0003_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='password',
            field=models.CharField(default='default_password', max_length=128),
            preserve_default=False,
        ),
    ]