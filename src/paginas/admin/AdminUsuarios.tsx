import { Link } from 'react-router-dom';
import TablaUsuariosAdmin from '../../componentes/organismos/TablaUsuariosAdmin';
import Boton from '../../componentes/atomos/Boton';

export default function AdminUsuarios() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Mantenedor de usuarios</h1>
        <Link to="/admin/usuarios/nuevo">
          <Boton>+ Nuevo usuario</Boton>
        </Link>
      </div>
      <TablaUsuariosAdmin />
    </div>
  );
}
