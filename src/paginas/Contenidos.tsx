import { Link } from 'react-router-dom';
import { CONTENIDOS } from '../datos/contenidos';

export default function Contenidos() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h1 className="h2">Consejos y novedades</h1>
      </div>

      <div className="row g-3">
        {CONTENIDOS.map((c) => (
          <div className="col-md-6 col-lg-4" key={c.id}>
            <div className="card h-100 blog-card">
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-light align-self-start mb-2">{c.categoria}</span>
                <h5 className="card-title">{c.titulo}</h5>
                <p className="card-text text-muted">{c.resumen}</p>
                <Link to={`/contenidos/${c.id}`} className="mt-auto small">
                  Leer más →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
