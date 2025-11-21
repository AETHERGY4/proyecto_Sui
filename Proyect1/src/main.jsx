import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getFullnodeUrl } from "@mysten/sui.js/client"

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>
)
