import { UsersTableActions } from "@/components/usuarios/UsersTableActions";
import { UserQuery } from "@/types";
import { useGetRoles } from "@/hooks/useGetRoles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { NewUserDialog } from "@/components/usuarios/NewUserDialog";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PrivateRoute } from "@/components/usuarios/PrivateRoute";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useGetUsers } from "@/hooks/useGetUsers";

const UsersPageWrapper = () => {
  return (
    <ProtectedRoute roleName="ADMIN">
      <UsersPage />
    </ProtectedRoute>
  );
};

const UsersPage = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const { roles } = useGetRoles();
  const { users, isLoading, error } = useGetUsers();

  console.log("cualquier cosa", users);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <div className="flex h-screen">
      <div>{/* <Sidebar /> */}</div>
      <div className="flex flex-col items-center gap-5 p-10 w-[100%]">
        <section>
          <div className="flex items-center py-10">
            <h1>Gestión de usuarios</h1>
            <Tooltip title="Crear nuevo usuario">
              <button
                type="button"
                onClick={() => setOpenNewUserDialog(true)}
                className="flex text-2xl mt-2 px-4 text-indigo-700 hover:scale-110"
              >
                <AiOutlinePlusCircle />
              </button>
            </Tooltip>
          </div>
        </section>
        <section>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Fecha de creación</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user?.emailVerified
                        ? new Date(user.emailVerified).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </td>

                    <td>{user.email}</td>
                    <td>
                      {roles?.find((r) => r.id === user.roleId)?.name ?? ""}
                    </td>
                    <td>
                      <UsersTableActions user={user} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
      <NewUserDialog open={openNewUserDialog} setOpen={setOpenNewUserDialog} />
    </div>
  );
};

export default UsersPageWrapper;
