import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { DeleteUserDialog } from "@/components/usuarios/DeleteUserDialog";
import { useState } from "react";
import { User } from "@/types";
import { UpdateUserDialog } from "@/components/usuarios/UpdateUserDialog";

interface UserTableActionsProps {
  user: User;
}

const UsersTableActions = ({ user }: UserTableActionsProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  return (
    <div className="text-2xl flex gap-3">
      <button
        onClick={() => setOpenUpdateDialog(true)}
        type="button"
        className="hover:text-yellow-700"
      >
        <MdOutlineModeEditOutline />
      </button>
      <button
        onClick={() => {
          setOpenDeleteDialog(true);
        }}
        type="button"
        className="hover:text-red-700"
      >
        <MdDeleteOutline />
      </button>
      <DeleteUserDialog
        user={user}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
      <UpdateUserDialog
        user={user}
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
      />
    </div>
  );
};

export { UsersTableActions };
