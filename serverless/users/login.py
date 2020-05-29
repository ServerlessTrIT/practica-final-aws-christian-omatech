import json
import boto3
import os


def handler(event, context):
    code = 200
    body = {}

    if event['body'] is None:
        code = 400
    else:
        user = json.loads(event['body'])

        ap = {
            'USERNAME': user.get('email', ''),
            'PASSWORD': user.get('password', '')
        }

        client = boto3.client('cognito-idp')

        try:
            result = client.initiate_auth(
                AuthFlow='USER_PASSWORD_AUTH', AuthParameters=ap, ClientId=os.environ['CLIENT_ID'])

            body = {
                "message": "Enviado",
                "token": result['AuthenticationResult']['IdToken']
            }
        except Exception as e:
            code = 422
            body = {
                "message": e.args[0]
            }

    response = {
        "statusCode": code,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
        "body": json.dumps(body)
    }

    return response
