import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/sonner";

import { api } from "~/lib/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans antialiased`}>
     {/*  <div className="absolute top-0 z-[-2] h-full w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
};

export default api.withTRPC(MyApp);
