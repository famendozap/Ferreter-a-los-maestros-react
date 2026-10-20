# Proceso de pruebas

## Entorno

- Vitest ejecuta los casos y genera aserciones, espías y mocks.
- jsdom proporciona el entorno de navegador para pruebas de componentes.
- React Testing Library renderiza componentes y permite verificar comportamiento visible e interacciones.
- `src/setupTests.ts` carga los matchers de `jest-dom` y limpia el DOM tras cada caso.
- `src/test-utils.tsx` ofrece `renderConProviders()` para vistas que requieren router o contextos.

## Comandos reproducibles

Desde la raíz del proyecto:

```bash
npm install
npm test
npm run test:coverage
```

`npm run test:coverage` usa el proveedor V8 de Vitest. Presenta un resumen en consola y genera el reporte HTML en `coverage/index.html` junto con `coverage/coverage-summary.json`.

## Casos cubiertos

| Archivo | Preparación y acción | Comprobación |
|---|---|---|
| `src/utils/validaciones.test.ts` | Ejecuta entradas válidas e inválidas de RUN, correo, login, registro, contacto y formato CLP. | Verifica los valores y errores esperados para cada entrada. |
| `src/datos/productos.test.ts` | Crea productos temporales y ejecuta consulta, actualización, eliminación, duplicados y búsqueda. | Comprueba el estado resultante y los errores para datos inexistentes o duplicados. |
| `src/datos/usuarios.test.ts` | Crea usuarios temporales y ejecuta consulta, actualización, eliminación, duplicados y búsqueda. | Comprueba el estado resultante, la conservación del RUN y la unicidad del correo. |
| `src/componentes/organismos/TablaProductosAdmin.test.tsx` | Renderiza la tabla, busca y confirma una eliminación. | Verifica las filas visibles, el mensaje vacío y la eliminación confirmada. |
| `src/componentes/organismos/TablaUsuariosAdmin.test.tsx` | Renderiza la tabla, busca, activa/desactiva y confirma una eliminación. | Verifica el resultado del filtro, enlace de edición, estado y eliminación. |
| `src/hooks/useCarrito.test.ts` | Ejecuta operaciones del hook con datos simulados y almacenamiento local. | Verifica cantidades, eliminación y persistencia de `localStorage`. |
| `src/componentes/atomos/Boton.test.tsx` | Renderiza el botón y simula interacción. | Comprueba el contenido, el evento y el estado deshabilitado. |
| `src/componentes/moleculas/CardProducto.test.tsx` | Renderiza una tarjeta con producto y simula agregar al carrito. | Comprueba información visible, enlace, evento y condición de stock. |
| `src/componentes/organismos/FormularioContacto.test.tsx` | Envía formulario vacío y válido, y escribe un mensaje. | Comprueba errores, contador y confirmación de envío. |

## Mocks, espías y límites

Las pruebas de mantenedores usan un espía de `window.confirm` para verificar de manera determinista la confirmación de eliminación. Los datos temporales se quitan al finalizar cada caso para no afectar los datos iniciales. Las pruebas de lógica de negocio verifican los repositorios simulados y no representan persistencia de backend.

La cobertura de líneas o ramas es una métrica de ejecución y no garantiza la calidad de las aserciones. No se incluyen integración con API, accesibilidad automatizada ni pruebas end-to-end con navegador real. La aplicación tampoco persiste los cambios de administración tras recargar.
