import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../moleculas/CampoFormulario';
import SelectorRegionComuna from '../moleculas/SelectorRegionComuna';
import Boton from '../atomos/Boton';
import { validarRegistro, formatearRUN } from '../../utils/validaciones';
import { USUARIOS, buscarUsuarioPorRun, buscarUsuarioPorMail } from '../../datos/usuarios';
import { useSesion } from '../../hooks/SesionContexto';

export default function FormularioRegistro() {
  const [datos, setDatos] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    mail: '',
    clave: '',
    confirmarClave: '',
    region: '',
    comuna: '',
    direccion: '',
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion } = useSesion();

  function actualizar<K extends keyof typeof datos>(campo: K, valor: string) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    const resultado = validarRegistro(datos);

    const runFormateado = formatearRUN(datos.run);
    if (resultado.valido) {
      if (buscarUsuarioPorRun(runFormateado)) {
        resultado.errores.run = 'Ya existe una cuenta registrada con ese RUN.';
        resultado.valido = false;
      }
      if (buscarUsuarioPorMail(datos.mail)) {
        resultado.errores.mail = 'Ya existe una cuenta registrada con ese correo.';
        resultado.valido = false;
      }
    }

    setErrores(resultado.errores);
    if (!resultado.valido) return;

    const nuevoUsuario = {
      run: runFormateado,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      mail: datos.mail,
      clave: datos.clave,
      tipoUsuario: 'Cliente' as const,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion,
      activo: true,
    };
    USUARIOS.push(nuevoUsuario);
    iniciarSesion(nuevoUsuario);
    setMensajeExito('¡Cuenta creada correctamente! Redirigiendo al catálogo...');
    setTimeout(() => navigate('/catalogo'), 1200);
  }

  return (
    <form noValidate onSubmit={manejarEnvio} className="mx-auto" style={{ maxWidth: '620px' }}>
      {mensajeExito && <div className="alert alert-success py-2">{mensajeExito}</div>}

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="RUN (ej: 12.345.678-5)"
            id="run"
            value={datos.run}
            onChange={(e) => actualizar('run', e.target.value)}
            error={errores.run}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Nombre"
            id="nombre"
            value={datos.nombre}
            onChange={(e) => actualizar('nombre', e.target.value)}
            error={errores.nombre}
          />
        </div>
      </div>

      <CampoFormulario
        etiqueta="Apellidos"
        id="apellidos"
        value={datos.apellidos}
        onChange={(e) => actualizar('apellidos', e.target.value)}
        error={errores.apellidos}
      />

      <CampoFormulario
        etiqueta="Correo electrónico"
        id="mail"
        type="email"
        value={datos.mail}
        onChange={(e) => actualizar('mail', e.target.value)}
        error={errores.mail}
      />

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Contraseña"
            id="clave"
            type="password"
            value={datos.clave}
            onChange={(e) => actualizar('clave', e.target.value)}
            error={errores.clave}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Confirmar contraseña"
            id="confirmarClave"
            type="password"
            value={datos.confirmarClave}
            onChange={(e) => actualizar('confirmarClave', e.target.value)}
            error={errores.confirmarClave}
          />
        </div>
      </div>

      <SelectorRegionComuna
        region={datos.region}
        comuna={datos.comuna}
        onRegionChange={(v) => actualizar('region', v)}
        onComunaChange={(v) => actualizar('comuna', v)}
        errorRegion={errores.region}
        errorComuna={errores.comuna}
      />

      <CampoFormulario
        etiqueta="Dirección"
        id="direccion"
        value={datos.direccion}
        onChange={(e) => actualizar('direccion', e.target.value)}
        error={errores.direccion}
      />

      <Boton type="submit" className="w-100 mt-2">
        Crear cuenta
      </Boton>
    </form>
  );
}
