# Sobe a API em APP_PROFILE=prod apontando para o Neon em .env.staging
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root '.env.staging'
if (-not (Test-Path $envFile)) {
  throw "Missing $envFile — run: npx neonctl@latest claim create --file .env.staging"
}

Get-Content $envFile | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith('#')) { return }
  $eq = $line.IndexOf('=')
  if ($eq -lt 1) { return }
  $key = $line.Substring(0, $eq).Trim()
  $val = $line.Substring($eq + 1).Trim().Trim('"')
  Set-Item -Path "Env:$key" -Value $val
}

# Spring usa DATABASE_URL em formato JDBC
if ($env:SPRING_DATABASE_URL) {
  $env:DATABASE_URL = $env:SPRING_DATABASE_URL
}

$env:JAVA_HOME = if (Test-Path "$env:USERPROFILE\.jdks\azul-21.0.3") {
  "$env:USERPROFILE\.jdks\azul-21.0.3"
} else {
  $env:JAVA_HOME
}
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path
$env:APP_PROFILE = 'prod'

Write-Host "Starting API with APP_PROFILE=prod against Neon staging..."
Set-Location $root
./mvnw.cmd spring-boot:run
