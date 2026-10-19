import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSesion } from '../../hooks/SesionContexto';

export default function RutaProtegida({ children }: { children: ReactNode }) {
  const { usuario } = useSesion();

  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.tipoUsuario !== 'Administrador') {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">No tienes permisos para ver esta sección.</p>
      </div>
    );
  }
  return <>{children}</>;
}
