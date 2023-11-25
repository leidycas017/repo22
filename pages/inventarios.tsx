import { API_SERVICES, fetcher } from "@/services";
import useSWR from "swr";
import { NuevoMovimiento } from "@/components/inventarios/NuevoMovimiento";
import { MaterialFilters } from "@/components/inventarios/MaterialFilters";
import { UserQuery } from "@/types";
import { useGetRoles } from "@/hooks/useGetRoles";
import { useState } from "react";
import { PrivateRoute } from "@/components/usuarios/PrivateRoute";

interface InventariosProps {
  identificador: string;
  fecha: string;
  entrada: string;
  salida: string;
  responsable: string;
}

const Inventarios = () => {
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);
  const { roles } = useGetRoles();
  const { data, isLoading, error } = useSWR<UserQuery>(API_SERVICES, fetcher);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <PrivateRoute>
      <div className="flex h-screen">
        <div>{/* <Sidebar /> */}</div>
        <div className="w-[100%]">
          <div className="flex items-center justify-center bg-white p-10">
            <h1 className="text-black text-center text-4xl">
              Gestión de Inventarios
            </h1>
          </div>
          <div className="flex justify-between px-20">
            <span>
              <MaterialFilters />
            </span>
            <span>
              <button
                className="mt-3 text-black text-sm  border border-gray-300 gap-2 px-4 py-2 font-semibold hover:scale-105 bg-white "
                type="button"
                onClick={() => setOpenNuevoMovimiento(true)}
              >
                Agregar Movimiento
              </button>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mt-10 gap-3">
            <table cellSpacing="0" className="materialesTable">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Responsable</th>
                </tr>
              </thead>
              <tbody>
                {data?.inventarios?.map((inventario) => {
                  return (
                    <tr key={inventario.id}>
                      <td>{inventario.id}</td>
                      <td>{inventario.fecha.toString()}</td>
                      <td>{inventario.entrada}</td>
                      <td>{inventario.salida}</td>
                      <td>{inventario.responsable}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <NuevoMovimiento
          open={openNuevoMovimiento}
          setOpen={setOpenNuevoMovimiento}
        />
      </div>
    </PrivateRoute>
  );
};

export default Inventarios;
