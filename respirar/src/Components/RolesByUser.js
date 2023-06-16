import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RolesByUser = () => {
    const [roles, setRoles] = useState([]);
    const location = useLocation();
    const { state } = location;
    const userId = state.userId; // Corregir destructuración

    useEffect(() => {
        getRoles();
    }, []);


    const editRole = (roleId) => {
        // Realiza la lógica para editar el rol con el ID proporcionado
        console.log(`Editar el rol con ID ${roleId}`);
    };

    const deleteRole = (roleId) => {
        // Realiza la lógica para eliminar el rol con el ID proporcionado
        console.log(`Eliminar el rol con ID ${roleId}`);
    };

    

    const getRoles = async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/user/${userId}/roles`);
            //ok
            const roleList = response.data.role_user_assignments; // Acceder a la propiedad role_user_assignments
            const roleIds = roleList.map((role) => role.role_id); // Extraer los IDs de los roles

            const rolesWithNames = [];

            for (const roleId of roleIds) {
                const roleResponse = await axios.get(`http://localhost:3001/api/roles/${roleId}`);
                const roleData = roleResponse.data;
                // console.log("rol numero " + x + " " + roleData.role.name)
                rolesWithNames.push(roleData.role);
            }
            setRoles(rolesWithNames);
        } catch (error) {
            console.error('Error al obtener la lista de roles:', error);
        }
    };

    return (
        <div className="container my-4">

            <div>
                <h2 className="mb-4">Lista de roles</h2>
                <div className="list-group">
                    {Array.isArray(roles) && roles.map((role) => (
                        <div key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {role.name}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default RolesByUser;
