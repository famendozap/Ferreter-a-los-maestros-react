import { afterEach, describe, expect, it } from 'vitest';
import {
  actualizarUsuario,
  buscarUsuarioPorRun,
  crearUsuario,
  eliminarUsuario,
  filtrarUsuarios,
  type Usuario,
} from './usuarios';

const RUN_PRUEBA = '99.999.999-9';

function usuarioPrueba(cambios: Partial<Usuario> = {}): Usuario {
  return {
    run: RUN_PRUEBA,
    nombre: 'Usuario',
    apellidos: 'De Prueba',
    mail: 'usuario.prueba@example.com',
    clave: 'clave-prueba',
    tipoUsuario: 'Cliente',
    region: 'Coquimbo',
    comuna: 'La Serena',
    direccion: 'Dirección de prueba',
    activo: true,
    ...cambios,
  };
}

afterEach(() => {
  if (buscarUsuarioPorRun(RUN_PRUEBA)) eliminarUsuario(RUN_PRUEBA);
});

describe('módulo de usuarios', () => {
  it('crea un usuario y permite consultarlo por RUN', () => {
    crearUsuario(usuarioPrueba());
    expect(buscarUsuarioPorRun(RUN_PRUEBA)?.mail).toBe('usuario.prueba@example.com');
  });

  it('rechaza crear un usuario con RUN existente', () => {
    crearUsuario(usuarioPrueba());
    expect(() => crearUsuario(usuarioPrueba())).toThrow('Ya existe un usuario con el RUN');
  });

  it('rechaza crear un usuario con correo existente', () => {
    crearUsuario(usuarioPrueba());
    expect(() => crearUsuario(usuarioPrueba({ run: '88.888.888-8' }))).toThrow('Ya existe un usuario con el correo');
  });

  it('actualiza un usuario existente sin cambiar su RUN', () => {
    crearUsuario(usuarioPrueba());
    actualizarUsuario(RUN_PRUEBA, usuarioPrueba({ run: '88.888.888-8', nombre: 'Nombre actualizado' }));
    expect(buscarUsuarioPorRun(RUN_PRUEBA)).toMatchObject({
      run: RUN_PRUEBA,
      nombre: 'Nombre actualizado',
    });
  });

  it('rechaza actualizar un usuario inexistente', () => {
    expect(() => actualizarUsuario(RUN_PRUEBA, usuarioPrueba())).toThrow('No se encontró el usuario');
  });

  it('elimina un usuario existente', () => {
    crearUsuario(usuarioPrueba());
    eliminarUsuario(RUN_PRUEBA);
    expect(buscarUsuarioPorRun(RUN_PRUEBA)).toBeUndefined();
  });

  it('filtra usuarios por nombre, correo y RUN sin distinguir mayúsculas', () => {
    crearUsuario(usuarioPrueba());
    expect(filtrarUsuarios('USUARIO DE PRUEBA').some((usuario) => usuario.run === RUN_PRUEBA)).toBe(true);
    expect(filtrarUsuarios('USUARIO.PRUEBA@EXAMPLE.COM').some((usuario) => usuario.run === RUN_PRUEBA)).toBe(true);
    expect(filtrarUsuarios(RUN_PRUEBA.toLowerCase()).some((usuario) => usuario.run === RUN_PRUEBA)).toBe(true);
  });
});
