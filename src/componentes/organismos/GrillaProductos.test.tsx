import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderConProviders } from '../../test-utils';
import GrillaProductos from './GrillaProductos';

describe('<GrillaProductos />', () => {
  it('encuentra productos por marca', async () => {
    const usuario = userEvent.setup();
    renderConProviders(<GrillaProductos />);

    await usuario.type(screen.getByPlaceholderText(/buscar por nombre o código/i), 'Polpaico');

    expect(screen.getByText('Cemento Polpaico gris 25 kg')).toBeInTheDocument();
    expect(screen.getByText('1 productos encontrados')).toBeInTheDocument();
  });
});
