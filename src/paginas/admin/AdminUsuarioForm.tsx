import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { USUARIOS, buscarUsuarioPorRun, type TipoUsuario, type Usuario } from '../../datos/usuarios';
import CampoFormulario from '../../componentes/moleculas/CampoFormulario';
import SelectorRegionComuna from '../../componentes/moleculas/SelectorRegionComuna';
import Boton from '../../componentes/atomos/Boton';
import { validarRUN, esEmailValido, formatearRUN } from '../../utils/validaciones';

const USUARIO_VACIO: Usuario = {
  run: '',
  nombre: '',
  apellidos: '',
  mail: '',
  clave: '',
  tipoUsuario: 'Cliente',
  region: '',
  comuna: '',
  direccion: '',
  activo: true,
};

export default function AdminUsuarioForm() {
  const { run } = useParams<{ run: string }>();
  const esNuevo = !run || run === 'nuevo';
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>(() =>
    esNuevo ? USUARIO_VACIO : (buscarUsuarioPorRun(decodeURIComponent(run!)) ?? USUARIO_VACIO),
  );
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardado, setGuardado] = useState(false);

  function actualizar<K extends keyof Usuario>(campo: K, valor: Usuario[K]) {
    setUsuario((u) => ({ ...u, [campo]: valor }));
  }

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    const nuevosErrores: Record<string, string> = {};
    if (!validarRUN(usuario.run)) nuevosErrores.run = 'RUN inválido.';
    if (!usuario.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!esEmailValido(usuario.mail)) nuevosErrores.mail = 'Correo inválido.';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const usuarioFormateado = { ...usuario, run: formatearRUN(usuario.run) };

    if (esNuevo) {
      USUARIOS.push(usuarioFormateado);
    } else {
      const idx = USUARIOS.findIndex((u) => u.run === run);
      if (idx >= 0) USUARIOS[idx] = usuarioFormateado;
    }
    setGuardado(true);
    setTimeout(() => navigate('/admin/usuarios'), 900);
  }

  return (
    <div className="container py-5" style={{ maxWidth: '620px' }}>
      <h1 className="h2 mb-4">{esNuevo ? 'Nuevo usuario' : 'Editar usuario'}</h1>

      {guardado && <div className="alert alert-success py-2">Usuario guardado correctamente.</div>}

      <form onSubmit={manejarEnvio}>
        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="RUN"
              id="run"
              value={usuario.run}
              onChange={(e) => actualizar('run', e.target.value)}
              error={errores.run}
              disabled={!esNuevo}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="tipoUsuario">
              Rol
            </label>
            <select
              id="tipoUsuario"
              className="form-select"
              value={usuario.tipoUsuario}
              onChange={(e) => actualizar('tipoUsuario', e.target.value as TipoUsuario)}
            >
              <option value="Administrador">Administrador</option>
              <option value="Contratista">Contratista</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Nombre"
              id="nombre"
              value={usuario.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              error={errores.nombre}
            />
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Apellidos"
              id="apellidos"
              value={usuario.apellidos}
              onChange={(e) => actualizar('apellidos', e.target.value)}
            />
          </div>
        </div>

        <CampoFormulario
          etiqueta="Correo electrónico"
          id="mail"
          type="email"
          value={usuario.mail}
          onChange={(e) => actualizar('mail', e.target.value)}
          error={errores.mail}
        />

        <SelectorRegionComuna
          region={usuario.region}
          comuna={usuario.comuna}
          onRegionChange={(v) => actualizar('region', v)}
          onComunaChange={(v) => actualizar('comuna', v)}
        />

        <CampoFormulario
          etiqueta="Dirección"
          id="direccion"
          value={usuario.direccion}
          onChange={(e) => actualizar('direccion', e.target.value)}
        />

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="activo"
            checked={usuario.activo}
            onChange={(e) => actualizar('activo', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="activo">
            Usuario activo
          </label>
        </div>

        <Boton type="submit" className="w-100 mt-2">
          Guardar usuario
        </Boton>
      </form>
    </div>
  );
}
