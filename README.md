![MegaAPI Logo](https://img.shields.io/badge/MegaAPI-WhatsApp%20Automation-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

# 🚀 N8N Community Nodes - MegaAPI

Este Community Node é uma solução para quem quer usar a megaAPI, criada com o intuito de simplificar e auxiliar toda a comunidade a integrar e utilizar ao máximo os principais recursos oferecidos pela **megaAPI** em seus projetos no N8N. **Desenvolvido com ❤️ pelo Júnior.**

![Version](https://img.shields.io/badge/version-1.0.2-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![N8N](https://img.shields.io/badge/n8n-1.54.4+-orange?style=for-the-badge)

---

## 📋 Índice

- [⚙️ Requisitos](#️-requisitos)
- [🚀 Instalação](#-instalação)
- [🔧 Configuração](#-configuração)
- [📌 Recursos Disponíveis](#-recursos-disponíveis)
- [📖 Documentação](#-documentação)

---

## ⚙️ Requisitos

Para utilizar o nosso **Community Node**, é necessário atender aos seguintes requisitos:

- **N8N** na versão **1.54.4** ou superior
- **Um plano megaAPI pago ou trial**

---

## 🚀 Instalação

### Método 1: Via Interface do N8N (Recomendado)

1. Acesse seu N8N
2. Vá em **Settings** → **Community Nodes**
3. Clique em **Install a community node**
4. Digite: `n8n-nodes-megaapi`
5. Clique em **Install**

### Método 2: Via NPM

```bash
npm install n8n-nodes-megaapi
```

---

## 🔧 Configuração

### Credenciais MegaAPI

Para usar este node, você precisa configurar as credenciais da MegaAPI:

1. **Host**: URL da sua instância MegaAPI (ex: `https://apistart01.megaapi.com.br`)
2. **Instance Key**: Chave da instância obtida no painel da MegaAPI
3. **Token**: Token de autenticação da sua conta MegaAPI

### Como Obter as Credenciais

1. Acesse o painel da MegaAPI ([megaapi.io](https://megaapi.io))
2. Copie o **Instance Key**, **Host** e **Token** no painel de detalhes da sua instancia
3. Configure no N8N em **Credentials** → **MegaAPI Credentials**

## 📌 Recursos Disponíveis

### 🏷️ Instance

🖥️ Este recurso oferece acesso completo às principais funcionalidades relacionadas às instâncias da MegaAPI. Ele permite realizar operações essenciais, como gerar códigos de pareamento, códigos QR, obter status da instância, fazer logout, reiniciar e verificar se números estão no WhatsApp.

**Lista de operações:**
- ✅ **Generate Pairing Code** - Gerar código de pareamento para conectar WhatsApp
- ✅ **Generate QR Code** - Gerar código QR para conexão via QR
- ✅ **Status** - Verificar status da instância WhatsApp
- ✅ **Logout** - Desconectar a instância do WhatsApp
- ✅ **Restart** - Reiniciar a instância WhatsApp
- ✅ **Download Media Message** - Baixar arquivos de mídia de mensagens
- ✅ **Is On WhatsApp** - Verificar se um número está no WhatsApp

### ✉️ Message

📱 Este recurso concentra todas as funcionalidades relacionadas ao envio e gerenciamento de mensagens através da MegaAPI. Com ele, você pode enviar diversos tipos de conteúdo como textos, imagens, vídeos, áudios, documentos, localizações, listas interativas e links com preview. Cada tipo de mensagem possui opções avançadas e formatações especiais.

**Lista de operações:**
- ✅ **Send Text Message** - Enviar mensagens de texto simples
- ✅ **Send Media Base64** - Enviar arquivos de mídia via base64
- ✅ **Send Media URL** - Enviar arquivos de mídia via URL
- ✅ **Send Location** - Enviar localização geográfica
- ✅ **Send Link Preview** - Enviar links com preview automático
- ✅ **Send List Message** - Enviar listas interativas
- ✅ **Quote Message** - Responder/citar mensagens existentes
- ✅ **Forward Message** - Encaminhar mensagens

### 👥 Group

🔗 Com este recurso, você conta com um conjunto completo de funcionalidades para gerenciamento de grupos no WhatsApp por meio da MegaAPI. Ele abrange desde a criação e administração de grupos até o gerenciamento completo de participantes, incluindo adicionar, remover e sair de grupos.

**Lista de operações:**
- ✅ **Create Group** - Criar novos grupos WhatsApp
- ✅ **Get Groups** - Listar todos os grupos da instância
- ✅ **Details Group** - Obter informações detalhadas de um grupo
- ✅ **Add Participants** - Adicionar participantes a grupos existentes
- ✅ **Remove Participants** - Remover participantes de grupos
- ✅ **Leave Group** - Sair de grupos WhatsApp
- ✅ **Send Message Group** - Enviar mensagens de texto para grupos
- ✅ **Send Media Base64 Group** - Enviar arquivos base64 para grupos
- ✅ **Send Media URL Group** - Enviar arquivos por URL para grupos

### 💬 Chat

🗨️ Este recurso disponibiliza um conjunto abrangente de ferramentas para o gerenciamento de conversas e interações utilizando a MegaAPI. Com ele, é possível controlar status de presença, deletar mensagens e gerenciar conversas de forma eficiente.

**Lista de operações:**
- ✅ **Presence Update Chat** - Atualizar status de presença (digitando, online, etc.)
- ✅ **Delete Message** - Deletar mensagens para todos
- ✅ **Delete Message From Me** - Deletar mensagens apenas para você

### 🔗 Webhook

⚡ Este recurso oferece mecanismos avançados para integração e monitoramento em tempo real das atividades da MegaAPI. Ele permite configurar e gerenciar Webhooks, possibilitando o acompanhamento de eventos como mensagens recebidas, alterações em grupos, status de conexão e muito mais.

**Lista de operações:**
- ✅ **Get Webhook** - Obter configurações atuais do webhook
- ✅ **Config Webhook** - Configurar URL e status do webhook

## 📖 Documentação

### 🔍 Formatos de Dados

#### Números de Telefone
- **Formato Individual**: `5511999999999@s.whatsapp.net`
- **Formato de Grupo**: `120363041490582303@g.us`

#### Tipos de Mídia Suportados
- **Imagem**: `image/jpeg`, `image/png`, `image/gif`
- **Vídeo**: `video/mp4`, `video/avi`, `video/mov`
- **Áudio**: `audio/mp3`, `audio/ogg`, `audio/wav`
- **Documento**: `application/pdf`, `application/doc`, `text/plain`

### 🚨 Tratamento de Erros

O node retorna informações detalhadas sobre erros:

```json
{
  "success": false,
  "error": true,
  "message": "Descrição do erro",
  "statusCode": 400,
  "timestamp": "2025-06-24T10:30:00.000Z"
}
```

### 📊 Logs de Debug

Todos os nodes incluem logs detalhados para facilitar o debug:

- 🔐 Carregamento de credenciais
- 📋 Parâmetros da operação
- 🌐 URL completa da requisição
- 📤 Opções da requisição
- 📥 Resposta recebida
- ✅ Status da operação

### 🐛 Reportar Bugs

Encontrou um bug? Ajude-nos a corrigi-lo:
**Envie para nosso contato whatsapp (61) 99556-2618**

### 💡 Sugerir Funcionalidades

Tem uma ideia para melhorar o node?
**Envie para nosso contato whatsapp (61) 99556-2618**

---

## 📊 Estatísticas

![GitHub stars](https://img.shields.io/github/stars/yourlogo2018/n8n-nodes-megaapi?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourlogo2018/n8n-nodes-megaapi?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourlogo2018/n8n-nodes-megaapi)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourlogo2018/n8n-nodes-megaapi)

---

---

**Desenvolvido com ❤️ pela equipe megaAPI**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)
![Community Driven](https://img.shields.io/badge/Community-Driven-blue?style=for-the-badge)
