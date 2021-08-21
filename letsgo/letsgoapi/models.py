from django.db import models
from django.contrib.postgres.fields import ArrayField


class AccountInsta(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
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

    title = models.CharField(max_length=255)
    status = models.IntegerField(choices=STATUS, default=START)
    number_bloggers = models.IntegerField()
    created = models.DateField()
    current = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self):
        # поиск текущего пресстура, current ставим у него false, т.к. текущий только один
        return super().save()


class ParamSearch(models.Model):

    MALE = 1
    FEMALE = 2
    SEX = [
        (MALE, 'Мужчина'),
        (FEMALE, 'Женщина'),
    ]
    
    press_tour = models.OneToOneField(
        PressTour,
        on_delete=models.CASCADE
    )
    key_words = ArrayField(models.CharField(max_length=255), blank=True)
    sex = models.IntegerField(choices=SEX, default=FEMALE)
    involvement = models.FloatField(verbose_name='Вовлеченность')
    number_publications = models.IntegerField(verbose_name='Количество публикаций')
    number_subscribers = models.IntegerField(verbose_name='Количество подписчиков')
    number_subscriptions = models.IntegerField(verbose_name='Количество подписок')


    def __str__(self):
        return 'Параметры поиска: ' + self.press_tour.title


class Blogger(models.Model):
    username = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    instagram_id = models.BigIntegerField()
    press_tour = models.ManyToManyField(PressTour, through='MemberPressTour')


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