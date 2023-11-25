import {
  PrimaryActionButton,
  SecondaryActionButton,
} from "@/components/ui/Dialog/Buttons";
import { Dialog } from "@/components/ui/Dialog";
import { RequiredMark } from "@/components/ui/Dialog/Forms/RequiredMark";
import { useGetRoles } from "@/hooks/useGetRoles";
import { API_SERVICES } from "@/services";
import { Dispatch, SetStateAction, useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { iUserSessionData } from "@/layouts";
import { useGetUsers } from "@/hooks/useGetUsers";

interface NuevoMaterialProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NuevoMaterial = ({ open, setOpen }: NuevoMaterialProps) => {
  const [loading, setLoading] = useState(false);
  const { roles } = useGetRoles();
  const { status: statusUsuario, data: dataUsuario } = useSession();
  console.log("This is data in material---->", dataUsuario);
  const userData = dataUsuario?.user as iUserSessionData;
  const { users: usersList } = useGetUsers();
  const currentUserId = usersList?.find((u) => u.email == userData.email)?.id;
  console.log("****", currentUserId);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    saldo: "",
    fechaCreacion: new Date().toISOString(),
    creadoPor: currentUserId,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Agregar material
      await axios.request({
        method: "POST",
        url: API_SERVICES.material,
        data: {
          ...formData,
        },
      });
      // Actualizar
      await mutate(API_SERVICES.material);
      toast.success("Material agregado correctamente");
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;

      const errorData = errorResponse?.response?.data as { message: string };
    }

    setLoading(false);
  };
  return (
    <Dialog title="Agregar Material" open={open} onClose={() => setOpen(false)}>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <label htmlFor="identificador">
          <span>
            Identificador <RequiredMark />
          </span>
          <input
            name="identificador"
            type="text"
            placeholder="Identificador"
            required
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </label>
        {/* <label htmlFor="fechaCreacion">
          <span>
            Fecha <RequiredMark />
          </span>
          <input
            name="fechaCreacion"
            type="text"
            placeholder="Fecha de creación"
            required
            value={formData.fechaCreacion}
            onChange={(e) =>
              setFormData({ ...formData, fechaCreacion: e.target.value })
            }
          />
        </label> */}
        <label htmlFor="nombre">
          <span>
            Nombre <RequiredMark />
          </span>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre material"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />
        </label>
        <label htmlFor="saldo">
          <span>
            Saldo <RequiredMark />
          </span>
          <input
            name="saldo"
            type="text"
            placeholder="Saldo"
            required
            value={formData.saldo}
            onChange={(e) =>
              setFormData({ ...formData, saldo: e.target.value })
            }
          />
        </label>
        {/* <label htmlFor="creadoPor">
          <span>
            Creado Por <RequiredMark />
          </span>
          <input
            name="creadoPor"
            type="text"
            placeholder="Usuario actual"
            required
            value={formData.creadoPor}
            onChange={(e) =>
              setFormData({ ...formData, creadoPor: e.target.value })
            }
          />
        </label> */}

        <div className="flex gap-3">
          <PrimaryActionButton
            text="Agregar Material"
            loading={loading}
            type="submit"
            onClick={() => {}}
          />
          <SecondaryActionButton
            text="Cancelar"
            onClick={() => setOpen(false)}
            loading={loading}
            type="button"
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NuevoMaterial };
