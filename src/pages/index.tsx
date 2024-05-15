import Head from "next/head";
import { Button } from "~/components/ui/button";

export default function Home() {

  return (
    <>
      <Head>
        <title>Shopping List 🛒</title>
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Button>Click me</Button>
      </main>
    </>
  );
}
