import json
import boto3


def handler(event, context):
    request = json.loads(event['body'])

    client = boto3.resource('dynamodb')
    table = client.Table('books')

    item = {
        "isbn": request['isbn'],
        "title": request['title'],
        "synopsis": request['synopsis'],
        "image": request['image']
    }

    result = table.put_item(Item=item)

    response = {
        "statusCode": result['ResponseMetadata']['HTTPStatusCode'],
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
    }

    return response
