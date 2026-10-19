export interface Contenido {
  id: number;
  titulo: string;
  resumen: string;
  cuerpo: string;
  categoria: string;
  fecha: string;
}

export const CONTENIDOS: Contenido[] = [
  {
    id: 1,
    titulo: '5 consejos para elegir el cemento correcto',
    resumen:
      'No todos los cementos sirven para lo mismo: te explicamos las diferencias entre cemento gris, blanco y los morteros especiales.',
    cuerpo:
      'Elegir el cemento correcto depende del tipo de obra que estés realizando. El cemento gris Polpaico es ideal para estructuras y fundaciones por su resistencia, mientras que el cemento blanco Melón se usa más en terminaciones estéticas y revoques finos. Los morteros especiales, como el mortero cola para cerámica o el nivelador de piso, están formulados para tareas específicas y no deben reemplazarse por cemento común. Antes de comprar, pregunta en nuestra tienda por la ficha técnica de cada producto; nuestro equipo te puede orientar según los metros cuadrados y el tipo de terminación que buscas.',
    categoria: 'Construcción',
    fecha: '2026-03-10',
  },
  {
    id: 2,
    titulo: 'Mantención básica de herramientas manuales',
    resumen:
      'Una herramienta bien cuidada dura años. Aprende a limpiar, lubricar y guardar martillos, llaves y destornilladores.',
    cuerpo:
      'El óxido es el principal enemigo de las herramientas manuales. Después de cada uso, limpia la superficie metálica con un paño seco y aplica una fina capa de aceite lubricante en llaves, alicates y tijeras. Los mangos de madera (martillos, rastrillos) se benefician de una capa anual de aceite de linaza para evitar que se resequen y agrieten. Guarda siempre las herramientas en un lugar seco, idealmente en una caja o panel organizador, separando las que tienen filo de las que no para evitar accidentes.',
    categoria: 'Herramientas',
    fecha: '2026-04-02',
  },
  {
    id: 3,
    titulo: 'Diferencias entre pintura látex y esmalte',
    resumen:
      'Te explicamos cuándo usar cada tipo de pintura según la superficie, la humedad y el acabado que buscas.',
    cuerpo:
      'La pintura látex es a base de agua, de fácil aplicación y secado rápido; se usa principalmente en muros interiores y cielos. El esmalte, en cambio, es más resistente a la humedad y al roce, por lo que se recomienda para puertas, ventanas, rejas y superficies metálicas o de madera expuestas al exterior. Si tu proyecto incluye zonas húmedas como baños o cocinas, te recomendamos una línea antihumedad. En Ferretería Los Maestros contamos con asesoría de color y cálculo de rendimiento por metro cuadrado para que no compres de más ni de menos.',
    categoria: 'Pinturas',
    fecha: '2026-04-20',
  },
];

export function buscarContenidoPorId(id: number): Contenido | undefined {
  return CONTENIDOS.find((c) => c.id === id);
}
