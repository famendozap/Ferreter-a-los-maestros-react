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
npm test          # corre todas las pruebas una vez
npm run test:watch  # modo watch, útil mientras se desarrolla
```

Las pruebas están junto al archivo que prueban (`*.test.ts` / `*.test.tsx`) y cubren los distintos tipos
de prueba vistos en clase:

| Tipo de prueba | Archivo | Qué verifica |
|---|---|---|
| Pruebas unitarias puras (lógica de negocio) | `src/utils/validaciones.test.ts` | Validador de RUN (Módulo 11), formato de RUN, validación de login/registro/contacto |
| Prueba de componente + eventos/interacciones | `src/componentes/atomos/Boton.test.tsx` | Renderizado, `onClick`, estado `disabled` |
| Prueba de hook personalizado | `src/hooks/useCarrito.test.ts` | `agregar`/`quitar`/`actualizarCantidad`, persistencia en `localStorage` |
| Prueba de componente con contexto/routing | `src/componentes/moleculas/CardProducto.test.tsx` | Render con datos reales, link de detalle, callback `onAgregar` |
| Prueba de componente con estado y validación | `src/componentes/organismos/FormularioContacto.test.tsx` | Errores de validación, contador de caracteres, flujo exitoso |

`src/setupTests.ts` carga los matchers de `jest-dom` (`toBeInTheDocument`, `toBeDisabled`, etc.) y
`src/test-utils.tsx` expone un `renderConProviders()` para probar componentes que dependen de
React Router y/o de los contextos de carrito/sesión sin tener que montar `<App />` completa.

**No incluidas todavía** (quedan como extensión natural si el profesor las pide): pruebas de integración
contra una API real (no aplica aún porque no hay backend), pruebas de rendimiento con `react-profiler` y
pruebas de accesibilidad automatizadas (se podrían agregar con `jest-axe`).

## Notas importantes

- **No hay backend ni base de datos**: tal como pide la pauta de la Evaluación Parcial 1, toda la
  persistencia (carrito, sesión) se hace con `localStorage`. Los datos de productos/usuarios/contenidos
  son arreglos en memoria (`src/datos/`); al recargar la página, las altas/ediciones hechas en el panel
  de administración no se guardan permanentemente (esto quedará resuelto en la etapa de microservicios,
  prevista para el examen final).
- **Cuenta de administrador de prueba**: `admin@ferreterialosmaestros.cl` / `admin123`.
- **Validación de RUN**: `src/utils/validaciones.ts` implementa el algoritmo de dígito verificador
  Módulo 11, usado en el registro de usuarios y en el mantenedor de usuarios del panel admin.

## Imágenes del catálogo

Cada uno de los 85 códigos del catálogo tiene un archivo visual independiente en `public/img/productos/<CODIGO>.svg`, mostrado tanto en las tarjetas como en la vista de detalle. Estas ilustraciones son referencias provisionales por tipo de producto, no fotografías comerciales auténticas. En el detalle de cada producto se agregó un enlace para buscar fotografías reales por marca y nombre. El catálogo actual no incluye códigos de fabricante/modelo para la mayoría de las referencias, por lo que no es posible garantizar una coincidencia exacta de modelo solo con los datos existentes.
