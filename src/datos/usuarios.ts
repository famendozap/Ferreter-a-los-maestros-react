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
