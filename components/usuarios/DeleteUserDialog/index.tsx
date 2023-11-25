import { Dialog } from "@/components/ui/Dialog";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { API_SERVICES } from "@/services";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { User } from "@/types";
import { PrimaryActionButton } from "@/components/ui/Dialog/Buttons/PrimaryActionButton";
import { SecondaryActionButton } from "@/components/ui/Dialog/Buttons";

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const DeleteUserDialog = ({ open, setOpen, user }: DeleteUserDialogProps) => {
  const [loading, setLoading] = useState(false);
  const deleteUser = async () => {
    setLoading(true);
    try{
      await axios.request({
        method: 'DELETE',
        url: `${API_SERVICES.users}/${user.id}`,
      });
    toast.success("usuario eliminado correctamente");
    await mutate(API_SERVICES.users);
    }catch (error){
      console.log(error);
    toast.error("error eliminando el usuario");
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog
      title="Eliminar el usuario"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <span>
          Esta acción no se puede revertir.¿Está seguro de querer eliminar el
          usuario?
        </span>
        <div className="flex gap-3">
          <PrimaryActionButton
            loading={loading}
            onClick={deleteUser}
            text="Confirmar"
            type="button"
          />
          <SecondaryActionButton
            text="Cancelar"
            type="button"
            loading={loading}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export { DeleteUserDialog };
