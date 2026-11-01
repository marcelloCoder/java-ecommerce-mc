# Sobe a API local no perfil prod, lendo deploy/prod.env (Neon). Porta 8082 para não bater no Docker.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root "deploy\prod.env"
if (-not (Test-Path $envFile)) {
    throw "Crie deploy/prod.env a partir de deploy/prod.env.example"
}
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq "" -or $line.StartsWith("#") -or -not $line.Contains("=")) { return }
    $key, $value = $line.Split("=", 2)
    if ($value.Trim() -eq "") { return }
    Set-Item -Path "Env:$($key.Trim())" -Value $value.Trim()
}
$env:SERVER_PORT = "8082"
$env:SECURITY_TOKEN_URI = "http://127.0.0.1:8082/oauth2/token"
$env:JAVA_HOME = Join-Path $env:USERPROFILE ".jdks\azul-21.0.3"
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path
Set-Location (Join-Path $root "backend")
& .\mvnw.cmd spring-boot:run
