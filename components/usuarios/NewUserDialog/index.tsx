import { Dialog } from "@/components/ui/Dialog";
import {
  PrimaryActionButton,
  SecondaryActionButton,
} from "@/components/ui/Dialog/Buttons";
import { RequiredMark } from "@/components/ui/Dialog/Forms/RequiredMark";
import { useGetRoles } from "@/hooks/useGetRoles";
import { API_SERVICES } from "@/services";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import axios, { AxiosError } from "axios";

interface NewUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewUserDialog = ({ open, setOpen }: NewUserDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { roles } = useGetRoles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleId: "",
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      //crear el usuario
      await axios.request({
        method: "POST",
        url: API_SERVICES.users,
        data: {
          ...formData,
        },
      });
      //actualizar la tabla de usuarios
      await mutate(API_SERVICES.users);
      toast.success("Usuario creado correctamente");
      setLoading(false);
    } catch (error) {
      const errorResponse = error as AxiosError;
      const errorData = errorResponse?.response?.data as { message: string };
      if (
        errorData?.message.includes(
          "Unique constraint failed on the fields: (`email`)"
        )
      ) {
        toast.error("Error: ya existe un usuario con ese correo electrónico");
      } else {
        toast.error("Error creando el usuario");
      }
    }
    setOpen(false);
  };

  return (
    <Dialog
      title="Crear nuevo usuario"
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <label htmlFor="user-name">
          <span>
            Nombre <RequiredMark />
          </span>
          <input
            name="user-name"
            type="text"
            placeholder="Nombre"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label htmlFor="email">
          <span>
            Email <RequiredMark />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label htmlFor="user-role">
          <span>
            Rol <RequiredMark />
          </span>
          <select
            name="user-role"
            value={formData.roleId}
            onChange={(e) =>
              setFormData({
                ...formData,
                roleId: e.target.value,
              })
            }
            required
          >
            <option value="" disabled>
              Seleccione un rol
            </option>
            {roles?.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </label>
        <div className="flex gap-3">
          <PrimaryActionButton
            text="Crear usuario"
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

export { NewUserDialog };
