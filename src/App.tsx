
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Strategies from "./pages/Strategies";
import ApiKeys from "./pages/ApiKeys";
import Market from "./pages/Market";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Risk from "./pages/Risk";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import Docs from "./pages/Docs";
import MevBot from "./pages/MevBot";
import TradingBot from "./pages/TradingBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/api" element={<ApiKeys />} />
          <Route path="/market" element={<Market />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/history" element={<History />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/mev" element={<MevBot />} />
          <Route path="/tradingbot" element={<TradingBot />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
