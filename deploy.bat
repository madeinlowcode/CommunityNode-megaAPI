@echo off
echo ========================================
echo   N8N NODES MEGAAPI - DEPLOY SCRIPT
echo ========================================
echo.

echo [1/6] Verificando login NPM...
npm whoami
if %errorlevel% neq 0 (
    echo.
    echo ❌ Você não está logado no NPM!
    echo Execute: npm login
    echo.
    pause
    exit /b 1
)

echo.
echo [2/6] Verificando se o nome está disponível...
npm view n8n-nodes-megaapi > nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo ⚠️  ATENÇÃO: O pacote n8n-nodes-megaapi já existe!
    echo Você pode precisar alterar o nome ou incrementar a versão.
    echo.
    set /p continue="Continuar mesmo assim? (s/N): "
    if /i not "%continue%"=="s" (
        echo Deploy cancelado.
        pause
        exit /b 1
    )
) else (
    echo ✅ Nome disponível!
)

echo.
echo [3/6] Executando linter...
npm run lint
if %errorlevel% neq 0 (
    echo.
    echo ❌ Linter falhou! Corrija os erros antes de continuar.
    pause
    exit /b 1
)

echo.
echo [4/6] Compilando projeto...
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build falhou! Verifique os erros.
    pause
    exit /b 1
)

echo.
echo [5/6] Executando dry-run...
npm publish --dry-run
if %errorlevel% neq 0 (
    echo.
    echo ❌ Dry-run falhou! Verifique a configuração.
    pause
    exit /b 1
)

echo.
echo [6/6] Publicando no NPM...
echo ⚠️  ÚLTIMA CHANCE! Pressione CTRL+C para cancelar.
timeout /t 5 /nobreak > nul

npm publish
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   🎉 DEPLOY REALIZADO COM SUCESSO! 🎉
    echo ========================================
    echo.
    echo 📦 Pacote: n8n-nodes-megaapi
    echo 🔗 URL: https://www.npmjs.com/package/n8n-nodes-megaapi
    echo.
    echo Para instalar:
    echo npm install n8n-nodes-megaapi
    echo.
) else (
    echo.
    echo ❌ Falha no deploy! Verifique os erros acima.
)

echo.
pause
