from rest_framework import serializers
from letsgoapi.models import AccountInsta, PressTour


class AccountInstaSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    session_id = serializers.CharField(required=False, max_length=255)
    instagram_id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        return AccountInsta.objects.create(**validated_data)

class PressTourSerializer(serializers.ModelSerializer):

    class Meta:
        model = PressTour
        fields = '__all__'
