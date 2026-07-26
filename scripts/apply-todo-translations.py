#!/usr/bin/env python3
"""Apply TODO translations to pl.json and ua.json from mapping files."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "messages"


def flatten(obj, prefix: str = "") -> dict[str, object]:
    items: dict[str, object] = {}
    if isinstance(obj, dict):
        for key, value in obj.items():
            path = f"{prefix}.{key}" if prefix else key
            items.update(flatten(value, path))
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            items.update(flatten(value, f"{prefix}[{index}]"))
    else:
        items[prefix] = obj
    return items


def unflatten(flat: dict[str, object]) -> object:
    root: object = {}

    for path, value in flat.items():
        parts: list[str | int] = []
        current = ""
        i = 0
        while i < len(path):
            if path[i] == ".":
                if current:
                    parts.append(current)
                    current = ""
                i += 1
                continue
            if path[i] == "[":
                if current:
                    parts.append(current)
                    current = ""
                close = path.index("]", i)
                parts.append(int(path[i + 1 : close]))
                i = close + 1
                continue
            current += path[i]
            i += 1
        if current:
            parts.append(current)

        cursor = root
        for part in parts[:-1]:
            if isinstance(part, int):
                raise ValueError(f"Unexpected list index in path: {path}")
            if not isinstance(cursor, dict):
                raise ValueError(f"Invalid path: {path}")
            if part not in cursor or not isinstance(cursor[part], (dict, list)):
                cursor[part] = {}
            cursor = cursor[part]

        last = parts[-1]
        if isinstance(last, int):
            if not isinstance(cursor, list):
                raise ValueError(f"Expected list for path: {path}")
            while len(cursor) <= last:
                cursor.append(None)
            cursor[last] = value
        else:
            if not isinstance(cursor, dict):
                raise ValueError(f"Expected dict for path: {path}")
            cursor[last] = value

    return root


def set_nested(obj: object, path: str, value: object) -> None:
    parts: list[str | int] = []
    current = ""
    i = 0
    while i < len(path):
        if path[i] == ".":
            if current:
                parts.append(current)
                current = ""
            i += 1
            continue
        if path[i] == "[":
            if current:
                parts.append(current)
                current = ""
            close = path.index("]", i)
            parts.append(int(path[i + 1 : close]))
            i = close + 1
            continue
        current += path[i]
        i += 1
    if current:
        parts.append(current)

    cursor = obj
    for part in parts[:-1]:
        cursor = cursor[part]  # type: ignore[index]

    cursor[parts[-1]] = value  # type: ignore[index]


def apply_mappings(locale: str, mappings: dict[str, str]) -> int:
    path = MESSAGES / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    applied = 0

    for key, translation in mappings.items():
        # Navigate to verify key exists and is TODO
        parts: list[str | int] = []
        current = ""
        i = 0
        while i < len(key):
            if key[i] == ".":
                if current:
                    parts.append(current)
                    current = ""
                i += 1
                continue
            if key[i] == "[":
                if current:
                    parts.append(current)
                    current = ""
                close = key.index("]", i)
                parts.append(int(key[i + 1 : close]))
                i = close + 1
                continue
            current += key[i]
            i += 1
        if current:
            parts.append(current)

        cursor = data
        for part in parts:
            cursor = cursor[part]  # type: ignore[index]

        if not isinstance(cursor, str) or not cursor.startswith("TODO:"):
            raise ValueError(f"{locale}:{key} is not a TODO string: {cursor!r}")

        set_nested(data, key, translation)
        applied += 1

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return applied


def main() -> None:
    non_legal_pl = json.loads((MESSAGES / "_todo-nonlegal-pl.json").read_text(encoding="utf-8"))
    non_legal_ua = json.loads((MESSAGES / "_todo-nonlegal-ua.json").read_text(encoding="utf-8"))
    legal_pl = json.loads((MESSAGES / "_todo-legal-pl.json").read_text(encoding="utf-8"))
    legal_ua = json.loads((MESSAGES / "_todo-legal-ua.json").read_text(encoding="utf-8"))

    pl_count = apply_mappings("pl", {**non_legal_pl, **legal_pl})
    ua_count = apply_mappings("ua", {**non_legal_ua, **legal_ua})

    print(f"Applied PL: {pl_count}")
    print(f"Applied UA: {ua_count}")


if __name__ == "__main__":
    main()
