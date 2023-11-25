import { useState } from "react";
//import { useDateFilters } from '@/atoms/DateFiltersAtom';

const tipoM = ["Entrada", "Salida"];

const MovimientoFilters = () => {
  const [movimientoFilters, setMovimientoFilters] = useState({
    tipo: "",
  });

  return (
    <div className="flex gap-3">
      <label htmlFor="tipo">
        <span></span>
        <select
          name="tipo"
          value={movimientoFilters.tipo}
          onChange={(e) =>
            setMovimientoFilters({
              ...movimientoFilters,
              tipo: parseInt(e.target.value).toString(),
            })
          }
        >
          <option disabled value="">
            Seleccione el movimiento
          </option>
          {tipoM.map((tipo) => {
            return (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
export { MovimientoFilters };
