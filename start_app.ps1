$env:Path = "C:\Program Files;" + $env:Path
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
& "C:\Program Files\npm.cmd" run dev
