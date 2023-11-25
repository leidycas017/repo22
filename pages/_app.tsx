import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/layouts";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/Sidebar";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
};

export default App;
