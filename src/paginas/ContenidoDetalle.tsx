import { Link, useParams } from 'react-router-dom';
import { buscarContenidoPorId } from '../datos/contenidos';

export default function ContenidoDetalle() {
  const { id } = useParams<{ id: string }>();
  const contenido = buscarContenidoPorId(Number(id));

  if (!contenido) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">No se encontró el contenido solicitado.</p>
        <Link to="/contenidos">Volver a Consejos y novedades</Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '760px' }}>
      <Link to="/contenidos" className="small d-inline-block mb-3">
        ← Volver
      </Link>
      <span className="badge text-bg-light mb-2">{contenido.categoria}</span>
      <h1 className="h2">{contenido.titulo}</h1>
      <p className="text-muted small">
        {new Date(contenido.fecha).toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="lead">{contenido.resumen}</p>
      <p>{contenido.cuerpo}</p>
    </div>
  );
}
