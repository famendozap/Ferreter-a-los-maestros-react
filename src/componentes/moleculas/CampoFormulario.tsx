import type { InputHTMLAttributes } from 'react';
import Input from '../atomos/Input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string;
  error?: string;
}

export default function CampoFormulario({ etiqueta, error, id, ...resto }: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      <Input id={id} error={error} {...resto} />
    </div>
  );
}
