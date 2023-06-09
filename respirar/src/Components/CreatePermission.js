import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreatePermission = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [permissionName, setPermissionName] = useState('');
    const [action, setAction] = useState('');
    const [resource, setResource] = useState('');
    const [isRegex, setIsRegex] = useState(false);

    const CreatePermission = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/permissions', {
                name: permissionName,
                action: action,
                resource: resource,
                is_regex: isRegex
            });
            console.log('Permiso creado exitosamente:', response.data);
        } catch (error) {
            console.error('Error al crear el permiso:', error);
        }
    };

    const backToMain = () => {
        navigate('/main', { state });
    };

    return (
        <div>
            <h1>Crear Permiso</h1>
            <div>
                <input type="text" placeholder="Nombre del permiso" value={permissionName} onChange={(e) => setPermissionName(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Acción" value={action} onChange={(e) => setAction(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Recurso" value={resource} onChange={(e) => setResource(e.target.value)} />
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={isRegex} onChange={(e) => setIsRegex(e.target.checked)} />
                    ¿Es una expresión regular?
                </label>
            </div>
            <button onClick={CreatePermission
            }>Crear Permiso</button>
            <button onClick={backToMain}>Volver</button>
        </div>
    );
};

export default CreatePermission;