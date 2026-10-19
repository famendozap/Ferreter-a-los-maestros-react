import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCarrito } from './useCarrito';
import { PRODUCTOS } from '../datos/productos';

describe('useCarrito', () => {
  const producto = PRODUCTOS[0];

  beforeEach(() => {
    localStorage.clear();
  });

  it('empieza vacío si no hay nada en localStorage', () => {
    const { result } = renderHook(() => useCarrito());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.cantidadTotal).toBe(0);
  });

  it('agrega un producto nuevo con la cantidad indicada', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregar(producto.codigo, 2);
    });

    expect(result.current.items).toEqual([{ codigo: producto.codigo, cantidad: 2 }]);
    expect(result.current.cantidadTotal).toBe(2);
    expect(result.current.totalCLP).toBe(producto.pVenta * 2);
  });

  it('suma la cantidad si el producto ya estaba en el carrito', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregar(producto.codigo, 1);
      result.current.agregar(producto.codigo, 3);
    });

    expect(result.current.items).toEqual([{ codigo: producto.codigo, cantidad: 4 }]);
  });

  it('actualiza la cantidad sin permitir valores menores a 1', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregar(producto.codigo, 1);
    });
    act(() => {
      result.current.actualizarCantidad(producto.codigo, 0);
    });

    expect(result.current.items[0].cantidad).toBe(1);
  });

  it('quita un producto del carrito', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregar(producto.codigo, 1);
    });
    act(() => {
      result.current.quitar(producto.codigo);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('persiste los cambios en localStorage', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregar(producto.codigo, 5);
    });

    const guardado = JSON.parse(localStorage.getItem('lm_carrito') ?? '[]');
    expect(guardado).toEqual([{ codigo: producto.codigo, cantidad: 5 }]);
  });
});
