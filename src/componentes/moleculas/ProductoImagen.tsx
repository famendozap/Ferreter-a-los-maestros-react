import { useMemo, useState } from 'react';
import type { Producto } from '../../datos/productos';

interface Props {
  producto: Producto;
  compacta?: boolean;
}

export default function ProductoImagen({ producto, compacta = false }: Props) {
  const [fallo, setFallo] = useState(false);
  const consulta = useMemo(() => {
    const especificaciones = `${producto.nombre} ${producto.marca} producto Chile fotografía`;
    return especificaciones.trim();
  }, [producto.nombre, producto.marca]);
  const busquedaGoogle = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(consulta)}`;
  const imagenBing = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(consulta)}&w=600&h=600&c=7&rs=1&p=0`;

  return (
    <div className={`producto-imagen ${compacta ? 'producto-imagen--compacta' : ''}`}>
      {!fallo ? (
        <img
          src={imagenBing}
          alt={`Fotografía buscada de ${producto.nombre}, marca ${producto.marca}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFallo(true)}
        />
      ) : (
        <a
          className="producto-imagen__buscar"
          href={busquedaGoogle}
          target="_blank"
          rel="noreferrer"
          title={`Buscar fotografías reales de ${producto.nombre}`}
        >
          <span aria-hidden="true">⌕</span>
          <strong>Ver fotos reales</strong>
          <small>{producto.nombre}</small>
        </a>
      )}
    </div>
  );
}
