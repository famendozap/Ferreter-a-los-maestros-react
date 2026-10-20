# ERS actualizado — Ferretería Los Maestros

## Propósito y alcance

Este documento describe los requisitos funcionales que se pueden comprobar en la aplicación React actual. El proyecto es un frontend académico con persistencia simulada en memoria para catálogo, usuarios y contenidos; carrito y sesión utilizan `localStorage`. No incluye API ni base de datos.

## Roles

- Visitante: consulta páginas públicas, catálogo y detalle de productos; puede registrarse o iniciar sesión.
- Cliente o contratista: consulta el catálogo y administra su carrito.
- Administrador: accede al panel protegido para revisar y mantener productos y usuarios.

## Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-01 | La aplicación ofrece inicio, información institucional, contenidos, contacto, inicio de sesión, registro, catálogo, detalle y carrito. | Cada ruta pública muestra su vista y la navegación del sitio permite llegar a ella. |
| RF-02 | El catálogo permite buscar productos por nombre o código, filtrar por categoría y ordenar por nombre o precio. | La lista y su contador corresponden a los criterios seleccionados; un resultado vacío se informa. |
| RF-03 | El detalle de producto se identifica mediante el parámetro de ruta y permite agregar al carrito cuando hay stock. | La ruta muestra el producto correspondiente; el carrito refleja las cantidades agregadas. |
| RF-04 | El carrito permite agregar, quitar y cambiar cantidades, respetando un mínimo de una unidad y persistiendo en el navegador. | Las cantidades y el total se actualizan y permanecen tras recargar la página. |
| RF-05 | El registro valida campos, formato de correo y RUN, coincidencia de contraseña y duplicidad de RUN/correo. | Cada error presenta un mensaje y los datos válidos crean una sesión de cliente. |
| RF-06 | El inicio de sesión valida credenciales y mantiene la sesión en `localStorage`. | Las credenciales válidas inician sesión; el acceso administrativo requiere un usuario con rol Administrador. |
| RF-07 | El mantenedor permite crear, consultar, editar y eliminar productos. | El listado muestra los cambios, rechaza códigos duplicados y permite buscar por nombre, código o marca. |
| RF-08 | El mantenedor permite crear, consultar, editar, activar/desactivar y eliminar usuarios. | El listado muestra los cambios, rechaza RUN o correo duplicados y permite buscar por nombre, correo o RUN. |
| RF-09 | Las rutas administrativas están protegidas. | Una sesión sin permisos administrativos no puede acceder a las vistas del panel. |
| RF-10 | La interfaz se adapta a pantallas pequeñas, medianas y grandes mediante Bootstrap. | Navegación, formularios, tarjetas y tablas mantienen acceso a sus controles en distintos anchos. |

## Requisitos no funcionales y restricciones

- La interfaz se implementa en React, TypeScript y Vite, con navegación mediante React Router.
- Los componentes se organizan mediante Atomic Design y reciben propiedades tipadas.
- Los formularios mantienen el estado de sus campos en React y presentan validaciones específicas.
- Bootstrap aporta la grilla, formularios, botones, tablas adaptables y utilidades de presentación.
- Vitest, jsdom y React Testing Library permiten ejecutar pruebas automatizadas con `npm test`.
- Los datos de productos, usuarios y contenidos se reinician al recargar la aplicación. Este comportamiento es una restricción explícita de la simulación sin backend.

## Organización y patrón

Atomic Design organiza la interfaz y no se considera el patrón de diseño solicitado por separado:

- Átomos: controles pequeños como botones, entradas e indicadores de stock.
- Moléculas: campos de formulario, selectores y tarjetas de producto.
- Organismos: navegación, formularios, grillas y tablas de administración.
- Páginas: composición de organismos y moléculas por ruta.

El patrón Repository se aplica a través de `src/datos/productos.ts` y `src/datos/usuarios.ts`. Esos módulos proporcionan operaciones de lectura, búsqueda, creación, actualización, eliminación y filtrado sobre las fuentes de datos simuladas. Las páginas y componentes solicitan cambios a esa interfaz, sin editar directamente los arreglos. Los proveedores de Context de sesión y carrito comparten estado transversal y son complementarios a ese patrón.

## Límites conocidos

- No existe persistencia en servidor; los mantenedores y el registro guardan datos solo durante la sesión activa de la página.
- El flujo de compra no realiza pagos ni crea órdenes.
- La configuración responsiva está implementada con Bootstrap; la revisión automatizada no mide visualmente cada tamaño de dispositivo.
- La aplicación no tiene integración contra una API ni pruebas end-to-end de navegador.
