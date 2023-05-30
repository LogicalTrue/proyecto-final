import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import CallbackPage from './Components/CallbackPage';

//Aca configuramos solamente rutas y a que componente va dirigido

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

