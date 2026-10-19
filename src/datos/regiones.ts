export interface Region {
  nombre: string;
  comunas: string[];
}

export const REGIONES: Region[] = [
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte'] },
  { nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'] },
  { nombre: 'Atacama', comunas: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'] },
  {
    nombre: 'Coquimbo',
    comunas: [
      'La Serena',
      'Coquimbo',
      'Vicuña',
      'Andacollo',
      'Ovalle',
      'Illapel',
      'Los Vilos',
      'Salamanca',
    ],
  },
  {
    nombre: 'Valparaíso',
    comunas: [
      'Valparaíso',
      'Viña del Mar',
      'Quilpué',
      'Villa Alemana',
      'San Antonio',
      'Los Andes',
      'Quillota',
      'La Ligua',
    ],
  },
  {
    nombre: 'Metropolitana de Santiago',
    comunas: [
      'Santiago',
      'Providencia',
      'Las Condes',
      'Ñuñoa',
      'Maipú',
      'Puente Alto',
      'La Florida',
      'San Bernardo',
      'Peñalolén',
    ],
  },
  { nombre: 'O\'Higgins', comunas: ['Rancagua', 'San Fernando', 'Rengo', 'Santa Cruz'] },
  { nombre: 'Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Constitución'] },
  { nombre: 'Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos'] },
  { nombre: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'] },
  { nombre: 'La Araucanía', comunas: ['Temuco', 'Villarrica', 'Angol', 'Pucón'] },
  { nombre: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno'] },
  { nombre: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud'] },
  { nombre: 'Aysén', comunas: ['Coyhaique', 'Puerto Aysén', 'Chile Chico'] },
  { nombre: 'Magallanes y la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales'] },
];

export function comunasDeRegion(nombreRegion: string): string[] {
  return REGIONES.find((r) => r.nombre === nombreRegion)?.comunas ?? [];
}
