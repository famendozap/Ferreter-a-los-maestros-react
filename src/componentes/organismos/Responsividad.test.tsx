import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import GrillaProductos from './GrillaProductos'
import { PRODUCTOS } from '../../datos/productos'
import { CarritoProvider } from '../../hooks/CarritoContexto'

describe('Test de responsividad', () => {


 it('tiene clases de Bootstrap para adaptarse a pantallas móviles y escritorio', async () => {

  render(

   <CarritoProvider>

    <MemoryRouter>
     <GrillaProductos />
    </MemoryRouter>

   </CarritoProvider>

  )
  const elementoTexto = await screen.findByText(PRODUCTOS[0].nombre)

  const columna = elementoTexto.closest('[class*="col-"]')

  expect(columna?.className).toMatch(/col-/)
 })
})