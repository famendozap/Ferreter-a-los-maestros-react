import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioContacto from './FormularioContacto';

describe('<FormularioContacto />', () => {
  it('muestra errores de validación si se envía vacío', async () => {
    const usuario = userEvent.setup();
    render(<FormularioContacto />);

    await usuario.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/tu nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/el mensaje no puede estar vacío/i)).toBeInTheDocument();
  });

  it('actualiza el contador de caracteres mientras el usuario escribe', async () => {
    const usuario = userEvent.setup();
    render(<FormularioContacto />);

    const mensaje = screen.getByLabelText(/mensaje/i);
    await usuario.type(mensaje, 'Hola, tengo una consulta');

    expect(screen.getByText('24 / 500')).toBeInTheDocument();
  });

  it('muestra el mensaje de éxito cuando los datos son válidos', async () => {
    const usuario = userEvent.setup();
    render(<FormularioContacto />);

    await usuario.type(screen.getByLabelText(/nombre/i), 'Ana Pérez');
    await usuario.type(screen.getByLabelText(/correo electrónico/i), 'ana@test.cl');
    await usuario.type(
      screen.getByLabelText(/mensaje/i),
      'Quisiera cotizar diez sacos de cemento para esta semana.',
    );
    await usuario.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/gracias por escribirnos/i)).toBeInTheDocument();
  });
});
