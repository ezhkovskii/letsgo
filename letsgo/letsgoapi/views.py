from re import U
from django.shortcuts import render
from letsgoapi.models import PressTour, AccountInsta

from letsgoapi.serializers import AccountInstaSerializer, PressTourSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics


import requests

from letsgoapi.utils import URL_INSTAGRAM_REST


@api_view(['POST', 'GET'])
def auth_inst(request):

    response = {
        'status':True,
        'msg': []
        }
    
    if request.method == 'POST':
        serializer = AccountInstaSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            if AccountInsta.objects.filter(username=username).exists():
                return Response(response, status=status.HTTP_200_OK)

            req = requests.post(URL_INSTAGRAM_REST + 'auth/login', data=serializer.validated_data)
            if req.status_code == 200:
                serializer.validated_data['session_id'] = req.text
                serializer.save()
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                response['status'] = False
                response['msg'] = [ req.text, ]
            return Response(response, status=status.HTTP_400_BAD_REQUEST) 
            
        response['status'] = False
        response['msg'] = serializer.errors
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        account = AccountInsta.objects.first()
        serializer = AccountInstaSerializer(account)
        return Response(serializer.data)


class PressTourList(generics.ListCreateAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer


class PressTourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer

    