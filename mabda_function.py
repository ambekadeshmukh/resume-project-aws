import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    response = table.get_item(Key={'id': 'visitors'})
    count = response['Item']['count'] if 'Item' in response else 0
    count += 1
    
    table.put_item(Item={'id': 'visitors', 'count': count})
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'count': count})
    }
