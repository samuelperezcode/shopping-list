import Head from "next/head";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"

import { Sidebar } from "~/components/products/sidebar";
import { Header } from "~/components/products/header";
import { ExportBtn } from "~/components/products/export-btn";
import { FilterMenu } from "~/components/products/filter-menu";
import { CreateProductSheet } from "~/components/products/create-product-sheet";
import { ProductsCard } from "~/components/products/all-products/products-card";

export default function Home() {

  return (
    <>
      <Head>
        <title>Shopping List 🛒</title>
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="products">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="active">Suppliers</TabsTrigger>
                <TabsTrigger value="draft">Employees</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Sales
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <FilterMenu />
                <ExportBtn />         
                <CreateProductSheet />
              </div>
            </div>
              <TabsContent value="products">
                <ProductsCard />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </>
  );
}

