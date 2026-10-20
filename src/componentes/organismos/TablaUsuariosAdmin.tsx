import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  actualizarUsuario,
  eliminarUsuario,
  filtrarUsuarios,
  listarUsuarios,
  type Usuario,
} from '../../datos/usuarios';
import Boton from '../atomos/Boton';

const claseBadge: Record<string, string> = {
  Administrador: 'badge-rol-admin',
  Contratista: 'text-bg-info',
  Cliente: 'badge-rol-usuario',
};

export default function TablaUsuariosAdmin() {
  const [busqueda, setBusqueda] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>(listarUsuarios);
  const [error, setError] = useState('');
  const filtrados = useMemo(
    () => filtrarUsuarios(busqueda).filter((usuario) => usuarios.some((actual) => actual.run === usuario.run)),
    [busqueda, usuarios],
  );

  function alternarActivo(run: string) {
    const usuario = usuarios.find((actual) => actual.run === run);
    if (!usuario) return;
    try {
      actualizarUsuario(run, { ...usuario, activo: !usuario.activo });
      setUsuarios(listarUsuarios());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No fue posible actualizar el usuario.');
    }
  }

  function borrarUsuario(run: string) {
    if (!window.confirm(`¿Eliminar el usuario ${run}?`)) return;
    try {
      eliminarUsuario(run);
      setUsuarios(listarUsuarios());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No fue posible eliminar el usuario.');
    }
  }

  return (
    <div>
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por nombre, correo o RUN..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u) => (
              <tr key={u.run}>
                <td className="font-monospace">{u.run}</td>
                <td>
                  {u.nombre} {u.apellidos}
                </td>
                <td>{u.mail}</td>
                <td>
                  <span className={`badge ${claseBadge[u.tipoUsuario] ?? 'text-bg-secondary'}`}>
                    {u.tipoUsuario}
                  </span>
                </td>
                <td>
                  <span className={`badge ${u.activo ? 'text-bg-success' : 'text-bg-secondary'}`}>
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/admin/usuarios/${encodeURIComponent(u.run)}`}>
                      <Boton variante="outline" tamano="sm">
                        Editar
                      </Boton>
                    </Link>
                    <Boton variante="outline" tamano="sm" onClick={() => alternarActivo(u.run)}>
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </Boton>
                    <Boton
                      variante="danger"
                      tamano="sm"
                      aria-label={`Eliminar usuario ${u.run}`}
                      onClick={() => borrarUsuario(u.run)}
                    >
                      Eliminar
                    </Boton>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-muted">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
