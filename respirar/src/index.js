import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Main from './Components/Main';
import Users from './Components/Users'
import Profile from './Components/Profile';
import Roles from './Components/Roles';

//Aca configuramos solamente rutas y a que componente va dirigido

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/main" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/profile" element={<Profile />} />
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
