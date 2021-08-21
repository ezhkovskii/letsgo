from django.db import models
from django.contrib.postgres.fields import ArrayField


class AccountInsta(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255) # надо зашифровать
    session_id = models.CharField(max_length=255, null=True)
    instagram_id = models.BigIntegerField(null=True)

    def __str__(self):
        return self.username


class PressTour(models.Model):

    START = 1
    ONGOING = 2
    END = 3
    STATUS = [
        (START, 'Набор блогеров'),
        (ONGOING, 'Проведение'),
        (END, 'Завершен'),
    ]

    MALE = 1
    FEMALE = 2
    SEX = [
        (MALE, 'Мужчина'),
        (FEMALE, 'Женщина'),
    ]

    title = models.CharField(max_length=255)
    status = models.IntegerField(choices=STATUS, default=START, null=True)
    number_bloggers = models.IntegerField(null=True)
    created = models.DateField(auto_now_add=True, null=True)
    current = models.BooleanField(default=False, null=True)

    # параметры поиска блогеров
    key_words = models.TextField(null=True)
    sex = models.IntegerField(choices=SEX, default=FEMALE, null=True)
    involvement = models.FloatField(verbose_name='Вовлеченность', null=True)
    number_publications = models.IntegerField(verbose_name='Количество публикаций', null=True)
    number_subscribers = models.IntegerField(verbose_name='Количество подписчиков', null=True)
    number_subscriptions = models.IntegerField(verbose_name='Количество подписок', null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        PressTour.objects.filter(current=True).update(current=False)
        return super().save(*args, **kwargs)


class Blogger(models.Model):
    username = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    instagram_id = models.BigIntegerField()
    press_tour = models.ManyToManyField(PressTour, through='MemberPressTour')

    def __str__(self):
        return self.username

class MemberPressTour(models.Model):

    ACCEPTED = 1
    PENDING = 2
    DENIED = 3 
    STATUS = [
        (ACCEPTED, 'Согласен'),
        (PENDING, 'В ожидании ответа'),
        (DENIED, 'Отказался'),
    ]

    blogger = models.ForeignKey(Blogger, on_delete=models.CASCADE)
    press_tour = models.ForeignKey(PressTour, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, default=PENDING)

    def __str__(self):
        return self.press_tour.title + ' ' + self.blogger.username