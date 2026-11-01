"""Cria admin forte e categorias no Postgres de produção, depois do Flyway V1.

Lê deploy/prod.env. Não imprime senha. Idempotente.
"""

from __future__ import annotations

import sys
from pathlib import Path

import bcrypt
import psycopg

ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = ROOT / "deploy" / "prod.env"


def load_env(path: Path) -> dict[str, str]:
    env: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        env[key.strip()] = value.strip()
    return env


def jdbc_to_libpq(jdbc: str) -> str:
    if not jdbc.startswith("jdbc:"):
        return jdbc
    return jdbc[len("jdbc:") :]


def main() -> int:
    if not ENV_FILE.exists():
        print(f"Arquivo ausente: {ENV_FILE}", file=sys.stderr)
        return 1
    env = load_env(ENV_FILE)
    email = env.get("PROD_ADMIN_EMAIL", "admin@mshop.prod")
    password = env.get("PROD_ADMIN_PASSWORD", "")
    if len(password) < 12:
        print("PROD_ADMIN_PASSWORD ausente ou curta demais.", file=sys.stderr)
        return 1
    digest = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=10)).decode()
    conninfo = jdbc_to_libpq(env["DATABASE_URL"])
    with psycopg.connect(conninfo, user=env["DATABASE_USERNAME"], password=env["DATABASE_PASSWORD"]) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT to_regclass('public.tb_user')")
            if cur.fetchone()[0] is None:
                print("Schema ausente. Suba a API com APP_PROFILE=prod para o Flyway aplicar a V1.", file=sys.stderr)
                return 2
            cur.execute(
                """
                INSERT INTO tb_role (authority)
                SELECT 'ROLE_OPERATOR' WHERE NOT EXISTS (SELECT 1 FROM tb_role WHERE authority = 'ROLE_OPERATOR')
                """
            )
            cur.execute(
                """
                INSERT INTO tb_role (authority)
                SELECT 'ROLE_ADMIN' WHERE NOT EXISTS (SELECT 1 FROM tb_role WHERE authority = 'ROLE_ADMIN')
                """
            )
            cur.execute(
                """
                INSERT INTO tb_user (name, email, phone, birth_date, password)
                SELECT 'mShop Admin', %s, '0000000000', DATE '1990-01-01', %s
                WHERE NOT EXISTS (SELECT 1 FROM tb_user WHERE email = %s)
                """,
                (email, digest, email),
            )
            cur.execute(
                """
                UPDATE tb_user SET password = %s WHERE email = %s
                """,
                (digest, email),
            )
            cur.execute(
                """
                INSERT INTO tb_user_role (user_id, role_id)
                SELECT u.id, r.id
                FROM tb_user u
                CROSS JOIN tb_role r
                WHERE u.email = %s
                  AND NOT EXISTS (
                    SELECT 1 FROM tb_user_role ur WHERE ur.user_id = u.id AND ur.role_id = r.id
                  )
                """,
                (email,),
            )
            for name in ("Electronics", "Books", "Home & Kitchen", "Hardware"):
                cur.execute(
                    """
                    INSERT INTO tb_category (name)
                    SELECT %s WHERE NOT EXISTS (SELECT 1 FROM tb_category WHERE name = %s)
                    """,
                    (name, name),
                )
        conn.commit()
    print(f"Admin pronto: {email} (senha só em deploy/prod.env). Categorias ok.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
