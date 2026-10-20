# Ferretería Los Maestros — Frontend React

Migración a React del sitio estático de la Evaluación Parcial 1 (DSY1104 — Desarrollo FullStack II),
usando el flujo visto en las guías de clase: **Vite + React + TypeScript**, **React Router** para la
navegación entre páginas, y **Atomic Design** (átomos / moléculas / organismos / páginas) para
organizar los componentes.

## Cómo correrlo

Necesitas tener instalado [Node.js](https://nodejs.org/) (18 o superior). Luego, desde esta carpeta:

```bash
npm install
npm run dev
```

Esto abre el proyecto en `http://localhost:5173`.

## Estructura (Atomic Design)

```
src/
  componentes/
    atomos/        Boton, Input, StockPill, Logo
    moleculas/      CardProducto, CampoFormulario, SelectorRegionComuna, ItemCarrito
    organismos/     Navbar, Footer, FormularioLogin, FormularioRegistro, FormularioContacto,
                     GrillaProductos, TablaProductosAdmin, TablaUsuariosAdmin, RutaProtegida
  paginas/          Inicio, Nosotros, Contenidos, ContenidoDetalle, Contacto, Login, Registro,
                     Catalogo, ProductoDetalle, Carrito
  paginas/admin/    AdminDashboard, AdminProductos, AdminProductoEditar, AdminUsuarios, AdminUsuarioForm
  datos/            productos.ts (85 productos reales del catálogo), usuarios.ts, regiones.ts, contenidos.ts
  utils/            validaciones.ts (incluye el validador de RUN chileno, Módulo 11)
  hooks/            useCarrito.ts + CarritoContexto.tsx (carrito persistido en localStorage),
                     SesionContexto.tsx (sesión simulada en localStorage, sin backend)
```

## Pruebas unitarias

El proyecto incluye pruebas automatizadas con **Vitest** + **React Testing Library**. Es el equivalente
moderno de Jasmine/Karma (o Jest) para un proyecto armado con Vite: misma idea (describe/it/expect,
jsdom simulando el navegador, mocks con `vi.fn()`), pero integrado de forma nativa con Vite en vez de
necesitar un bundler/config aparte como pedía Karma para Angular.

```bash
npm install
npm test
npm run test:watch
npm run test:coverage
```

Las pruebas están junto al archivo que prueban (`*.test.ts` / `*.test.tsx`) y cubren los distintos tipos
de prueba vistos en clase:

| Tipo de prueba | Archivo | Qué verifica |
|---|---|---|
| Pruebas de lógica de negocio | `src/utils/validaciones.test.ts`, `src/datos/productos.test.ts`, `src/datos/usuarios.test.ts` | RUN, validaciones, operaciones CRUD, duplicados y filtros |
| Pruebas de componentes | `src/componentes/atomos/Boton.test.tsx`, `src/componentes/moleculas/CardProducto.test.tsx` | Renderizado, propiedades, eventos, stock y carrito |
| Pruebas de mantenedores | `src/componentes/organismos/TablaProductosAdmin.test.tsx`, `src/componentes/organismos/TablaUsuariosAdmin.test.tsx` | Filtros, estado vacío, enlaces de edición, activación y eliminación |
| Prueba de hook personalizado | `src/hooks/useCarrito.test.ts` | Agregar, quitar, actualizar cantidades y persistencia en `localStorage` |
| Prueba de formulario | `src/componentes/organismos/FormularioContacto.test.tsx` | Errores de validación, contador de caracteres y envío exitoso |

`src/setupTests.ts` carga los matchers de `jest-dom` (`toBeInTheDocument`, `toBeDisabled`, etc.) y
`src/test-utils.tsx` expone un `renderConProviders()` para probar componentes que dependen de
React Router y/o de los contextos de carrito/sesión sin tener que montar `<App />` completa.

`npm run test:coverage` genera reportes de texto, JSON y HTML usando V8. El HTML queda en
`coverage/index.html`; el proceso y sus límites se documentan en [`docs/PRUEBAS.md`](docs/PRUEBAS.md)
y [`docs/reporte-cobertura.md`](docs/reporte-cobertura.md). La cobertura mide código ejecutado y no
reemplaza la revisión de que cada prueba compruebe resultados pertinentes.

## Diseño y requisitos

La interfaz está organizada con Atomic Design. El patrón Repository está aplicado en los módulos
`src/datos/productos.ts` y `src/datos/usuarios.ts`, que separan la lectura, búsqueda y modificación de
datos de las vistas. Los proveedores de sesión y carrito comparten estado transversal con Context.
La justificación y el alcance funcional están en [`docs/ERS-actualizado.md`](docs/ERS-actualizado.md).

## Notas importantes

- **No hay backend ni base de datos**: la persistencia de carrito y sesión se hace con `localStorage`.
  Productos, usuarios y contenidos son datos simulados en memoria (`src/datos/`); los cambios del
  catálogo y del mantenedor se pierden al recargar la página.
- **Cuenta de administrador de prueba**: `admin@ferreterialosmaestros.cl` / `admin123`.
- **Validación de RUN**: `src/utils/validaciones.ts` implementa el algoritmo de dígito verificador
  Módulo 11, usado en el registro de usuarios y en el mantenedor de usuarios del panel admin.

## Imágenes del catálogo

Cada uno de los 85 códigos del catálogo tiene un archivo visual independiente en `public/img/productos/<CODIGO>.svg`, mostrado tanto en las tarjetas como en la vista de detalle. Estas ilustraciones son referencias provisionales por tipo de producto, no fotografías comerciales auténticas. En el detalle de cada producto se agregó un enlace para buscar fotografías reales por marca y nombre. El catálogo actual no incluye códigos de fabricante/modelo para la mayoría de las referencias, por lo que no es posible garantizar una coincidencia exacta de modelo solo con los datos existentes.
