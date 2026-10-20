import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  buscarUsuarioPorRun,
  crearUsuario,
  eliminarUsuario,
  type Usuario,
} from '../../datos/usuarios';
import TablaUsuariosAdmin from './TablaUsuariosAdmin';

const RUN_PRUEBA = '99.999.999-8';

const usuarioPrueba: Usuario = {
  run: RUN_PRUEBA,
  nombre: 'Usuario',
  apellidos: 'Para Filtrar',
  mail: 'usuario.tabla@example.com',
  clave: 'clave-prueba',
  tipoUsuario: 'Cliente',
  region: 'Coquimbo',
  comuna: 'La Serena',
  direccion: 'Dirección de prueba',
  activo: true,
};

function renderTabla() {
  return render(
    <MemoryRouter>
      <TablaUsuariosAdmin />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  if (buscarUsuarioPorRun(RUN_PRUEBA)) eliminarUsuario(RUN_PRUEBA);
});

describe('<TablaUsuariosAdmin />', () => {
  it('filtra las filas por nombre, correo o RUN', () => {
    crearUsuario(usuarioPrueba);
    renderTabla();

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'usuario.tabla@' } });

    expect(screen.getByText('Usuario Para Filtrar')).toBeInTheDocument();
    expect(screen.queryByText('Juan Pérez Soto')).not.toBeInTheDocument();
  });

  it('enlaza a la vista de edición del usuario', () => {
    crearUsuario(usuarioPrueba);
    renderTabla();

    const fila = screen.getByText('Usuario Para Filtrar').closest('tr');
    expect(fila).not.toBeNull();
    expect(within(fila!).getByRole('link', { name: 'Editar' })).toHaveAttribute(
      'href',
      `/admin/usuarios/${encodeURIComponent(RUN_PRUEBA)}`,
    );
  });

  it('actualiza el estado activo y elimina un usuario desde la tabla', () => {
    crearUsuario(usuarioPrueba);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderTabla();
    const fila = screen.getByText('Usuario Para Filtrar').closest('tr');
    expect(fila).not.toBeNull();

    fireEvent.click(within(fila!).getByRole('button', { name: 'Desactivar' }));
    expect(within(fila!).getByText('Inactivo')).toBeInTheDocument();

    fireEvent.click(within(fila!).getByRole('button', { name: `Eliminar usuario ${RUN_PRUEBA}` }));

    expect(screen.queryByText('Usuario Para Filtrar')).not.toBeInTheDocument();
    expect(buscarUsuarioPorRun(RUN_PRUEBA)).toBeUndefined();
  });
});
