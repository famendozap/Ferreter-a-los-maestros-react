import { Link } from 'react-router-dom';
import FormularioLogin from '../componentes/organismos/FormularioLogin';

export default function Login() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4 text-center">
        <h1 className="h2">Ingresar</h1>
      </div>
      <FormularioLogin />
      <p className="text-center small mt-3">
        ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}
