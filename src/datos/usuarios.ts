export type TipoUsuario = 'Administrador' | 'Contratista' | 'Cliente';

export interface Usuario {
  run: string;
  nombre: string;
  apellidos: string;
  mail: string;
  clave: string;
  tipoUsuario: TipoUsuario;
  region: string;
  comuna: string;
  direccion: string;
  activo: boolean;
}

export const USUARIOS: Usuario[] = [
  {
    run: '11.111.111-1',
    nombre: 'Admin',
    apellidos: 'Sistema',
    mail: 'admin@ferreterialosmaestros.cl',
    clave: 'admin123',
    tipoUsuario: 'Administrador',
    region: 'Coquimbo',
    comuna: 'La Serena',
    direccion: 'Av. Francisco de Aguirre 123',
    activo: true,
  },
  {
    run: '12.345.678-5',
    nombre: 'Juan',
    apellidos: 'Pérez Soto',
    mail: 'juan.perez@gmail.com',
    clave: 'cliente123',
    tipoUsuario: 'Cliente',
    region: 'Coquimbo',
    comuna: 'Coquimbo',
    direccion: 'Los Aromos 456',
    activo: true,
  },
  {
    run: '9.876.543-3',
    nombre: 'María',
    apellidos: 'González López',
    mail: 'maria.gonzalez@gmail.com',
    clave: 'maria2024',
    tipoUsuario: 'Contratista',
    region: 'Coquimbo',
    comuna: 'La Serena',
    direccion: 'El Olivo 789',
    activo: true,
  },
  {
    run: '15.222.333-1',
    nombre: 'Pedro',
    apellidos: 'Rojas Díaz',
    mail: 'pedro.rojas@hotmail.com',
    clave: 'pedro2024',
    tipoUsuario: 'Cliente',
    region: 'Valparaíso',
    comuna: 'Valparaíso',
    direccion: 'Condell 321',
    activo: false,
  },
];

export function buscarUsuarioPorMail(mail: string): Usuario | undefined {
  return USUARIOS.find((u) => u.mail.toLowerCase() === mail.toLowerCase());
}

export function buscarUsuarioPorRun(run: string): Usuario | undefined {
  return USUARIOS.find((u) => u.run === run);
}

export function listarUsuarios(): Usuario[] {
  return USUARIOS.map((usuario) => ({ ...usuario }));
}

export function filtrarUsuarios(busqueda: string): Usuario[] {
  const consulta = busqueda.trim().toLocaleLowerCase();
  if (!consulta) return listarUsuarios();

  return USUARIOS.filter(
    (usuario) =>
      `${usuario.nombre} ${usuario.apellidos}`.toLocaleLowerCase().includes(consulta) ||
      usuario.mail.toLocaleLowerCase().includes(consulta) ||
      usuario.run.toLocaleLowerCase().includes(consulta),
  ).map((usuario) => ({ ...usuario }));
}

export function crearUsuario(usuario: Usuario): void {
  if (buscarUsuarioPorRun(usuario.run)) {
    throw new Error(`Ya existe un usuario con el RUN ${usuario.run}.`);
  }
  if (buscarUsuarioPorMail(usuario.mail)) {
    throw new Error(`Ya existe un usuario con el correo ${usuario.mail}.`);
  }
  USUARIOS.push({ ...usuario });
}

export function actualizarUsuario(run: string, usuario: Usuario): void {
  const indice = USUARIOS.findIndex((actual) => actual.run === run);
  if (indice < 0) throw new Error(`No se encontró el usuario ${run}.`);

  const correoDuplicado = USUARIOS.some(
    (actual, posicion) => posicion !== indice && actual.mail.toLowerCase() === usuario.mail.toLowerCase(),
  );
  if (correoDuplicado) {
    throw new Error(`Ya existe un usuario con el correo ${usuario.mail}.`);
  }

  USUARIOS[indice] = { ...usuario, run };
}

export function eliminarUsuario(run: string): void {
  const indice = USUARIOS.findIndex((usuario) => usuario.run === run);
  if (indice < 0) throw new Error(`No se encontró el usuario ${run}.`);
  USUARIOS.splice(indice, 1);
}
