import json
import boto3


def handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('books')

    isbn = event['pathParameters']['id']

    key = {
        "isbn": isbn
    }

    result = table.get_item(Key=key)
    item = result.get('Item', {})

    response = {
        "statusCode": result['ResponseMetadata']['HTTPStatusCode'],
        "body": json.dumps(item)
    }

    return response
