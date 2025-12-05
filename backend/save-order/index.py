import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Сохраняет заказ в базу данных перед перенаправлением на оплату
    Принимает: invoice_id, nickname, package_id, package_name, amount
    Возвращает: success статус
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    invoice_id = body_data.get('invoice_id', '')
    nickname = body_data.get('nickname', '')
    package_id = body_data.get('package_id', '')
    package_name = body_data.get('package_name', '')
    amount = body_data.get('amount', 0)
    
    if not all([invoice_id, nickname, package_id, package_name, amount]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Отсутствуют обязательные параметры'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL', '')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'База данных не настроена'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO orders (invoice_id, nickname, package_id, package_name, amount, status) "
        "VALUES (%s, %s, %s, %s, %s, %s) "
        "ON CONFLICT (invoice_id) DO NOTHING",
        (invoice_id, nickname, package_id, package_name, amount, 'pending')
    )
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'invoice_id': invoice_id}),
        'isBase64Encoded': False
    }
