
# AlphaEdge Trading Bot

## Visão Geral

AlphaEdge é um bot de trading automatizado para o token opXEN na rede Optimism. O bot monitora preços e executa estratégias de trading como "buy the dip", DCA (Dollar Cost Averaging) e trading baseado em volatilidade. Inclui uma interface web para monitoramento e configuração.

## URL do Projeto

**URL**: https://lovable.dev/projects/9efd6aac-4e97-448f-bd04-07fd2cc9b16a

## Arquitetura do Sistema

O projeto está dividido em duas partes principais:

1. **Frontend (React/Vite)** - Interface do usuário para monitoramento e controle do bot
2. **Backend (Node.js)** - Servidor para lógica de trading e integração com blockchain

### Tecnologias Utilizadas

#### Frontend
- React com TypeScript
- Tailwind CSS para estilização
- shadcn/ui para componentes de UI
- Recharts para gráficos
- WebSocket para comunicação em tempo real

#### Backend
- Node.js com Express
- ethers.js para integração com blockchain
- WebSocket para atualizações em tempo real
- Jest para testes automatizados

## Configuração e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM (v8 ou superior)
- Git

### Frontend (UI)

1. Clone o repositório:
```sh
git clone <URL_DO_REPOSITÓRIO>
cd <NOME_DO_PROJETO>
```

2. Instale as dependências do frontend:
```sh
npm install
```

3. Inicie o servidor de desenvolvimento:
```sh
npm run dev
```

4. Acesse a interface em `http://localhost:8080`

### Backend (Servidor de Trading)

1. Navegue até a pasta do servidor:
```sh
cd server
```

2. Instale as dependências:
```sh
npm install
```

3. Copie o arquivo de ambiente:
```sh
cp .env.example .env
```

4. Configure o arquivo `.env` com suas credenciais:
```
OPTIMISM_RPC_URL=https://mainnet.optimism.io
TRADER_PRIVATE_KEY=sua-chave-privada-aqui  # Opcional, apenas para modo de produção
```

5. Inicie o servidor:
```sh
npm run dev
```

O servidor estará disponível em `http://localhost:3000` e WebSocket em `ws://localhost:4001`.

## Testes Automatizados

### Executando Testes

Para executar testes do servidor:

```sh
cd server
npm test
```

Para executar testes com cobertura:

```sh
npm test -- --coverage
```

Consulte o arquivo `server/TESTING.md` para detalhes completos sobre testes.

## Trabalhando com o Projeto

Há várias maneiras de trabalhar com este projeto:

### Usando Lovable

Visite [Lovable Project](https://lovable.dev/projects/9efd6aac-4e97-448f-bd04-07fd2cc9b16a) e comece a editar através da interface. As alterações são automaticamente commitadas neste repositório.

### Usando seu IDE Preferido

Clone este repositório e trabalhe localmente. Alterações podem ser enviadas de volta via git.

```sh
# Clone o repositório
git clone <URL_DO_REPOSITÓRIO>

# Navegue para o diretório do projeto
cd <NOME_DO_PROJETO>

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Edição Direta no GitHub

- Navegue até os arquivos desejados
- Clique no botão "Editar" (ícone de lápis)
- Faça suas alterações e commit

### Uso do GitHub Codespaces

- Navegue até a página principal do repositório
- Clique no botão "Código" (verde)
- Selecione a guia "Codespaces"
- Clique em "Novo codespace"

## Principais Funcionalidades

### Bot de Trading
- **Estratégias Múltiplas**: Buy the Dip, DCA, Trading baseado em Volatilidade
- **Modo de Teste e Produção**: Simule trades ou execute transações reais
- **Stop Loss**: Proteção automática contra quedas grandes
- **Monitoramento de Preços**: Integração com pools Uniswap e APIs externas

### Interface Web
- **Dashboard**: Visão geral do desempenho e trades
- **Gráficos em Tempo Real**: Monitoramento de preços e desempenho
- **Configuração do Bot**: Ajustes de estratégias e parâmetros
- **Histórico de Transações**: Registro detalhado de todas as operações

## Integração com Blockchain

O bot integra-se com a rede Optimism para:
- Consultar preços em pools Uniswap V3
- Executar trades através do router Uniswap
- Verificar saldos de tokens
- Monitorar liquidez

### Contratos Relevantes
- **opXEN Token**: `0x4bF66A12B801dAD73B3B4Ff026623eD7B4969489`
- **WETH**: `0x4200000000000000000000000000000000000006`
- **opXEN/WETH Pool**: `0x1A0D5DAEBa1F72b3D3Ce9F86401da34A191D9Ee2`
- **Uniswap V3 Router**: `0xE592427A0AEce92De3Edee1F18E0157C05861564`

## Personalização e Extensão

### Adicionando Novas Estratégias

Para adicionar uma nova estratégia:
1. Crie um método na classe TradingBot (server/bot/TradingBot.js)
2. Adicione a estratégia ao switch em executeStrategy()
3. Atualize a interface para permitir a seleção da nova estratégia

### Suporte a Tokens Adicionais

Para adicionar novos tokens:
1. Adicione o endereço e configuração do token em TradingBot.js
2. Configure o pool correspondente para monitoramento de preços

## Solução de Problemas

Consulte os seguintes recursos:
- `server/README.md` - Documentação do servidor e API
- `server/TESTING.md` - Informações sobre testes
- Logs do servidor - Verifique erros e mensagens detalhadas

## Contribuindo

Contribuições são bem-vindas! Siga estas etapas:
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é licenciado sob os termos da licença MIT.

## Contato e Suporte

Para suporte ou perguntas, abra uma issue no GitHub ou entre em contato através do [Discord da Lovable](https://discord.com/channels/1119885301872070706/1280461670979993613).
