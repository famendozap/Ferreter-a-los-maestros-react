import type { ButtonHTMLAttributes } from 'react';

type Variante = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: 'sm' | 'md' | 'lg';
}

const clasesVariante: Record<Variante, string> = {
  primary: 'btn-lm-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline-secondary',
  danger: 'btn-danger',
  success: 'btn-success',
};

export default function Boton({
  variante = 'primary',
  tamano = 'md',
  className = '',
  children,
  ...resto
}: Props) {
  const tamanoClase = tamano === 'sm' ? 'btn-sm' : tamano === 'lg' ? 'btn-lg' : '';
  return (
    <button className={`btn ${clasesVariante[variante]} ${tamanoClase} ${className}`.trim()} {...resto}>
      {children}
    </button>
  );
}
