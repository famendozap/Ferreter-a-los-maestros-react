import { REGIONES, comunasDeRegion } from '../../datos/regiones';

interface Props {
  region: string;
  comuna: string;
  onRegionChange: (region: string) => void;
  onComunaChange: (comuna: string) => void;
  errorRegion?: string;
  errorComuna?: string;
}

export default function SelectorRegionComuna({
  region,
  comuna,
  onRegionChange,
  onComunaChange,
  errorRegion,
  errorComuna,
}: Props) {
  const comunas = comunasDeRegion(region);

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="region" className="form-label">
          Región
        </label>
        <select
          id="region"
          className={`form-select ${errorRegion ? 'is-invalid' : ''}`}
          value={region}
          onChange={(e) => {
            onRegionChange(e.target.value);
            onComunaChange('');
          }}
        >
          <option value="">Selecciona una región</option>
          {REGIONES.map((r) => (
            <option key={r.nombre} value={r.nombre}>
              {r.nombre}
            </option>
          ))}
        </select>
        {errorRegion && <div className="invalid-feedback d-block">{errorRegion}</div>}
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="comuna" className="form-label">
          Comuna
        </label>
        <select
          id="comuna"
          className={`form-select ${errorComuna ? 'is-invalid' : ''}`}
          value={comuna}
          onChange={(e) => onComunaChange(e.target.value)}
          disabled={!region}
        >
          <option value="">Selecciona una comuna</option>
          {comunas.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errorComuna && <div className="invalid-feedback d-block">{errorComuna}</div>}
      </div>
    </div>
  );
}
