import json
import hashlib
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Создает платежную ссылку Robokassa для покупки доната
    Принимает: nickname, package_id, amount
    Возвращает: payment_url для перенаправления на оплату
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
    
    nickname = body_data.get('nickname', '').strip()
    package_id = body_data.get('package_id', '')
    amount = body_data.get('amount', 0)
    
    if not nickname or not package_id or amount <= 0:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Отсутствуют обязательные параметры: nickname, package_id, amount'
            }),
            'isBase64Encoded': False
        }
    
    merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN', '')
    password_1 = os.environ.get('ROBOKASSA_PASSWORD_1', '')
    
    if not merchant_login or not password_1:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Платежная система не настроена. Добавьте секреты Robokassa.'
            }),
            'isBase64Encoded': False
        }
    
    invoice_id = f"{nickname}_{package_id}_{context.request_id[:8]}"
    
    description = f"Донат {package_id} для {nickname}"
    
    signature_string = f"{merchant_login}:{amount}:{invoice_id}:{password_1}"
    signature = hashlib.md5(signature_string.encode()).hexdigest()
    
    is_test = int(os.environ.get('ROBOKASSA_TEST_MODE', '1'))
    
    payment_url = (
        f"https://auth.robokassa.ru/Merchant/Index.aspx?"
        f"MerchantLogin={merchant_login}"
        f"&OutSum={amount}"
        f"&InvId={invoice_id}"
        f"&Description={description}"
        f"&SignatureValue={signature}"
        f"&IsTest={is_test}"
    )
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'payment_url': payment_url,
            'invoice_id': invoice_id,
            'amount': amount,
            'description': description
        }),
        'isBase64Encoded': False
    }
