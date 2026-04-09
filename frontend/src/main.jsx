import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CredentialDetail from './pages/CredentialDetail.jsx'
import TitleDetail from './pages/TitleDetail.jsx'
import CLRList from './pages/CLRList.jsx'
import CLRDetail from './pages/CLRDetail.jsx'
import PublicCredential from './pages/PublicCredential.jsx'
import PublicTitle from './pages/PublicTitle.jsx'
import PublicCLR from './pages/PublicCLR.jsx'
import PublicVerifier from './pages/PublicVerifier.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clr" element={<App initialTab="clr" />} />
        <Route path="/credential/:id" element={<CredentialDetail />} />
        <Route path="/title/:id" element={<TitleDetail />} />
        <Route path="/clr/:id" element={<CLRDetail />} />
        <Route path="/public/credential/:id" element={<PublicCredential />} />
        <Route path="/public/title/:id" element={<PublicTitle />} />
        <Route path="/public/clr/:id" element={<PublicCLR />} />
        <Route path="/verify" element={<PublicVerifier />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
