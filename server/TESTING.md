
# Guia de Testes - AlphaEdge Trading Bot

Este guia fornece instruções detalhadas para executar e criar testes para o AlphaEdge Trading Bot.

## Executando Testes

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM (v8 ou superior)

### Configuração Inicial
1. Instale as dependências de desenvolvimento:
```bash
npm install
```

2. O projeto utiliza Jest como framework de testes:
```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm test -- --coverage

# Executar um arquivo específico de testes
npm test -- tests/TradingBot.test.js

# Executar testes em modo watch (para desenvolvimento)
npm test -- --watch
```

## Estrutura de Testes

Os testes estão organizados na pasta `tests/`, espelhando a estrutura do código fonte:

- `TradingBot.test.js` - Testes para a lógica principal do bot
- `websocket.test.js` - Testes para servidor WebSocket
- `blockchainController.test.js` - Testes para controladores da API blockchain

## Mocks e Stubs

O projeto usa mocks para substituir dependências externas durante os testes:

### Blockchain e Ethers.js
```javascript
jest.mock('ethers', () => ({
  JsonRpcProvider: jest.fn().mockImplementation(() => ({
    // Mock methods aqui
  })),
  Contract: jest.fn().mockImplementation(() => ({
    // Mock de métodos do contrato aqui
  })),
  // Outras funções do ethers...
}));
```

### APIs Externas (axios)
```javascript
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      // Mock de resposta da API aqui
    }
  })
}));
```

## Escrevendo Novos Testes

### 1. Criando um Teste de Unidade
Exemplo de estrutura para novos testes:

```javascript
const { describe, it, beforeEach, afterEach, expect, jest } = require('@jest/globals');
const ModuleToTest = require('../path/to/module');

// Configure mocks conforme necessário
jest.mock('dependency', () => ({
  // Mock implementation aqui
}));

describe('Nome do Módulo', () => {
  let instance;
  
  beforeEach(() => {
    // Configuração antes de cada teste
    instance = new ModuleToTest();
  });
  
  afterEach(() => {
    // Limpeza após cada teste
    jest.clearAllMocks();
  });
  
  it('deve fazer algo específico', () => {
    // Arrange - prepare dados
    const input = 'test';
    
    // Act - execute função
    const result = instance.someMethod(input);
    
    // Assert - verifique resultado
    expect(result).toBe('expectado');
  });
});
```

### 2. Testando Controllers

Para testar controllers que usam requisições e respostas HTTP:

```javascript
const { describe, it, beforeEach, expect, jest } = require('@jest/globals');
const { someController } = require('../controllers/someController');

describe('Some Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Mock de request e response
    req = {
      body: {},
      query: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  it('deve retornar sucesso quando tudo está ok', async () => {
    // Configure request
    req.body.someParam = 'value';
    
    // Execute controller
    await someController(req, res);
    
    // Verifique response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true
    }));
  });
});
```

### 3. Testando Integração WebSocket

Para testar a comunicação WebSocket:

```javascript
const { describe, it, beforeEach, expect, jest } = require('@jest/globals');
const WebSocket = require('ws');
const setupWebSocket = require('../websocket/server');

// Mock do WebSocket (veja o padrão no websocket.test.js)

describe('WebSocket Integration', () => {
  // Configuração e testes
});
```

## Cobertura de Testes

Recomendamos manter uma alta cobertura de testes, especialmente para:

1. **Trading Strategies**: Todas as estratégias de trading devem ter testes dedicados
2. **Blockchain Interactions**: Operações com blockchain devem ser testadas com mocks apropriados
3. **Error Handling**: Testes para cenários de erro são essenciais para robustez

## Testes de Integração

Para testes que verificam múltiplos componentes trabalhando juntos:

1. Crie arquivos de teste com nomenclatura `*.integration.test.js`
2. Use mocks apenas para dependências externas, não para componentes internos
3. Verifique o fluxo completo de dados entre componentes

## Solução de Problemas nos Testes

### Problemas Comuns

1. **Mocks não funcionando corretamente**
   - Verifique se o caminho do módulo mockado está correto
   - Confirme que o mock está definido antes de importar o módulo que o utiliza

2. **Testes assíncronos falham**
   - Certifique-se de usar `async/await` ou retornar promises
   - Use `done()` para testes que usam callbacks

3. **Erros de cobertura**
   - Verifique condicionais e caminhos de erro não testados
   - Use ferramenta de cobertura do Jest para identificar linhas não testadas

## Recursos de Aprendizado

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [Guia de Mocking](https://jestjs.io/docs/mock-functions)
- [Testing Asynchronous Code](https://jestjs.io/docs/asynchronous)
