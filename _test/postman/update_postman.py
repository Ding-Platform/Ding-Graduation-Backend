import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
COLLECTION_PATH = ROOT / "_test/postman/Ding-Platform-Full-API.postman_collection.json"
ENV_PATH = ROOT / "_test/postman/Ding-Platform-Full-API.local.postman_environment.json"

HTTP_DECORATORS = ("Get", "Post", "Put", "Patch", "Delete")


@dataclass(frozen=True)
class Route:
    method: str
    path: str
    source: str


def normalize_path(path: str) -> str:
    p = path.strip()
    p = p.replace("//", "/").strip("/")
    # Convert Nest param format :id -> {{id}}
    p = re.sub(r":([A-Za-z_][A-Za-z0-9_]*)", r"{{\1}}", p)
    return p


def combine_paths(base: str, method_path: str) -> str:
    if method_path is None:
        method_path = ""
    return normalize_path(f"{base}/{method_path}")


def to_folder_key(path: str) -> str:
    return path.split("/", 1)[0] if path else ""


def to_request_name(method: str, path: str) -> str:
    return f"{method} /{path}"


def to_raw_url(path: str) -> str:
    return "{{baseUrl}}/" + path


def route_description(method: str, path: str, source: str) -> str:
    return (
        f"Auto-synced from `{source}`.\n\n"
        f"- Method: `{method}`\n"
        f"- Route: `/{path}`\n"
        f"- Purpose: Executes `{method}` on this backend endpoint.\n"
        f"- Notes: Update request body/params for your test scenario."
    )


def response_example(method: str, path: str) -> dict[str, Any]:
    status_code = 201 if method == "POST" else 200
    status = "Created" if status_code == 201 else "OK"
    body = {
        "success": True,
        "message": f"{method} /{path} executed successfully",
        "data": {},
    }
    return {
        "name": "Example Success",
        "originalRequest": {
            "method": method,
            "header": [],
            "url": {"raw": to_raw_url(path), "host": ["{{baseUrl}}"], "path": path.split("/")},
        },
        "status": status,
        "code": status_code,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps(body, indent=2),
    }


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text())


def save_json(path: Path, content: dict[str, Any]) -> None:
    path.write_text(json.dumps(content, indent=2) + "\n")


def parse_controller_routes() -> list[Route]:
    routes: list[Route] = []
    controller_files = list((ROOT / "src/modules").glob("**/*.controller.ts"))
    controller_files.append(ROOT / "src/health.controller.ts")

    for file_path in controller_files:
        if not file_path.exists():
            continue
        text = file_path.read_text(errors="ignore")

        base_match = re.search(r"@Controller\('([^']*)'\)", text)
        base_path = base_match.group(1) if base_match else ""

        for decorator in HTTP_DECORATORS:
            # @Get('path')
            pattern_with_path = re.compile(rf"@{decorator}\('([^']*)'\)")
            for match in pattern_with_path.finditer(text):
                method = decorator.upper()
                full_path = combine_paths(base_path, match.group(1))
                routes.append(Route(method=method, path=full_path, source=file_path.name))

            # @Get() no explicit path
            pattern_no_path = re.compile(rf"@{decorator}\(\)")
            for _ in pattern_no_path.finditer(text):
                method = decorator.upper()
                full_path = combine_paths(base_path, "")
                routes.append(Route(method=method, path=full_path, source=file_path.name))

    # Deduplicate while preserving order.
    seen: set[tuple[str, str]] = set()
    unique: list[Route] = []
    for route in routes:
        key = (route.method, route.path)
        if key in seen:
            continue
        seen.add(key)
        unique.append(route)
    return unique


def map_route_to_folder(path: str) -> str:
    head = to_folder_key(path)
    if head == "health":
        return "Health"
    if head == "auth":
        return "Authentication"
    if head == "users":
        return "Users"
    if head == "social":
        return "Social"
    if head == "notifications":
        return "Notifications"
    if head == "sessions":
        return "Sessions"
    if head == "profile":
        return "Profile"
    if head == "posts":
        return "Posts"
    if head == "feed":
        return "Feed"
    if head == "privacy":
        return "Privacy"
    if head == "likes":
        return "Likes"
    if head == "comments":
        return "Comments"
    if head == "chat":
        return "Chat"
    if head == "noro":
        return "Noro V2 (Sprint 16)" if "conversations" in path else "Noro"
    if head == "moderation":
        return "Moderation"
    if head == "marketplace":
        if path.startswith("marketplace/seller"):
            return "Marketplace Seller"
        if path.startswith("marketplace/admin"):
            return "Marketplace Admin"
        return "Marketplace Public"
    if head in ("calls", "call"):
        return "Calls (Sprint 16)"
    if head == "reels":
        return "Reels (Sprint 17)"
    if head == "audio-tracks":
        return "Audio Tracks (Sprint 17)"
    if head == "stories":
        return "Stories (Sprint 12)"
    if head == "groups":
        return "Groups (Sprint 13/20)"
    if head == "pages":
        return "Pages (Sprint 14)"
    if head == "search":
        return "Global Search (Sprint 14)"
    if head == "streams":
        return "Live Streaming (Sprint 18)"
    if head == "analytics":
        return "Analytics (Sprint 19)"
    if head == "events":
        return "Events (Sprint 20)"
    return "Misc"


def find_or_create_folder(collection: dict[str, Any], folder_name: str) -> dict[str, Any]:
    for folder in collection.get("item", []):
        if folder.get("name") == folder_name:
            folder.setdefault("item", [])
            return folder
    new_folder = {"name": folder_name, "item": []}
    collection.setdefault("item", []).append(new_folder)
    return new_folder


def extract_raw_url(request: dict[str, Any]) -> str:
    url = request.get("url")
    if isinstance(url, dict):
        return str(url.get("raw", ""))
    return str(url or "")


def normalize_raw_to_route(raw_url: str) -> str:
    path = raw_url.replace("{{baseUrl}}", "")
    path = path.split("?", 1)[0]
    return normalize_path(path)


def build_existing_index(collection: dict[str, Any]) -> dict[tuple[str, str], dict[str, Any]]:
    index: dict[tuple[str, str], dict[str, Any]] = {}

    def walk(items: list[dict[str, Any]]) -> None:
        for item in items:
            if "item" in item:
                walk(item["item"])
                continue
            req = item.get("request", {})
            method = str(req.get("method", "GET")).upper()
            path = normalize_raw_to_route(extract_raw_url(req))
            if path:
                index[(method, path)] = item

    walk(collection.get("item", []))
    return index


def ensure_request_description_and_example(item: dict[str, Any], method: str, path: str, source: str) -> None:
    req = item.setdefault("request", {})
    if not req.get("description"):
        req["description"] = route_description(method, path, source)
    responses = item.setdefault("response", [])
    if not responses:
        responses.append(response_example(method, path))


def ensure_collection_routes(collection: dict[str, Any], routes: list[Route]) -> None:
    existing = build_existing_index(collection)

    for route in routes:
        key = (route.method, route.path)
        if key in existing:
            ensure_request_description_and_example(
                existing[key], route.method, route.path, route.source
            )
            continue

        folder_name = map_route_to_folder(route.path)
        folder = find_or_create_folder(collection, folder_name)
        new_item = {
            "name": to_request_name(route.method, route.path),
            "request": {
                "method": route.method,
                "url": to_raw_url(route.path),
                "description": route_description(route.method, route.path, route.source),
            },
            "response": [response_example(route.method, route.path)],
        }
        folder["item"].append(new_item)


def ensure_existing_requests_have_docs(collection: dict[str, Any]) -> None:
    def walk(items: list[dict[str, Any]]) -> None:
        for item in items:
            if "item" in item:
                walk(item["item"])
                continue
            req = item.get("request", {})
            method = str(req.get("method", "GET")).upper()
            path = normalize_raw_to_route(extract_raw_url(req))
            if not path:
                continue
            ensure_request_description_and_example(item, method, path, "collection-existing")

    walk(collection.get("item", []))


def collect_env_keys_from_collection(collection: dict[str, Any]) -> set[str]:
    keys: set[str] = {"baseUrl", "accessToken", "userToken", "sellerToken", "adminToken"}

    def find_placeholders(text: str) -> None:
        for match in re.findall(r"\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}", text):
            keys.add(match)

    def walk(items: list[dict[str, Any]]) -> None:
        for item in items:
            if "item" in item:
                walk(item["item"])
                continue
            req = item.get("request", {})
            raw = extract_raw_url(req)
            find_placeholders(raw)
            body = req.get("body", {})
            if isinstance(body, dict):
                raw_body = body.get("raw")
                if isinstance(raw_body, str):
                    find_placeholders(raw_body)

    walk(collection.get("item", []))
    return keys


def upsert_env_vars(env: dict[str, Any], keys: set[str]) -> None:
    values = env.setdefault("values", [])
    existing = {entry.get("key"): entry for entry in values}
    for key in sorted(keys):
        if key in existing:
            existing[key]["enabled"] = True
            continue
        values.append({"key": key, "value": "", "enabled": True})


def main() -> None:
    collection = load_json(COLLECTION_PATH)
    env = load_json(ENV_PATH)
    routes = parse_controller_routes()

    # Keep collection metadata up to date.
    info = collection.setdefault("info", {})
    info["name"] = "Ding Platform Backend - Full API"
    info["version"] = "2.1.0"
    info["description"] = (
        "Complete backend collection (Sprint 1-20) with synced routes, "
        "request descriptions, and saved example responses."
    )

    ensure_collection_routes(collection, routes)
    ensure_existing_requests_have_docs(collection)

    env_keys = collect_env_keys_from_collection(collection)
    upsert_env_vars(env, env_keys)

    save_json(COLLECTION_PATH, collection)
    save_json(ENV_PATH, env)

    print(f"Synced routes: {len(routes)}")
    print(f"Environment keys ensured: {len(env_keys)}")


if __name__ == "__main__":
    main()
