# Generated by Django 3.2.6 on 2021-09-24 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_todo_project'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='text',
            new_name='name',
        ),
    ]
