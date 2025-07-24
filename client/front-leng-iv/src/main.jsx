import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Inicio } from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Productos } from './pages/Productos'
import { Header } from './components/Header'
import { Ventas } from './pages/Ventas'
import { Clientes } from './pages/Clientes'
import { GlobalContextProvider } from './context/GlobalContext'

createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
  <BrowserRouter>
    <Header></Header>

    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path='/productos' element={<Productos></Productos>}></Route>
      <Route path='/ventas' element={<Ventas></Ventas>}></Route>
      <Route path='/clientes' element={<Clientes></Clientes>}></Route>
    </Routes>
  </BrowserRouter>
  </GlobalContextProvider>
)
