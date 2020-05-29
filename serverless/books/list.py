import json
import boto3


def handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('books')

    result = table.scan()
    items = result.get('Items', [])

    response = {
        "statusCode": result['ResponseMetadata']['HTTPStatusCode'],
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
            'Access-Control-Allow-Headers': '*'
        },
        "body": json.dumps(items)
    }

    return response
