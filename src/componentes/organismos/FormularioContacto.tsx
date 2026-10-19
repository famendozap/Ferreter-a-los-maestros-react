import { useState, type FormEvent } from 'react';
import CampoFormulario from '../moleculas/CampoFormulario';
import Boton from '../atomos/Boton';
import { validarContacto } from '../../utils/validaciones';

const MAX_CARACTERES = 500;

export default function FormularioContacto() {
  const [datos, setDatos] = useState({ nombre: '', mail: '', mensaje: '' });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  // Valida el formulario y muestra confirmación local; todavía no envía datos a un servidor.
  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    const resultado = validarContacto(datos);
    setErrores(resultado.errores);
    if (!resultado.valido) return;
    setEnviado(true);
    setDatos({ nombre: '', mail: '', mensaje: '' });
  }

  return (
    <form noValidate onSubmit={manejarEnvio} className="mx-auto" style={{ maxWidth: '560px' }}>
      {enviado && (
        <div className="alert alert-success py-2">
          ¡Gracias por escribirnos! Te responderemos a la brevedad.
        </div>
      )}

      <CampoFormulario
        etiqueta="Nombre"
        id="nombreContacto"
        value={datos.nombre}
        onChange={(e) => setDatos((p) => ({ ...p, nombre: e.target.value }))}
        error={errores.nombre}
      />
      <CampoFormulario
        etiqueta="Correo electrónico"
        id="mailContacto"
        type="email"
        value={datos.mail}
        onChange={(e) => setDatos((p) => ({ ...p, mail: e.target.value }))}
        error={errores.mail}
      />

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
          rows={5}
          maxLength={MAX_CARACTERES}
          value={datos.mensaje}
          onChange={(e) => setDatos((p) => ({ ...p, mensaje: e.target.value }))}
        />
        <div className="d-flex justify-content-between">
          {errores.mensaje && <div className="invalid-feedback d-block">{errores.mensaje}</div>}
          <div className="contador-caracteres small text-muted ms-auto">
            {datos.mensaje.length} / {MAX_CARACTERES}
          </div>
        </div>
      </div>

      <Boton type="submit" className="w-100">
        Enviar mensaje
      </Boton>
    </form>
  );
}
