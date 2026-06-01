import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[0]
COLLECTION_PATH = ROOT / "_test/postman/Ding-Platform-Full-API.postman_collection.json"
OUTPUT_PATH = ROOT / "ALL_FEATURES_AND_ENDPOINTS.md"
PRISMA_PATH = ROOT / "prisma/schema.prisma"

# Store mapping of DTO/Interface Name -> Dict of properties
type_registry = {}

def parse_types_from_file(content):
    # Regex to find classes or interfaces
    # export class Name { ... } or export interface Name { ... }
    blocks = re.findall(r'export (?:class|interface|type)\s+([A-Za-z0-9_]+)[^{=]*?[={]\s*(.*?)\n}', content, re.DOTALL)
    for name, body in blocks:
        properties = {}
        # Find lines that look like: propertyName?: type;
        # Ignoring decorators
        lines = body.split('\n')
        for line in lines:
            line = line.strip()
            if not line or line.startswith('//') or line.startswith('@') or line.startswith('constructor') or '(' in line:
                continue
            # Match "prop: type;" or "prop?: type;"
            match = re.match(r'([A-Za-z0-9_]+)\s*\??\s*:\s*([^;]+);?', line)
            if match:
                prop_name = match.group(1)
                prop_type = match.group(2).strip()
                properties[prop_name] = prop_type
            elif "extends" in line:
                pass # Complex, skip for now
        if properties:
            type_registry[name] = properties

def parse_prisma_schema():
    if not PRISMA_PATH.exists(): return
    content = PRISMA_PATH.read_text(encoding='utf-8')
    models = re.findall(r'model\s+([A-Za-z0-9_]+)\s*\{(.*?)\}', content, re.DOTALL)
    for name, body in models:
        properties = {}
        lines = body.split('\n')
        for line in lines:
            line = line.strip()
            if not line or line.startswith('//') or line.startswith('@@'): continue
            parts = line.split()
            if len(parts) >= 2:
                prop_name = parts[0]
                prop_type = parts[1]
                properties[prop_name] = prop_type
        type_registry[name] = properties

def build_type_registry():
    parse_prisma_schema()
    for ext in ['ts']:
        for file in (ROOT / "src").rglob(f"*.{ext}"):
            try:
                parse_types_from_file(file.read_text(encoding='utf-8'))
            except:
                pass

def extract_controller_info():
    # Map of (method, path) -> { "body_dto": "DtoName", "return_type": "ReturnType" }
    route_info = {}
    
    for file in (ROOT / "src").rglob("*.controller.ts"):
        try:
            content = file.read_text(encoding='utf-8')
            # Extract base path
            base_match = re.search(r"@Controller\('([^']+)'\)", content)
            base_path = base_match.group(1) if base_match else ""
            base_path = base_path.strip("/")
            
            # Check class-level auth
            class_auth = "Yes (Bearer Token)" if "@UseGuards" in content.split('class ')[0] else "No"
            
            # Find routes
            # match @Post('path') ... async method(@Body() dto: DtoName)
            routes = re.finditer(r'(@UseGuards.*?\n)?\s*@(Get|Post|Put|Patch|Delete)\((?:[\'"](.*?)[\'"])?\)(.*?){', content, re.DOTALL)
            for route in routes:
                guard = route.group(1) or ""
                method = route.group(2).upper()
                sub_path = route.group(3) or ""
                sub_path = sub_path.strip("/")
                full_path = f"{base_path}/{sub_path}".replace('//', '/').strip('/')
                
                # Convert path to postman style: user/:id -> user/{{id}}
                full_path = re.sub(r':([A-Za-z_][A-Za-z0-9_]*)', r'{{\1}}', full_path)
                
                signature = route.group(4)
                
                is_auth = class_auth
                if "UseGuards" in guard:
                    is_auth = "Yes (Bearer Token)"
                
                # Find body DTO
                body_match = re.search(r'@Body\(\)\s*[A-Za-z0-9_]+\s*:\s*([A-Za-z0-9_]+)', signature)
                body_dto = body_match.group(1) if body_match else None
                
                # Find return type
                ret_match = re.search(r'Promise<([A-Za-z0-9_]+(\[\])?)>', signature)
                ret_type = ret_match.group(1) if ret_match else None
                
                route_info[(method, full_path)] = {
                    "body_dto": body_dto,
                    "return_type": ret_type,
                    "auth": is_auth
                }
        except:
            pass
    return route_info

def generate_docs():
    build_type_registry()
    route_info = extract_controller_info()
    
    collection = json.loads(COLLECTION_PATH.read_text(encoding='utf-8'))
    
    # 1. Generate Table of Contents items
    toc_lines = ["## 📑 Table of Contents"]
    for folder in collection.get("item", []):
        folder_name = folder.get("name", "Uncategorized")
        anchor = folder_name.lower().replace(" ", "-")
        toc_lines.append(f"- [{folder_name}](#-feature-area-{anchor})")
    toc_lines.append("- [Schema Definition Appendix](#-schema-definition-appendix)\n")
    
    lines = []
    lines.append("# Ding Platform: Complete Features & API Reference\n")
    lines.append("> This document contains a comprehensive list of all implemented features, modules, and their respective API endpoints with explicit frontend parameter structures.\n")
    
    lines.append("## 📖 How to Read & Use This Document")
    lines.append("Welcome, Frontend Developer! This document is designed to give you everything you need to connect to the backend APIs.\n")
    lines.append("1. **Table of Contents**: Click any feature area below to jump straight to its endpoints.")
    lines.append("2. **Authentication Required**: If an endpoint says `Yes (Bearer Token)`, you must include an `Authorization: Bearer <token>` header in your request.")
    lines.append("3. **Expected Input (Body Schema)**: For POST/PUT/PATCH requests, the required JSON payload schema is provided.")
    lines.append("4. **Schema Definition Appendix**: If an endpoint returns an object like a `User` or `Post`, scroll to the very bottom of this document to the **Schema Definition Appendix**. It contains the exact JSON fields for every database model and payload in the system.\n")
    
    lines.extend(toc_lines)
    
    for folder in collection.get("item", []):
        folder_name = folder.get("name", "Uncategorized")
        lines.append(f"## 📦 Feature Area: {folder_name}")
        lines.append(f"Contains all endpoints and functionalities related to {folder_name}.\n")
        
        for request_item in folder.get("item", []):
            name = request_item.get("name", "Unknown Endpoint")
            req = request_item.get("request", {})
            method = req.get("method", "GET")
            url = req.get("url", {})
            raw_url = url.get("raw", url) if isinstance(url, dict) else url
            description = req.get("description", "No description provided.")
            
            # extract path
            path = raw_url.replace("{{baseUrl}}/", "").split('?')[0].strip('/')
            
            info = route_info.get((method, path), {})
            body_dto = info.get("body_dto")
            ret_type = info.get("return_type")
            auth_req = info.get("auth", "Unknown")
            
            lines.append(f"### {name}")
            lines.append(f"**Endpoint:** `{method} {raw_url}`")
            lines.append(f"**Authentication Required:** {auth_req}")
            lines.append(f"**Description:** {description}\n")
            
            # Input
            if body_dto and body_dto in type_registry:
                lines.append(f"**Expected Input (Body Schema: `{body_dto}`):**")
                lines.append("```json")
                lines.append(json.dumps(type_registry[body_dto], indent=2))
                lines.append("```\n")
            elif method in ["POST", "PUT", "PATCH"]:
                lines.append("**Expected Input:** Typically requires a JSON body.\n")
            else:
                lines.append("**Expected Input:** Query or path parameters (see URL).\n")
                
            # Output
            if ret_type:
                base_ret = ret_type.replace('[]', '')
                if base_ret in type_registry:
                    lines.append(f"**Expected Response (Schema: `{ret_type}`):**")
                    lines.append("```json")
                    if '[]' in ret_type:
                        lines.append(json.dumps([type_registry[base_ret]], indent=2))
                    else:
                        lines.append(json.dumps(type_registry[base_ret], indent=2))
                    lines.append("```\n")
            
            # Fallback output
            if not ret_type:
                responses = request_item.get("response", [])
                if responses:
                    lines.append("**Example Response:**")
                    lines.append("```json")
                    lines.append(responses[0].get("body", "{}"))
                    lines.append("```\n")
            
            
            lines.append("---\n")
            
    # Append Schema Registry Appendix
    lines.append("## 📚 Schema Definition Appendix")
    lines.append("Below are the detailed structures of the database models and request/response payloads referenced in the API.\n")
    
    for type_name, properties in sorted(type_registry.items()):
        lines.append(f"### `{type_name}`")
        lines.append("```json")
        lines.append(json.dumps(properties, indent=2))
        lines.append("```\n")

    with OUTPUT_PATH.open("w", encoding="utf-8") as f:
        f.write("\n".join(lines))
        
if __name__ == "__main__":
    generate_docs()
    print(f"Generated docs at {OUTPUT_PATH}")
