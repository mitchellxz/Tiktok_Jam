# Generated by Django 5.0.6 on 2024-06-19 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_spotifyprofile_access_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifyprofile',
            name='display_name',
            field=models.CharField(max_length=255),
        ),
    ]