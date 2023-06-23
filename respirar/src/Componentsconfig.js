// Importamos componentes
import Users from './Components/Users';
import Roles from './Components/Roles';
import CreateRole from './Components/CreateRole';
import CreatePermission from './Components/CreatePermission';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import Permissions from './Components/Permissions'

const components = {
    'Users': { 
        "component":Users,
        "onClick":'Users',
        "Title": "Usuarios",
        "permissions":["VER USUARIOS"]
    },
    'Roles': { 
        "component":Roles,
        "onClick":'Roles',
        "Title": "Roles",
        "permissions":["VER ROLES"]
    },
    'CreateRole': { 
        "component":CreateRole,
        "onClick":'CreateRole',
        "Title": "Crear Roles",
        "permissions":["CREAR ROLES"] 
    },
    'CreatePermission': { 
        "component":CreatePermission,
        "onClick":'CreatePermission',
        "Title": "Crear Permisos",
        "permissions":["CREAR PERMISOS"]
    },
    'Permissions': { 
        "component":Permissions,
        "onClick":'Permissions',
        "Title": "Permisos",
        "permissions":["VER PERMISOS"]
    },
    'Profile': { 
        "component":Profile,
        "onClick":'Profile',
        "Title": "Ver Perfil",
        "permissions":["Basic"]
    },
    'EditProfile': { 
        "component":EditProfile,
        "onClick":'EditProfile',
        "Title": "Editar Mí Perfil",
        "permissions":["Basic"]
    },
    'CreateUserAsPublic': {
        "permissions":["HABILITAR REGISTRO PUBLICO"]
    },
}

export default components;