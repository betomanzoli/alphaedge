
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: {
          welcome: "Bem-vindo ao AlphaEdge",
          tradingBot: "Bot de Trading",
          dashboard: "Painel",
          strategies: "Estratégias",
          wallet: "Carteira",
          settings: "Configurações",
          connect: "Conectar",
          disconnect: "Desconectar",
          swap: "Trocar",
          liquidity: "Liquidez",
          pool: "Pool",
          price: "Preço",
          amount: "Quantidade",
          slippage: "Tolerância",
          execute: "Executar",
          loading: "Carregando...",
          networkError: "Erro de rede",
          success: "Sucesso",
          error: "Erro",
          testnet: "Rede de teste",
          mainnet: "Rede principal"
        }
      },
      en: {
        translation: {
          welcome: "Welcome to AlphaEdge",
          tradingBot: "Trading Bot",
          dashboard: "Dashboard",
          strategies: "Strategies",
          wallet: "Wallet",
          settings: "Settings",
          connect: "Connect",
          disconnect: "Disconnect",
          swap: "Swap",
          liquidity: "Liquidity",
          pool: "Pool",
          price: "Price",
          amount: "Amount",
          slippage: "Slippage",
          execute: "Execute",
          loading: "Loading...",
          networkError: "Network Error",
          success: "Success",
          error: "Error",
          testnet: "Testnet",
          mainnet: "Mainnet"
        }
      }
    },
    lng: "pt",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
