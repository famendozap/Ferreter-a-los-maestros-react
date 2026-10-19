import FormularioContacto from '../componentes/organismos/FormularioContacto';

export default function Contacto() {
  return (
    <div className="container py-5">
      <div className="section-header mb-4 text-center">
        <h1 className="h2">Contáctanos</h1>
        <p className="text-muted">¿Tienes dudas sobre stock, cotizaciones o despacho? Escríbenos.</p>
      </div>
      <FormularioContacto />
    </div>
  );
}
