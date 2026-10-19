import { useState } from 'react';
import { USUARIOS } from '../../datos/usuarios';
import Boton from '../atomos/Boton';

const claseBadge: Record<string, string> = {
  Administrador: 'badge-rol-admin',
  Contratista: 'text-bg-info',
  Cliente: 'badge-rol-usuario',
};

export default function TablaUsuariosAdmin() {
  const [busqueda, setBusqueda] = useState('');
  const [, setVersion] = useState(0);

  const filtrados = USUARIOS.filter(
    (u) =>
      `${u.nombre} ${u.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.mail.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.run.includes(busqueda),
  );

  function alternarActivo(run: string) {
    const u = USUARIOS.find((u) => u.run === run);
    if (u) u.activo = !u.activo;
    setVersion((v) => v + 1);
  }

  return (
    <div>
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
                  <Boton variante="outline" tamano="sm" onClick={() => alternarActivo(u.run)}>
                    {u.activo ? 'Desactivar' : 'Activar'}
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
