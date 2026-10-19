import { Link } from 'react-router-dom';
import { PRODUCTOS } from '../../datos/productos';
import { USUARIOS } from '../../datos/usuarios';
import { stockEstado } from '../../componentes/atomos/StockPill';

export default function AdminDashboard() {
  const totalProductos = PRODUCTOS.length;
  const stockBajo = PRODUCTOS.filter((p) => stockEstado(p) !== 'ok').length;
  const totalUsuarios = USUARIOS.length;
  const usuariosActivos = USUARIOS.filter((u) => u.activo).length;

  const tarjetas = [
    { titulo: 'Productos en catálogo', valor: totalProductos, enlace: '/admin/productos' },
    { titulo: 'Con stock bajo o agotado', valor: stockBajo, enlace: '/admin/productos' },
    { titulo: 'Usuarios registrados', valor: totalUsuarios, enlace: '/admin/usuarios' },
    { titulo: 'Usuarios activos', valor: usuariosActivos, enlace: '/admin/usuarios' },
  ];

  return (
    <div className="container py-5">
      <h1 className="h2 mb-4">Panel de administración</h1>
      <div className="row g-3">
        {tarjetas.map((t) => (
          <div className="col-sm-6 col-lg-3" key={t.titulo}>
            <Link to={t.enlace} className="text-decoration-none">
              <div className="card valor-card h-100 text-center">
                <div className="card-body">
                  <p className="fs-2 fw-bold mb-0">{t.valor}</p>
                  <p className="text-muted small mb-0">{t.titulo}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
