import { Link } from 'react-router-dom';
import FormularioRegistro from '../componentes/organismos/FormularioRegistro';

export default function Registro() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4 text-center">
        <h1 className="h2">Crear cuenta</h1>
        <p className="text-muted">Regístrate para guardar tu selección y consultar tu cuenta corriente.</p>
      </div>
      <FormularioRegistro />
      <p className="text-center small mt-3">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}
