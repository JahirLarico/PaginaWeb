import './App.css';

import Login from './pages/Login';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AgregarDisco from './pages/AgregarDisco';
import AgregarCliente from './pages/AgregarCliente';
import Historial from './pages/Historial';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agregarDisco" element={<AgregarDisco />} />
        <Route path="/agregarCliente" element={<AgregarCliente />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
