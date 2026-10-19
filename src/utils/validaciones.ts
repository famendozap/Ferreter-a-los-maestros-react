// Reúne validaciones y formatos sin depender del DOM para reutilizarlos en formularios y pruebas.
export function validarRUN(run: string): boolean {
  if (!run) return false;
  const limpio = run.trim().toUpperCase().replace(/[^0-9K]/g, '');
  if (limpio.length < 2) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado: string;
  if (resto === 11) dvEsperado = '0';
  else if (resto === 10) dvEsperado = 'K';
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

export function formatearRUN(run: string): string {
  const limpio = run.trim().toUpperCase().replace(/[^0-9K]/g, '');
  if (limpio.length < 2) return run;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpoFormateado}-${dv}`;
}

export function esEmailValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export interface ResultadoValidacion {
  valido: boolean;
  errores: Record<string, string>;
}

export function validarLogin(correo: string, clave: string): ResultadoValidacion {
  const errores: Record<string, string> = {};
  if (!correo.trim()) errores.correo = 'Debes ingresar tu correo.';
  else if (!esEmailValido(correo)) errores.correo = 'El correo no tiene un formato válido.';

  if (!clave.trim()) errores.clave = 'Debes ingresar tu contraseña.';
  else if (clave.length < 4) errores.clave = 'La contraseña debe tener al menos 4 caracteres.';

  return { valido: Object.keys(errores).length === 0, errores };
}

export interface DatosRegistro {
  run: string;
  nombre: string;
  apellidos: string;
  mail: string;
  clave: string;
  confirmarClave: string;
  region: string;
  comuna: string;
  direccion: string;
}

export function validarRegistro(d: DatosRegistro): ResultadoValidacion {
  const errores: Record<string, string> = {};

  if (!d.run.trim()) errores.run = 'El RUN es obligatorio.';
  else if (!validarRUN(d.run)) errores.run = 'El RUN ingresado no es válido (dígito verificador incorrecto).';

  if (!d.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (!d.apellidos.trim()) errores.apellidos = 'Los apellidos son obligatorios.';

  if (!d.mail.trim()) errores.mail = 'El correo es obligatorio.';
  else if (!esEmailValido(d.mail)) errores.mail = 'El correo no tiene un formato válido.';

  if (!d.clave.trim()) errores.clave = 'La contraseña es obligatoria.';
  else if (d.clave.length < 6) errores.clave = 'La contraseña debe tener al menos 6 caracteres.';

  if (d.confirmarClave !== d.clave) errores.confirmarClave = 'Las contraseñas no coinciden.';

  if (!d.region) errores.region = 'Selecciona una región.';
  if (!d.comuna) errores.comuna = 'Selecciona una comuna.';
  if (!d.direccion.trim()) errores.direccion = 'La dirección es obligatoria.';

  return { valido: Object.keys(errores).length === 0, errores };
}

export interface DatosContacto {
  nombre: string;
  mail: string;
  mensaje: string;
}

export function validarContacto(d: DatosContacto): ResultadoValidacion {
  const errores: Record<string, string> = {};
  if (!d.nombre.trim()) errores.nombre = 'Tu nombre es obligatorio.';
  if (!d.mail.trim()) errores.mail = 'El correo es obligatorio.';
  else if (!esEmailValido(d.mail)) errores.mail = 'El correo no tiene un formato válido.';
  if (!d.mensaje.trim()) errores.mensaje = 'El mensaje no puede estar vacío.';
  else if (d.mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  else if (d.mensaje.length > 500) errores.mensaje = 'El mensaje no puede superar los 500 caracteres.';
  return { valido: Object.keys(errores).length === 0, errores };
}

export function formatearCLP(valor: number): string {
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}
