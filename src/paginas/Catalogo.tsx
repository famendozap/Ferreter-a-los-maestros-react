import GrillaProductos from '../componentes/organismos/GrillaProductos';

export default function Catalogo() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h1 className="h2">Catálogo de productos</h1>
        <p className="text-muted">85 referencias con stock y precio actualizado.</p>
      </div>
      <GrillaProductos />
    </div>
  );
}
