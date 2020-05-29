import json
import boto3
import os


def handler(event, context):
    code = 200
    body = {}

    if event['body'] is None:
        code = 422
    else:
        user = json.loads(event['body'])
        email = user.get('email', '')
        confirmationCode = user.get('code', '')

        client = boto3.client('cognito-idp')

        try:
            result = client.confirm_sign_up(
                ClientId=os.environ['CLIENT_ID'], Username=email, ConfirmationCode=confirmationCode)

            body = {
                "message": "Your account has been verified"
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
