import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTOS } from '../../datos/productos';
import { formatearCLP } from '../../utils/validaciones';
import StockPill from '../atomos/StockPill';
import Boton from '../atomos/Boton';

export default function TablaProductosAdmin() {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = useMemo(
    () =>
      PRODUCTOS.filter(
        (p) =>
          p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.codigo.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
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
                  <Link to={`/admin/productos/${p.codigo}`}>
                    <Boton variante="outline" tamano="sm">
                      Editar
                    </Boton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
