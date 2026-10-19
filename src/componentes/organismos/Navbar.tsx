import { Link, NavLink } from 'react-router-dom';
import Logo from '../atomos/Logo';
import { useCarritoContexto } from '../../hooks/CarritoContexto';
import { useSesion } from '../../hooks/SesionContexto';

const enlace = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`;

export default function Navbar() {
  const { cantidadTotal } = useCarritoContexto();
  const { usuario, cerrarSesion } = useSesion();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-graphite sticky-top">
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={enlace} end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/catalogo" className={enlace}>
                Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contenidos" className={enlace}>
                Consejos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className={enlace}>
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className={enlace}>
                Contacto
              </NavLink>
            </li>
            {usuario?.tipoUsuario === 'Administrador' && (
              <li className="nav-item">
                <NavLink to="/admin" className={enlace}>
                  Administración
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav align-items-lg-center gap-2">
            <li className="nav-item">
              <Link to="/carrito" className="btn btn-outline-light btn-sm position-relative">
                <i className="bi bi-cart3 me-1" aria-hidden="true" />
                Mi selección
                {cantidadTotal > 0 && (
                  <span className="badge rounded-pill text-bg-warning ms-1">{cantidadTotal}</span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              {usuario ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-white-50 small">Hola, {usuario.nombre}</span>
                  <button className="btn btn-sm btn-outline-light" onClick={cerrarSesion}>
                    Salir
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-sm btn-lm-primary">
                  Ingresar
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
