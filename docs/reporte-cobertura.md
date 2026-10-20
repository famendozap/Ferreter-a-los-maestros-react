# Reporte de cobertura

## Resultado

Ejecución con Vitest y el proveedor V8 usando `npm run test:coverage`.

| Métrica | Resultado |
|---|---:|
| Archivos de prueba aprobados | 9 de 9 |
| Casos aprobados | 49 de 49 |
| Sentencias | 33,10 % |
| Líneas | 33,10 % |
| Funciones | 61,03 % |
| Ramas | 69,19 % |

El reporte HTML navegable se genera en `coverage/index.html` y el resumen legible por herramientas queda en `coverage/coverage-summary.json`.

## Interpretación y casos pendientes

La cobertura total incluye páginas y componentes que todavía no tienen pruebas directas, lo que reduce el porcentaje global. Los módulos de datos, validaciones, carrito, formularios y mantenedores sí cuentan con casos de prueba. Las cifras expresan ejecución de código, no la calidad o exhaustividad de las aserciones; no hay porcentaje mínimo de aprobación definido por la rúbrica.

Quedan fuera de este reporte las pruebas con API real, pagos, accesibilidad automatizada, pruebas end-to-end con navegador real y validación visual de distintos dispositivos. La persistencia en memoria tampoco se verifica como persistencia entre recargas, ya que no forma parte del alcance implementado.
