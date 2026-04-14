#!/usr/bin/env pwsh

[CmdletBinding()]
param(
    [string]$Branch = ""
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($Branch)) {
    $Branch = (git branch --show-current).Trim()
}

if ([string]::IsNullOrWhiteSpace($Branch)) {
    Write-Error "Could not determine current branch."
    exit 1
}

if ($Branch -eq 'main') {
    Write-Error "Direct work on 'main' is not allowed."
    exit 1
}

$pattern = '^\d{3}-[a-z0-9-]+$'
if ($Branch -notmatch $pattern) {
    Write-Error "Branch '$Branch' does not match required pattern $pattern"
    exit 1
}

Write-Output "Branch '$Branch' passed naming policy."
exit 0
