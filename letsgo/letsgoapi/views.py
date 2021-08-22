import json
import requests
from requests.sessions import session
from letsgoapi.models import PressTour, AccountInsta

from letsgoapi.serializers import AccountInstaSerializer, PressTourSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import generics

from letsgoapi.utils import URL_INSTAGRAM_REST


class AuthInst(APIView):

    response = {
        'status':True,
        'msg': []
    }

    def get(self, request, format=None):
        account = AccountInsta.objects.first()
        serializer = AccountInstaSerializer(account)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountInstaSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            if AccountInsta.objects.filter(username=username).exists():
                return Response(self.response, status=status.HTTP_200_OK)

            req = requests.post(URL_INSTAGRAM_REST + 'auth/login', data=serializer.validated_data)
            if req.status_code == 200:
                serializer.validated_data['session_id'] = req.text
                serializer.save()
                return Response(self.response, status=status.HTTP_201_CREATED)
            else:
                self.response['status'] = False
                self.response['msg'] = [ req.text, ]
            return Response(self.response, status=status.HTTP_400_BAD_REQUEST) 
            
        self.response['status'] = False
        self.response['msg'] = serializer.errors
        return Response(self.response, status=status.HTTP_400_BAD_REQUEST)


class PressTourList(generics.ListCreateAPIView):
    queryset = PressTour.objects.all().order_by('current', '-created')
    serializer_class = PressTourSerializer


class PressTourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer


@api_view(['GET'])
def get_list_bloggers_from_instagram(request):
    AMOUNT_BLOGGERS = 10
    SESSION_ID = AccountInsta.objects.first().session_id
    bloggers = []

    key_words = request.query_params.get('key_words')
    sex = request.query_params.get('sex')
    involvement = request.query_params.get('involvement') 
    number_publications = request.query_params.get('number_publications') 
    number_subscribers = request.query_params.get('number_subscribers') 
    number_subscriptions = request.query_params.get('number_subscriptions')

    key_words_list = [key.strip().lower() for key in key_words.split(',')]
    for key_word in key_words_list:
        data = {
            'name': key_word,
            'sessionid': SESSION_ID,
            'amount': AMOUNT_BLOGGERS
        }
        req = requests.post(URL_INSTAGRAM_REST + 'hashtag/medias_top', data=data)
        if req.status_code == 200:
            posts_by_hashtag = json.loads(req.text)
            for post in posts_by_hashtag:
                bloggers.append(post['user'])

    bloggers_sort_desc = []
    for blogger in bloggers:
        req = requests.post(URL_INSTAGRAM_REST + 'user/info', data={
            'sessionid': SESSION_ID,
            'user_id': blogger['pk'],
            'use_cache': False
        })
        if req.status_code == 200:
            bloggers_sort_desc.append(json.loads(req.text))
            bloggers_sort_desc = sorted(bloggers_sort_desc, reverse=True, key = lambda x: x['follower_count'])
    
    return Response(bloggers_sort_desc)


@api_view(['GET'])
def get_blogger_info(request):

    SESSION_ID = AccountInsta.objects.first().session_id
    blogger_pk = request.query_params.get('pk')

    req = requests.post(URL_INSTAGRAM_REST + 'user/info', data={
            'sessionid': SESSION_ID,
            'user_id': blogger_pk,
            'use_cache': False
        })
    if req.status_code == 200:
        blogger = json.loads(req.text)
        return Response(blogger)

        
                


