import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  actualizarProducto,
  buscarPorCodigo,
  crearProducto,
  obtenerCategorias,
  type Producto,
} from '../../datos/productos';
import CampoFormulario from '../../componentes/moleculas/CampoFormulario';
import Boton from '../../componentes/atomos/Boton';

const PRODUCTO_VACIO: Producto = {
  codigo: '',
  categoria: '',
  subcategoria: '',
  nombre: '',
  marca: '',
  unidad: 'Unidad',
  pCompra: 0,
  pVenta: 0,
  stock: 0,
  stockMin: 0,
};

export default function AdminProductoEditar() {
  const { codigo } = useParams<{ codigo: string }>();
  const esNuevo = !codigo || codigo === 'nuevo';
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>(() =>
    esNuevo ? PRODUCTO_VACIO : (buscarPorCodigo(codigo!) ?? PRODUCTO_VACIO),
  );
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState('');

  function actualizar<K extends keyof Producto>(campo: K, valor: Producto[K]) {
    setProducto((p) => ({ ...p, [campo]: valor }));
  }

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      if (esNuevo) crearProducto(producto);
      else actualizarProducto(codigo!, producto);
      setGuardado(true);
      setTimeout(() => navigate('/admin/productos'), 900);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No fue posible guardar el producto.');
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: '620px' }}>
      <h1 className="h2 mb-4">{esNuevo ? 'Nuevo producto' : 'Editar producto'}</h1>

      {guardado && <div className="alert alert-success py-2">Producto guardado correctamente.</div>}
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Código"
              id="codigo"
              value={producto.codigo}
              disabled={!esNuevo}
              onChange={(e) => actualizar('codigo', e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Marca"
              id="marca"
              value={producto.marca}
              onChange={(e) => actualizar('marca', e.target.value)}
              required
            />
          </div>
        </div>

        <CampoFormulario
          etiqueta="Nombre del producto"
          id="nombre"
          value={producto.nombre}
          onChange={(e) => actualizar('nombre', e.target.value)}
          required
        />

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="categoria">
              Categoría
            </label>
            <select
              id="categoria"
              className="form-select"
              value={producto.categoria}
              onChange={(e) => actualizar('categoria', e.target.value)}
            >
              <option value="">Selecciona...</option>
              {obtenerCategorias().map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Subcategoría"
              id="subcategoria"
              value={producto.subcategoria}
              onChange={(e) => actualizar('subcategoria', e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <CampoFormulario
              etiqueta="Precio venta (CLP)"
              id="pVenta"
              type="number"
              min={0}
              value={producto.pVenta}
              onChange={(e) => actualizar('pVenta', Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <CampoFormulario
              etiqueta="Stock"
              id="stock"
              type="number"
              min={0}
              value={producto.stock}
              onChange={(e) => actualizar('stock', Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <CampoFormulario
              etiqueta="Stock mínimo"
              id="stockMin"
              type="number"
              min={0}
              value={producto.stockMin}
              onChange={(e) => actualizar('stockMin', Number(e.target.value))}
            />
          </div>
        </div>

        <Boton type="submit" className="w-100 mt-2">
          Guardar producto
        </Boton>
      </form>
    </div>
  );
}
