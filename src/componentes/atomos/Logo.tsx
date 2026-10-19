import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
      <i className="bi bi-tools" aria-hidden="true" />
      <span>Ferretería Los Maestros</span>
    </Link>
  );
}
