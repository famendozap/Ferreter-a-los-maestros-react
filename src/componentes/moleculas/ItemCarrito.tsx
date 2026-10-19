import type { Producto } from '../../datos/productos';
import { formatearCLP } from '../../utils/validaciones';
import Boton from '../atomos/Boton';

interface Props {
  producto: Producto;
  cantidad: number;
  onCantidadChange: (codigo: string, cantidad: number) => void;
  onQuitar: (codigo: string) => void;
}

export default function ItemCarrito({ producto, cantidad, onCantidadChange, onQuitar }: Props) {
  return (
    <tr>
      <td>
        <div className="fw-semibold">{producto.nombre}</div>
        <div className="text-muted small">{producto.codigo}</div>
      </td>
      <td>{formatearCLP(producto.pVenta)}</td>
      <td style={{ width: '120px' }}>
        <input
          type="number"
          min={1}
          max={producto.stock}
          className="form-control form-control-sm"
          value={cantidad}
          onChange={(e) => onCantidadChange(producto.codigo, Number(e.target.value))}
        />
      </td>
      <td className="fw-bold">{formatearCLP(producto.pVenta * cantidad)}</td>
      <td>
        <Boton variante="outline" tamano="sm" onClick={() => onQuitar(producto.codigo)}>
          Quitar
        </Boton>
      </td>
    </tr>
  );
}
