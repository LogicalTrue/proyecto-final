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
import EditProfile from './Components/EditProfile';
import RegisterForm from './Components/RegisterForm';
import PostRegister from './Components/PostRegister';
import CreateRole from './Components/CreateRole';
import AssignRole from './Components/AssignRole';
import CreatePermission from './Components/CreatePermission'
import AssignPermission from './Components/AssignPermission';
import AdminUserEdit from './Components/AdminEditUser'


//Aca configuramos solamente rutas y a que componente va dirigido

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/main" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/createrole" element={<CreateRole />} />
      <Route path="/assignrole" element={<AssignRole />} />
      <Route path="/createpermission" element={<CreatePermission />} />
      <Route path="/assignpermission" element={<AssignPermission />} />
      <Route path="/adminuseredit" element={<AdminUserEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/postRegister" element={<PostRegister/>} />
      <Route path="/api/users/activate/:id" element={<LoginForm/>} />
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

