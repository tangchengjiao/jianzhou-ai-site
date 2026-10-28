$ErrorActionPreference = 'Stop'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$target = 'E:/CodexData/JianzhouSite/formal-node-modules'
New-Item -ItemType Directory -Path $target -Force | Out-Null
$modules = Join-Path $root 'node_modules'
if (-not (Test-Path -LiteralPath $modules)) { New-Item -ItemType Junction -Path $modules -Target $target | Out-Null }
Push-Location $root
try {
  & node -e "Promise.all([import('linkedom'), import('marked')]).then(() => process.exit(0)).catch(() => process.exit(1))"
  if ($LASTEXITCODE -eq 0) { Write-Output '构建依赖已就绪，保留现有 E 盘目录，不重复安装。'; return }
  & pnpm install --store-dir E:/CodexData/pnpm-store --cache-dir E:/CodexData/pnpm-cache --virtual-store-dir E:/CodexData/JianzhouSite/formal-node-modules/.pnpm
  if ($LASTEXITCODE -ne 0) { throw '依赖安装未完成；请检查当前 node_modules 布局，不自动删除既有目录。' }
} finally { Pop-Location }
