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
import CreateRole from './Components/CreateRole';
import CreatePermission from './Components/CreatePermission'
import AdminUserEdit from './Components/AdminEditUser'
import RolesByUser from './Components/RolesByUser'
import EditRole from './Components/EditRole'
import Permissions from './Components/Permissions'
import EditPermission from './Components/EditPermission'
import PermissionsByRole from './Components/PermissionsByRole'
import SuccessfulRegistration from './Components/SuccessfulRegistration'
import ForgotPassword from './Components/ForgotPassword';
import NewPassword from './Components/NewPassword';

//Aca configuramos solamente rutas y a que componente va dirigido

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/main" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/permissions" element={<Permissions />} />
      <Route path="/editpermission" element={<EditPermission />} />
      <Route path="/createrole" element={<CreateRole />} />
      <Route path="/rolesbyuser" element={<RolesByUser/>} />
      <Route path="/permissionsbyrole" element={<PermissionsByRole/>} />
      <Route path="/createpermission" element={<CreatePermission />} />
      <Route path="/adminuseredit" element={<AdminUserEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/editrole" element={<EditRole/>} />
      <Route path="/sucessregister/:id" element={<SuccessfulRegistration/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/newpassword/:id" element={<NewPassword/>} />
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

