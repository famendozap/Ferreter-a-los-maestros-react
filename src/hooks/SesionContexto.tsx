import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Usuario } from '../datos/usuarios';

const CLAVE_LOCALSTORAGE = 'lm_sesion';

interface SesionAPI {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

const SesionContext = createContext<SesionAPI | null>(null);

function leerSesionInicial(): Usuario | null {
  try {
    const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE);
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  } catch {
    return null;
  }
}

// Comparte la sesión entre componentes y la conserva en localStorage al navegar o recargar.
export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(leerSesionInicial);

  const iniciarSesion = (u: Usuario) => {
    setUsuario(u);
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(u));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem(CLAVE_LOCALSTORAGE);
  };

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion(): SesionAPI {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
