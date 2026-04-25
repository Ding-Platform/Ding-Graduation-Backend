import json

with open('_test/postman/Ding-Platform-Full-API.postman_collection.json', 'r') as f:
    collection = json.load(f)

def enrich_requests(items):
    for item in items:
        if 'item' in item:
            enrich_requests(item['item'])
        elif 'request' in item:
            req = item['request']
            url = req.get('url', {}).get('raw', '') if isinstance(req.get('url'), dict) else req.get('url', '')
            method = req.get('method', '')
            
            # Noro V2
            if 'noro/conversations' in url and method == 'POST' and not 'messages' in url:
                req['body'] = {"mode": "raw", "raw": "{\n  \"trigger\": \"USER_INITIATED\"\n}", "options": {"raw": {"language": "json"}}}
            elif 'noro/conversations' in url and 'messages' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"role\": \"USER\",\n  \"content\": \"I am feeling anxious today.\"\n}", "options": {"raw": {"language": "json"}}}
            elif 'noro/crisis/report' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"messageId\": \"{{messageId}}\",\n  \"crisisScore\": 0.85,\n  \"keywords\": [\"anxious\", \"help\"]\n}", "options": {"raw": {"language": "json"}}}
            elif 'noro/crisis/intervention' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"crisisEventId\": \"{{crisisEventId}}\",\n  \"type\": \"SOFT\"\n}", "options": {"raw": {"language": "json"}}}
                
            # Reels
            elif 'reels' in url and 'finalize' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"rawVideoKey\": \"raw/user1/12345.mp4\",\n  \"caption\": \"My new reel!\",\n  \"hashtags\": [\"fun\", \"coding\"],\n  \"durationSec\": 15,\n  \"width\": 1080,\n  \"height\": 1920\n}", "options": {"raw": {"language": "json"}}}
            elif 'reels' in url and 'view' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"sessionId\": \"session-demo-1\",\n  \"watchPct\": 95\n}", "options": {"raw": {"language": "json"}}}
            elif 'reels' in url and 'comments' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"content\": \"This is a great reel!\"\n}", "options": {"raw": {"language": "json"}}}
            elif 'reels' in url and 'share' in url and method == 'POST':
                req['body'] = {"mode": "raw", "raw": "{\n  \"shareType\": \"FEED\",\n  \"targetUserId\": \"{{targetUserId}}\"\n}", "options": {"raw": {"language": "json"}}}

enrich_requests(collection.get('item', []))

with open('_test/postman/Ding-Platform-Full-API.postman_collection.json', 'w') as f:
    json.dump(collection, f, indent=2)
