import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { API_SERVICES, fetcher } from "@/services";
import useSWR from "swr";
import { UserQuery } from "@/types";

//import { useMaterialFilters } from '@/atoms/MaterialFiltersAtom';

const MaterialFilters = () => {
  const [openMaterialFilters, setOpenMaterialFilters] = useState(false);
  const { data, isLoading, error } = useSWR<UserQuery>(
    API_SERVICES.material,
    fetcher
  );

  return (
    <div className="flex gap-3">
      <label htmlFor="materialSelect">
        <span></span>
        <select
          name="Matrial"
          //value={material.nombre}
          value="no"
        >
          <option disabled value="">
            Seleccione un material
          </option>
          {data?.materiales?.map((material) => {
            return <option key={material.nombre}>{material.nombre}</option>;
          })}
        </select>
      </label>
    </div>
  );
};

export { MaterialFilters };
