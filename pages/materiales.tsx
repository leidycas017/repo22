import { Sidebar } from "@/components/Sidebar";
import { API_SERVICES, fetcher } from "@/services";
import useSWR from "swr";
import { NuevoMaterial } from "@/components/materiales/NuevoMaterial";
import { UserQuery } from "@/types";
import { useGetRoles } from "@/hooks/useGetRoles";
import { useState } from "react";
import { PrivateRoute } from "@/components/usuarios/PrivateRoute";
import { useSession } from "next-auth/react";
import { iUserSessionData } from "@/layouts";
import { PrivateComponent } from "@/components/PrivateComponent";

interface MaterialesProps {
  identificador: string;
  fecha: string;
  nombre: string;
  saldo: string;
  creado: string;
}

const Materiales = () => {
  const [openNuevoMaterial, setOpenNuevoMaterial] = useState(false);
  const { roles } = useGetRoles();
  const { data, isLoading, error } = useSWR<UserQuery>(
    API_SERVICES.material,
    fetcher
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <PrivateRoute>
      <div className="flex h-screen">
        <div>{/* <Sidebar /> */}</div>
        <div className="w-[100%]">
          <div className="flex items-center justify-center bg-white p-10">
            <h1 className="text-black text-center text-4xl">
              Gestión de Materiales
            </h1>
          </div>
          <div className="flex justify-between px-20">
            <span></span>
            <span>
              <PrivateComponent roleName="ADMIN">
                <button
                  className="mt-3 text-black text-sm  border border-gray-300 gap-2 px-4 py-2 font-semibold hover:scale-105 bg-white "
                  type="button"
                  onClick={() => setOpenNuevoMaterial(true)}
                >
                  Agregar material
                </button>
              </PrivateComponent>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mt-10 gap-3">
            <table cellSpacing="0" className="materialesTable">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha de creación</th>
                  <th>Nombre</th>
                  <th>Saldo</th>
                  <th>Creado por</th>
                </tr>
              </thead>
              <tbody>
                {data?.materiales?.map((material) => {
                  return (
                    <tr key={material.id}>
                      <td>{material.id}</td>
                      <td>{material.fechaCreacion.toString()}</td>
                      <td>{material.nombre}</td>
                      <td>{material.saldo}</td>
                      <td>{material.creadoPor}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <NuevoMaterial
          open={openNuevoMaterial}
          setOpen={setOpenNuevoMaterial}
        />
      </div>
    </PrivateRoute>
  );
};

export default Materiales;
