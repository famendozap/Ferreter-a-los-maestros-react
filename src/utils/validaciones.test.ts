import { describe, it, expect } from 'vitest';
import {
  validarRUN,
  formatearRUN,
  esEmailValido,
  validarLogin,
  validarRegistro,
  validarContacto,
  formatearCLP,
} from './validaciones';


describe('validarRUN (algoritmo Módulo 11)', () => {
  it('acepta RUN válidos con distintos formatos', () => {
    expect(validarRUN('11.111.111-1')).toBe(true);
    expect(validarRUN('12.345.678-5')).toBe(true);
    expect(validarRUN('12345678-5')).toBe(true);
    expect(validarRUN('9.876.543-3')).toBe(true);
  });

  it('acepta RUN cuyo dígito verificador es K', () => {
    expect(validarRUN('1.000.005-K')).toBe(true);
  });

  it('rechaza RUN con dígito verificador incorrecto', () => {
    expect(validarRUN('12.345.678-9')).toBe(false);
    expect(validarRUN('11.111.111-2')).toBe(false);
  });

  it('rechaza entradas vacías, nulas o demasiado cortas', () => {
    expect(validarRUN('')).toBe(false);
    expect(validarRUN(undefined as unknown as string)).toBe(false);
    expect(validarRUN('1')).toBe(false);
  });
});

describe('formatearRUN', () => {
  it('agrega puntos de miles y el guión antes del dígito verificador', () => {
    expect(formatearRUN('123456785')).toBe('12.345.678-5');
    expect(formatearRUN('111111111')).toBe('11.111.111-1');
  });
});

describe('esEmailValido', () => {
  it('acepta correos con formato válido', () => {
    expect(esEmailValido('juan.perez@gmail.com')).toBe(true);
  });

  it('rechaza correos sin arroba o sin dominio', () => {
    expect(esEmailValido('juan.perez')).toBe(false);
    expect(esEmailValido('juan@')).toBe(false);
    expect(esEmailValido('')).toBe(false);
  });
});

describe('validarLogin', () => {
  it('es inválido si falta correo o contraseña', () => {
    const resultado = validarLogin('', '');
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.correo).toBeDefined();
    expect(resultado.errores.clave).toBeDefined();
  });

  it('es válido con correo y contraseña correctos', () => {
    const resultado = validarLogin('admin@ferreterialosmaestros.cl', 'admin123');
    expect(resultado.valido).toBe(true);
    expect(resultado.errores).toEqual({});
  });
});

describe('validarRegistro', () => {
  const base = {
    run: '12.345.678-5',
    nombre: 'Juan',
    apellidos: 'Pérez',
    mail: 'juan@test.cl',
    clave: '123456',
    confirmarClave: '123456',
    region: 'Coquimbo',
    comuna: 'La Serena',
    direccion: 'Calle Falsa 123',
  };

  it('es válido con todos los datos correctos', () => {
    expect(validarRegistro(base).valido).toBe(true);
  });

  it('marca error cuando el RUN es inválido', () => {
    const resultado = validarRegistro({ ...base, run: '1.111.111-9' });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.run).toBeDefined();
  });

  it('marca error cuando las contraseñas no coinciden', () => {
    const resultado = validarRegistro({ ...base, confirmarClave: 'otraClave' });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.confirmarClave).toBeDefined();
  });
});

describe('validarContacto', () => {
  it('exige un mensaje de al menos 10 caracteres', () => {
    const resultado = validarContacto({ nombre: 'Ana', mail: 'ana@test.cl', mensaje: 'hola' });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.mensaje).toBeDefined();
  });

  it('es válido con un mensaje suficientemente largo', () => {
    const resultado = validarContacto({
      nombre: 'Ana',
      mail: 'ana@test.cl',
      mensaje: 'Quisiera cotizar 10 sacos de cemento para esta semana.',
    });
    expect(resultado.valido).toBe(true);
  });
});

describe('formatearCLP', () => {
  it('formatea un número como pesos chilenos', () => {
    expect(formatearCLP(5990)).toContain('5.990');
  });
});
