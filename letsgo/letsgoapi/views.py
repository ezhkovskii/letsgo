import requests
from letsgoapi.models import PressTour, AccountInsta

from letsgoapi.serializers import AccountInstaSerializer, PressTourSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
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
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer


class PressTourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressTour.objects.all()
    serializer_class = PressTourSerializer
