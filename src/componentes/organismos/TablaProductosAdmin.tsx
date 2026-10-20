import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminarProducto, filtrarProductos, listarProductos, type Producto } from '../../datos/productos';
import { formatearCLP } from '../../utils/validaciones';
import StockPill from '../atomos/StockPill';
import Boton from '../atomos/Boton';

export default function TablaProductosAdmin() {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState<Producto[]>(listarProductos);
  const [error, setError] = useState('');

  const filtrados = useMemo(
    () => filtrarProductos(busqueda).filter((producto) => productos.some((actual) => actual.codigo === producto.codigo)),
    [busqueda, productos],
  );

  function borrarProducto(codigo: string) {
    if (!window.confirm(`¿Eliminar el producto ${codigo}?`)) return;
    try {
      eliminarProducto(codigo);
      setProductos(listarProductos());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No fue posible eliminar el producto.');
    }
  }

  return (
    <div>
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 gap-2">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar producto por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Link to="/admin/productos/nuevo" className="text-nowrap">
          <Boton>+ Nuevo producto</Boton>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio venta</th>
              <th>Stock</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.codigo}>
                <td className="font-monospace">{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearCLP(p.pVenta)}</td>
                <td>{p.stock}</td>
                <td>
                  <StockPill producto={p} />
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/admin/productos/${p.codigo}`}>
                      <Boton variante="outline" tamano="sm">
                        Editar
                      </Boton>
                    </Link>
                    <Boton
                      variante="danger"
                      tamano="sm"
                      aria-label={`Eliminar producto ${p.codigo}`}
                      onClick={() => borrarProducto(p.codigo)}
                    >
                      Eliminar
                    </Boton>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center text-muted">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
