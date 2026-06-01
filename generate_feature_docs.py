import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[0]
COLLECTION_PATH = ROOT / "_test/postman/Ding-Platform-Full-API.postman_collection.json"
OUTPUT_PATH = ROOT / "ALL_FEATURES_AND_ENDPOINTS.md"

def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

def generate_docs():
    collection = load_json(COLLECTION_PATH)
    
    lines = []
    lines.append("# Ding Platform: Complete Features & API Reference\n")
    lines.append("> This document contains a comprehensive list of all implemented features, modules, and their respective API endpoints.\n")
    
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
            
            lines.append(f"### {name}")
            lines.append(f"**Endpoint:** `{method} {raw_url}`")
            lines.append(f"**Description:** {description}\n")
            
            body = req.get("body", {})
            if isinstance(body, dict) and body.get("mode") == "raw":
                lines.append("**Expected Input Body:**")
                lines.append("```json")
                lines.append(body.get("raw", "{}"))
                lines.append("```\n")
            elif method in ["POST", "PUT", "PATCH"]:
                lines.append("**Expected Input:** Typically requires a JSON body matching the DTO.\n")
            else:
                lines.append("**Expected Input:** Query parameters or path parameters.\n")
                
            responses = request_item.get("response", [])
            if responses:
                lines.append("**Example Response:**")
                lines.append("```json")
                lines.append(responses[0].get("body", "{}"))
                lines.append("```\n")
            lines.append("---\n")
            
    with OUTPUT_PATH.open("w", encoding="utf-8") as f:
        f.write("\n".join(lines))
        
if __name__ == "__main__":
    generate_docs()
    print(f"Generated docs at {OUTPUT_PATH}")
