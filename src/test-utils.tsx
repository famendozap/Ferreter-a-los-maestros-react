import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, type RenderOptions } from '@testing-library/react';
import { CarritoProvider } from './hooks/CarritoContexto';
import { SesionProvider } from './hooks/SesionContexto';

function Providers({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <SesionProvider>
        <CarritoProvider>{children}</CarritoProvider>
      </SesionProvider>
    </MemoryRouter>
  );
}

export function renderConProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
