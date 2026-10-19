import type { Producto } from '../../datos/productos';

export type EstadoStock = 'ok' | 'low' | 'out';

export function stockEstado(producto: Pick<Producto, 'stock' | 'stockMin'>): EstadoStock {
  if (producto.stock <= 0) return 'out';
  if (producto.stock <= producto.stockMin) return 'low';
  return 'ok';
}

const etiquetas: Record<EstadoStock, string> = {
  ok: 'Stock disponible',
  low: 'Stock bajo',
  out: 'Sin stock',
};

const clases: Record<EstadoStock, string> = {
  ok: 'stock-pill stock-pill-ok',
  low: 'stock-pill stock-pill-low',
  out: 'stock-pill stock-pill-out',
};

export default function StockPill({ producto }: { producto: Pick<Producto, 'stock' | 'stockMin'> }) {
  const estado = stockEstado(producto);
  return <span className={clases[estado]}>{etiquetas[estado]}</span>;
}
