import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

export interface iUserSessionData {
  id: string;
  name: string;
  email: string;
  image: string;
}
const Layout = ({ children }: LayoutProps) => {
  const { status, data } = useSession();
  console.log(status);
  const userData = data?.user as iUserSessionData;
  // console.log("this is DAta in index-->", userData);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex h-screen">
        <Sidebar name={userData?.name} image={userData?.image} />
        <main className="flex flex-col w-full">{children}</main>
      </div>
    );
  }

  return <main className="flex flex-col">{children}</main>;
};

export { Layout };
