import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = '', ...resto }: Props) {
  return (
    <>
      <input className={`form-control ${error ? 'is-invalid' : ''} ${className}`.trim()} {...resto} />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </>
  );
}
