import json
import boto3


def handler(event, context):
    request = json.loads(event['body'])

    client = boto3.resource('dynamodb')
    table = client.Table('books')

    isbn = event['pathParameters']['id']

    key = {
        "isbn": isbn
    }

    result = table.update_item(
        Key=key,
        UpdateExpression="set title = :t, synopsis = :s, image = :i",
        ExpressionAttributeValues={
            ':t': request['title'],
            ':s': request['synopsis'],
            ':i': request['image'],
        },
        ReturnValues="UPDATED_NEW")

    response = {
        "statusCode": result['ResponseMetadata']['HTTPStatusCode'],
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
    }

    return response
