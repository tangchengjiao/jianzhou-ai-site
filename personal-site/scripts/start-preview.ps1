$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$url = 'http://127.0.0.1:4200/'
try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
    if ($response.StatusCode -eq 200 -and $response.Content.Contains('JIANZHOU')) {
        Write-Output "Preview already running: $url"
        exit 0
    }
    throw 'Port 4200 is serving another page.'
} catch {
    if (Get-NetTCPConnection -LocalPort 4200 -State Listen -ErrorAction SilentlyContinue) {
        throw 'Port 4200 is occupied by a different service. Check it before starting.'
    }
}
if (-not (Test-Path -LiteralPath (Join-Path $root 'dist/index.html'))) {
    throw 'Run pnpm run build in the project directory first.'
}
$logs = 'E:/CodexData/JianzhouSite/preview-logs'
New-Item -ItemType Directory -Path $logs -Force | Out-Null
$node = (Get-Command node -ErrorAction Stop).Source
$server = Join-Path $PSScriptRoot 'preview.mjs'
$process = Start-Process -FilePath $node -ArgumentList @("`"$server`"") -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logs 'preview.out.log') -RedirectStandardError (Join-Path $logs 'preview.err.log') -PassThru
$process.Id | Set-Content -LiteralPath (Join-Path $logs 'preview.pid') -Encoding UTF8
for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Milliseconds 300
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) { Write-Output "Preview started: $url"; exit 0 }
    } catch { }
}
throw "Preview failed. Check $logs/preview.err.log"
