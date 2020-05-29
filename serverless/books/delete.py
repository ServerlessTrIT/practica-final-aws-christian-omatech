import json
import boto3


def handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('books')

    isbn = event['pathParameters']['id']

    key = {
        "isbn": isbn
    }

    result = table.delete_item(Key=key)

    response = {
        "statusCode": result['ResponseMetadata']['HTTPStatusCode'],
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
    }

    return response
