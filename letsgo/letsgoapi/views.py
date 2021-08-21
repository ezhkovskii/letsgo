from django.shortcuts import render

from letsgoapi.serializers import AccountInstaSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests


@api_view(['POST'])
def auth_inst(request):
    if request.method == 'POST':
        serializer = AccountInstaSerializer(data=request.data)
        if serializer.is_valid():
            req = requests.post('http://127.0.0.1:8000/auth/login', data=serializer.validated_data)
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


