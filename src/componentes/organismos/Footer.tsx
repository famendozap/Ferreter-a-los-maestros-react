import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-graphite text-white-50 mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row gy-3">
          <div className="col-md-4">
            <h5 className="text-white">Ferretería Los Maestros</h5>
            <p className="small mb-0">
              22 años abasteciendo a contratistas y maestros de La Serena y Coquimbo con materiales de
              construcción, herramientas y pinturas.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Enlaces</h6>
            <ul className="list-unstyled small">
              <li>
                <Link className="link-light text-decoration-none" to="/catalogo">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link className="link-light text-decoration-none" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link className="link-light text-decoration-none" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Contacto</h6>
            <p className="small mb-0">
              Av. Francisco de Aguirre 123, La Serena
              <br />
              +56 51 222 3344
              <br />
              contacto@ferreterialosmaestros.cl
            </p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="small text-center mb-0">
          © {new Date().getFullYear()} Ferretería Los Maestros — Proyecto académico DSY1104, Duoc UC.
        </p>
      </div>
    </footer>
  );
}
