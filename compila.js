const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Criação dos diretórios necessários
console.log('Criando estrutura de diretórios...');

// Diretório dist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Diretório dist/nodes/ClimaNode
if (!fs.existsSync('dist/nodes')) {
  fs.mkdirSync('dist/nodes');
}
if (!fs.existsSync('dist/nodes/ClimaNode')) {
  fs.mkdirSync('dist/nodes/ClimaNode');
}

// Diretório dist/nodes/MegaapiNodes
if (!fs.existsSync('dist/nodes/MegaapiNodes')) {
  fs.mkdirSync('dist/nodes/MegaapiNodes');
}

// Diretório dist/nodes/MegaapiNodes/PairingCode
if (!fs.existsSync('dist/nodes/MegaapiNodes/PairingCode')) {
  fs.mkdirSync('dist/nodes/MegaapiNodes/PairingCode');
}

// Diretório dist/credentials
if (!fs.existsSync('dist/credentials')) {
  fs.mkdirSync('dist/credentials');
}

// Compilação do TypeScript
console.log('Compilando arquivos TypeScript...');
try {
  execSync('npx tsc', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao compilar TypeScript:', error);
}

// Cópia de arquivos SVG
console.log('Copiando arquivos de ícones...');
try {
  fs.copyFileSync(
    'nodes/ClimaNode/clima.svg',
    'dist/nodes/ClimaNode/clima.svg'
  );
  console.log('Ícone do ClimaNode copiado com sucesso.');
} catch (error) {
  console.error('Erro ao copiar ícone do ClimaNode:', error);
}

try {
  fs.copyFileSync(
    'nodes/MegaAPI/megaapi.svg',
    'dist/nodes/MegaAPI/megaapi.svg'
  );
  console.log('Ícone do MegaAPI copiado com sucesso.');
} catch (error) {
  console.error('Erro ao copiar ícone do MegaAPI:', error);
}

// Cópia dos arquivos JSON
console.log('Copiando arquivos JSON...');
try {
  fs.copyFileSync(
    'nodes/ClimaNode/ClimaNode.node.json',
    'dist/nodes/ClimaNode/ClimaNode.node.json'
  );
  console.log('Arquivo JSON do ClimaNode copiado com sucesso.');
} catch (error) {
  console.error('Erro ao copiar arquivo JSON do ClimaNode:', error);
}

try {
  fs.copyFileSync(
    'nodes/MegaAPI/MegaApi.node.json',
    'dist/nodes/MegaAPI/MegaApi.node.json'
  );
  console.log('Arquivo JSON do MegaAPI copiado com sucesso.');
} catch (error) {
  console.error('Erro ao copiar arquivo JSON do MegaAPI:', error);
}

console.log('Processo de compilação concluído!');
