import { useEffect, useState } from "react";
import { NavigationCard } from "./NavigationCard";
import { PrivateComponent } from "./PrivateComponent";
import router from "next/router";

interface SidebarProps {
  name: string;
  image: string;
}
const Sidebar = ({ name, image }: SidebarProps) => {
  const [selectedPage, setSelectedPage] = useState("");
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);
  return (
    <aside className="bg-gray-300 debug w-342px h-full flex flex-col gap-2 px-0 py-90">
      <div className="bg-gray-300 flex flex-col items-center debug w-full h-314 gap-0 pb-1 relative p-10 px-10 py-90">
        <img
          className="bg-black rounded-full w-36 h-36 blackground_foto"
          src={image}
          alt="Foto"
        />
        <h1>{name}</h1>
      </div>
      <div className="bg-gray flex flex-col items-center debug w-full h-314 gap-1 pb-1 relative p-10 px-5">
        <PrivateComponent roleName="ADMIN">
          <NavigationCard
            title="Usuarios"
            href="/usuarios"
            isSelected={selectedPage === "/usuarios"}
          />
        </PrivateComponent>
        <NavigationCard
          title="Inventarios"
          href="/inventarios"
          isSelected={selectedPage === "/inventarios"}
        />
        <NavigationCard
          title="Materiales"
          href="/materiales"
          isSelected={selectedPage === "/materiales"}
        />
      </div>
    </aside>
  );
};

export { Sidebar };
