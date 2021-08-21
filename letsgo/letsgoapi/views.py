from django.shortcuts import render
from letsgoapi.models import PressTour

from letsgoapi.serializers import AccountInstaSerializer, PressTourSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics


import requests

from letsgoapi.utils import URL_INSTAGRAM_REST


@api_view(['POST'])
def auth_inst(request):
    if request.method == 'POST':
        serializer = AccountInstaSerializer(data=request.data)
        if serializer.is_valid():
            req = requests.post(URL_INSTAGRAM_REST + 'auth/login', data=serializer.validated_data)
            if req.status_code == 200:
                try:
                    serializer.validated_data['session_id'] = req.text
                    serializer.save()
                except Exception as e:
                    response = {
                    'status':False,
                    'msg': [str(e)]
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)

                response = {
                    'status':True,
                    'msg': []
                    }
                return Response(response, status=status.HTTP_201_CREATED)
                
            else:
               response = {
                    'status': False,
                    'msg': [ req.text, ]
                    }
            return Response(response, status=status.HTTP_400_BAD_REQUEST) 
            

        response = {
                    'status':False,
                    'msg': serializer.errors
                }   
        return Response(response, status=status.HTTP_400_BAD_REQUEST)



class PressTourList(generics.ListAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer
    
#написать метод POST для списков

class PressTourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer

    