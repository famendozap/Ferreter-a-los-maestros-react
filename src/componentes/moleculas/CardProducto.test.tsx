import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardProducto from './CardProducto';
import { PRODUCTOS } from '../../datos/productos';

describe('<CardProducto />', () => {
  const producto = PRODUCTOS[0];

  it('muestra el nombre, precio y estado de stock del producto', () => {
    render(
      <MemoryRouter>
        <CardProducto producto={producto} />
      </MemoryRouter>,
    );

    expect(screen.getByText(producto.nombre)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalle/i })).toHaveAttribute(
      'href',
      `/catalogo/${producto.codigo}`,
    );
  });

  it('llama a onAgregar con el código del producto al hacer clic en Agregar', async () => {
    const onAgregar = vi.fn();
    const usuario = userEvent.setup();

    render(
      <MemoryRouter>
        <CardProducto producto={producto} onAgregar={onAgregar} />
      </MemoryRouter>,
    );

    await usuario.click(screen.getByRole('button', { name: /agregar/i }));
    expect(onAgregar).toHaveBeenCalledWith(producto.codigo);
  });

  it('deshabilita el botón Agregar cuando no hay stock', () => {
    const sinStock = { ...producto, stock: 0 };
    render(
      <MemoryRouter>
        <CardProducto producto={sinStock} onAgregar={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /agregar/i, disabled: true })).toBeDisabled();
  });
});
