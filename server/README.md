
# AlphaEdge Trading Bot - Backend Server

Este é o servidor backend para o bot de trading AlphaEdge, que gerencia a lógica de negociação, integração com blockchain e endpoints de API.

## Requisitos

- Node.js (v18 ou superior recomendado)
- NPM (v8 ou superior recomendado)
- Conta na rede Optimism (opcional para modo de produção)
- Chaves de API para acesso a serviços externos (opcional)

## Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd alphaedge-trading-bot
```

2. Instale as dependências do servidor:
```bash
cd server
npm install
```

3. Copie o arquivo de ambiente de exemplo e configure suas variáveis:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:
```
# Configurações de rede blockchain
OPTIMISM_RPC_URL=https://mainnet.optimism.io    # URL RPC da rede Optimism
TRADER_PRIVATE_KEY=                            # Chave privada da carteira para transações (opcional)

# Configurações do servidor
PORT=3000                                      # Porta da API REST
WS_PORT=4001                                   # Porta do WebSocket

# Configurações de API externas
COINGECKO_API_KEY=                             # Chave de API do CoinGecko (opcional)
```

5. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## Modos de Operação

### Modo de Teste

Por padrão, o bot inicia em modo de teste (`mode: 'test'` na configuração). Neste modo:
- As transações são simuladas, sem execução real na blockchain
- Os dados de preço podem ser simulados se não houver conexão com blockchain
- Ideal para testar estratégias e a interface do usuário

### Modo de Produção

Para operar com transações reais:
1. Configure `TRADER_PRIVATE_KEY` no arquivo `.env`
2. Atualize a configuração do bot para `mode: 'production'`
3. Certifique-se que a carteira tenha fundos suficientes em ETH e tokens

**ATENÇÃO:** Use o modo de produção com cuidado e comece com valores pequenos.

## API REST

### Endpoint do Bot
- `POST /api/bot/start` - Inicia o bot de trading
- `POST /api/bot/stop` - Para o bot de trading
- `GET /api/bot/status` - Obtém o status atual do bot

### Endpoints de Configuração
- `GET /api/bot/config` - Obtém a configuração atual do bot
- `POST /api/bot/config` - Atualiza a configuração do bot
- `GET /api/bot/strategies` - Lista estratégias disponíveis
- `POST /api/bot/strategies` - Define a estratégia ativa

### Endpoints de Transação
- `GET /api/transactions` - Obtém histórico de transações
- `GET /api/transactions/:id` - Obtém transação por ID
- `GET /api/transactions/metrics` - Obtém métricas de transações

### Endpoints de Blockchain
- `GET /api/blockchain/balance?address=0x...` - Obtém saldo da carteira
- `GET /api/blockchain/price` - Obtém preço do token
- `GET /api/blockchain/liquidity` - Obtém informações de liquidez

## API WebSocket

Conecte-se a `ws://localhost:4001` para atualizações em tempo real:

### Mensagens do Cliente para o Servidor:
```javascript
// Obter status do bot
{
  "type": "getStatus"
}

// Iniciar o bot
{
  "type": "startBot"
}

// Parar o bot
{
  "type": "stopBot"
}

// Atualizar configuração
{
  "type": "updateConfig",
  "config": {
    "strategy": "buyDip",
    "investmentAmount": 0.1,
    "buyThreshold": 5,
    "stopLoss": 10
  }
}

// Obter histórico de preços
{
  "type": "getPriceHistory"
}
```

### Mensagens do Servidor para o Cliente:
```javascript
// Atualizações de status
{
  "type": "status",
  "data": {
    "isRunning": true,
    "config": { /* configurações do bot */ },
    "priceData": { /* dados de preço atuais */ },
    "tradingState": { /* estado atual */ },
    "lastUpdate": "2023-10-30T12:34:56Z"
  }
}

// Atualizações de preço
{
  "type": "priceUpdate",
  "data": {
    "price": 0.00022,
    "timestamp": 1698661234567
  }
}

// Transações
{
  "type": "transaction",
  "data": {
    "id": "tx-1698661234567",
    "timestamp": "2023-10-30T12:34:56Z",
    "type": "buy",
    "tokenAmount": 100,
    "tokenSymbol": "opXEN",
    "price": 0.00022,
    "total": 0.022,
    "status": "completed",
    "txHash": "0x..."
  }
}

// Erros
{
  "type": "error",
  "data": {
    "message": "Descrição do erro"
  }
}
```

## Estratégias de Trading

O bot suporta múltiplas estratégias:

### 1. Buy the Dip (buyDip)
Compra quando o preço cai abaixo de um limiar definido e vende quando atinge uma perda máxima aceitável.

Configurações:
- `buyThreshold`: Porcentagem de queda que aciona compra (ex: 5%)
- `stopLoss`: Porcentagem de perda aceitável (ex: 10%)

### 2. Dollar Cost Averaging (dca)
Compra em intervalos regulares, independentemente do preço.

### 3. Volatilidade (volatility)
Compra quando detecta alta volatilidade e o preço está próximo de mínimas recentes.

## Executando Testes

Para executar testes automatizados:

```bash
npm test
```

Para executar testes com cobertura:

```bash
npm test -- --coverage
```

## Estrutura do Projeto

```
server/
├── abis/                  # ABIs de contratos Ethereum
├── bot/                   # Lógica principal do bot de trading
├── controllers/           # Controladores da API REST
├── routes/                # Rotas da API REST
├── tests/                 # Testes automatizados
├── websocket/             # Servidor WebSocket para atualizações em tempo real
├── .env                   # Variáveis de ambiente
├── .env.example           # Exemplo de variáveis de ambiente
├── index.js               # Ponto de entrada do servidor
└── package.json           # Dependências e scripts
```

## Segurança

- Em produção, configure autenticação adequada para endpoints da API
- Nunca armazene chaves privadas no código
- Use variáveis de ambiente para informações sensíveis
- Considere usar armazenamento seguro de chaves (como AWS KMS ou HashiCorp Vault)

## Solução de Problemas

### O bot não conecta ao blockchain
- Verifique a URL RPC em seu arquivo `.env`
- Certifique-se de que a rede Optimism está acessível
- Verifique se não há problemas com firewalls ou conexão

### Transações falham em modo de produção
- Verifique se a carteira tem ETH suficiente para gás
- Verifique se há aprovações de token necessárias
- Inspecione os logs para mensagens de erro detalhadas

### Preços não estão atualizando
- Verifique se o preço está sendo obtido da fonte correta
- Verifique se as APIs externas estão acessíveis
- Inspecione os logs para erros de API

## Próximos Passos

- Adicionar mais estratégias de trading
- Implementar análise técnica avançada
- Melhorar o tratamento de erros e recuperação
- Adicionar autenticação para API
