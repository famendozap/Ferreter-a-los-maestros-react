import { Link } from 'react-router-dom';
import type { Producto } from '../../datos/productos';
import { formatearCLP } from '../../utils/validaciones';
import StockPill from '../atomos/StockPill';
import Boton from '../atomos/Boton';
import ProductoImagen from './ProductoImagen';

interface Props {
  producto: Producto;
  onAgregar?: (codigo: string) => void;
}

export default function CardProducto({ producto, onAgregar }: Props) {
  return (
    <div className="card h-100 ficha">
      <ProductoImagen producto={producto} compacta />
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-light align-self-start mb-2">{producto.categoria}</span>
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted mb-1">
          {producto.marca} · {producto.unidad}
        </p>
        <p className="card-text fw-bold fs-5 mb-2">{formatearCLP(producto.pVenta)}</p>
        <StockPill producto={producto} />

        <div className="mt-auto pt-3 d-flex gap-2">
          <Link to={`/catalogo/${producto.codigo}`} className="btn btn-outline-secondary btn-sm flex-fill">
            Ver detalle
          </Link>
          {onAgregar && (
            <Boton
              tamano="sm"
              className="flex-fill"
              disabled={producto.stock <= 0}
              onClick={() => onAgregar(producto.codigo)}
            >
              Agregar
            </Boton>
          )}
        </div>
      </div>
    </div>
  );
}
