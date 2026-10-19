const equipo = [
  { nombre: 'Equipo de Ventas', rol: 'Atención en tienda y asesoría técnica' },
  { nombre: 'Equipo de Bodega', rol: 'Control de stock y despacho de pedidos' },
  { nombre: 'Equipo de Administración', rol: 'Cuentas corrientes y contratistas' },
];

export default function Nosotros() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h1 className="h2">Sobre Ferretería Los Maestros</h1>
      </div>

      <p className="text-muted">
        Ferretería Los Maestros nació hace 22 años como un negocio familiar en La Serena, Región de
        Coquimbo. Desde entonces hemos crecido junto a nuestros clientes: maestros, contratistas y
        vecinos que confían en nosotros para sus proyectos de construcción, remodelación y mantención.
      </p>
      <p className="text-muted">
        Nuestro catálogo abarca materiales de construcción, pinturas, herramientas manuales y eléctricas,
        y artículos de jardín, con stock real y precios actualizados. Este sitio digitaliza nuestra
        atención para que contratistas y clientes puedan consultar stock, armar pedidos y gestionar su
        cuenta corriente de forma más rápida.
      </p>

      <div className="row g-3 mt-4">
        {equipo.map((persona) => (
          <div className="col-md-4" key={persona.nombre}>
            <div className="card h-100 valor-card text-center">
              <div className="card-body">
                <i className="bi bi-people-fill fs-1 text-rust" aria-hidden="true" />
                <h5 className="card-title mt-2">{persona.nombre}</h5>
                <p className="card-text text-muted small">{persona.rol}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
