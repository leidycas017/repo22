import { NavigationCard } from "@/components/NavigationCard";
import { PrivateComponent } from "@/components/PrivateComponent";
import { Sidebar } from "@/components/Sidebar";
import { PrimaryActionButton } from "@/components/ui/Dialog/Buttons";
import { useSession, signIn } from "next-auth/react";

const Home = () => {
  const { status } = useSession();
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <h1>Sistema de gestión de inventarios</h1>
      {status === "authenticated" ? (
        <div className="flex gap-4 mt-5">
          <PrivateComponent roleName="ADMIN">
            <NavigationCard title="Usuarios" href="/usuarios" />
          </PrivateComponent>
          <NavigationCard title="Materiales" href="/materiales" />
          <NavigationCard title="Inventarios" href="/inventarios" />
        </div>
      ) : (
        <div className="mt-4">
          <PrimaryActionButton
            loading={status === "loading"}
            text="Iniciar sesión"
            onClick={() => {
              signIn("auth0");
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
