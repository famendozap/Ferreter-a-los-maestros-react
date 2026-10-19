import { createContext, useContext, type ReactNode } from 'react';
import { useCarrito } from './useCarrito';

type CarritoAPI = ReturnType<typeof useCarrito>;

const CarritoContext = createContext<CarritoAPI | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const carrito = useCarrito();
  return <CarritoContext.Provider value={carrito}>{children}</CarritoContext.Provider>;
}

export function useCarritoContexto(): CarritoAPI {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarritoContexto debe usarse dentro de <CarritoProvider>');
  return ctx;
}
