// src/utils/withRouter.js
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function withRouter(Component) {
  return function Wrapper(props) {
    const params = useParams();  // Obtiene los parámetros de la URL
    const navigate = useNavigate();  // Obtiene la función para navegar
    const location = useLocation();  // Obtiene la ubicación actual

    // Pasar las props necesarias a tu componente
    return <Component {...props} router={{ params, navigate, location }} />;
  };
}
