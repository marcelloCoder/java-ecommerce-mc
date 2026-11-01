# Testa POST /auth/recovertoken + new-password no staging (requer API no ar e SMTP configurado).
param(
  [string]$Email = 'admin@mshop.staging',
  [string]$NewPassword = 'NovaSenha123',
  [string]$ApiBase = 'http://localhost:8080'
)

$ErrorActionPreference = 'Stop'

Write-Host "1) Solicitar recover token para $Email"
Invoke-RestMethod "$ApiBase/auth/recovertoken" -Method POST -ContentType 'application/json' -Body (@{ email = $Email } | ConvertTo-Json) | Out-Null
Write-Host '   email enviado (SMTP OK)'

# Token fica no Postgres — leia via PG* envs já exportadas, ou passe -Token
if (-not $env:PGHOST) {
  throw 'Defina PGHOST/PGUSER/PGPASSWORD/PGDATABASE/PGSSLMODE para ler o token do banco'
}

$psql = 'C:\Program Files\PostgreSQL\15\bin\psql.exe'
$token = & $psql -tA -c "SELECT token FROM tb_password_recover WHERE email='$Email' ORDER BY id DESC LIMIT 1;"
$token = $token.Trim()
if (-not $token) { throw 'Token não encontrado em tb_password_recover' }
Write-Host "2) Token lido do banco: $($token.Substring(0,8))..."

Write-Host '3) Definir nova senha'
Invoke-RestMethod "$ApiBase/auth/new-password" -Method PUT -ContentType 'application/json' -Body (@{ token = $token; password = $NewPassword } | ConvertTo-Json) | Out-Null

Write-Host '4) Login com nova senha'
$login = Invoke-RestMethod "$ApiBase/auth/login" -Method POST -ContentType 'application/json' -Body (@{ email = $Email; password = $NewPassword } | ConvertTo-Json)
Write-Host "OK access_token=$([bool]$login.access_token) expires_in=$($login.expires_in)"
