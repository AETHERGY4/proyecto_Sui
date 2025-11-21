import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { networkConfig } from './networkConfig.js'

// DISEHOS
import './index.css'
import App from './App.jsx'
import "@mysten/dapp-kit/dist/index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={QueryClient}>
      <SuiClientProvider networks={networkConfig}>
       <WalletProvider autoConnect>
          <App />
       </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
 </StrictMode>,
)
