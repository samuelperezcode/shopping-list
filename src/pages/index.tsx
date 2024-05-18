import Head from "next/head";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import Image from "next/image"

import {
  EditIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "~/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

import { api } from "~/lib/api";
import React, { type ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "~/components/products/sidebar";
import { Header } from "~/components/products/header";
import { ExportBtn } from "~/components/products/export-btn";
import { FilterMenu } from "~/components/products/filter-menu";
import { CreateProductSheet } from "~/components/products/create-product-sheet";

export default function Home() {
  const [editedItemName, setEditedItemName] = useState<string>()
  const [editedItemPrice, setEditedItemPrice] = useState<number>()

  const editModalCloseRef = useRef<ElementRef<"button">>(null)
  const daleteModalCloseRef = useRef<ElementRef<"button">>(null)

  const {data: items, isError, isLoading, refetch} = api.item.getAll.useQuery()


  const {mutate:editItemMutation, isPending:IsEditPending} = api.item.edit.useMutation({
    onError: ({message}) => toast.error(message),
    onSuccess: async () => {
      toast.success('Item edited sucessfully')
      await refetch()
      editModalCloseRef.current?.click()
    },
  })
  const {mutate: deleteItemMutation, isPending: isDeletePending} = api.item.delete.useMutation({
    onSuccess: async ({name}) => {
      toast.success(`${name} was deleted successfully`)
      await refetch()
      daleteModalCloseRef.current?.click()
    },
    onError: ({message}) => toast.error(message),
  })



  const handleUpdateItem = (id: number) => async () => {
    editItemMutation({
      id: id,
      name: editedItemName,
      price: editedItemPrice 
    })
  }

  const handleEditItemName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEditedItemName(e.target.value)
  }
  const handleEditItemPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEditedItemPrice(Number(e.target.value))
  }

  const handleDeleteItem = (id: number) => () => {
    deleteItemMutation({
      id: id
    })
    
  }

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
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <FilterMenu />
                <ExportBtn />         
                <CreateProductSheet />
              </div>
            </div>
              <TabsContent value="all">
          {
            isLoading ? (
              <p>Loading...</p>
            ) : null
          }
          {
            isError ? (
              <p>Something went wrong</p>
            ) : null
          }
          {
            !isLoading && items !== undefined &&items?.length > 0 ? (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                      items?.map( item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt={`${item.name} image`}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src="/placeholder.svg"
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.checked ? 'Completed' : 'Pending'}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${item.price.toString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            6
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            { item.createdAt.toLocaleDateString('en-us')}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>                                
                                  <Dialog>
                                  <DialogTrigger className="w-full" asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <EditIcon className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit item</DialogTitle>
                                      <DialogDescription>
                                        Make changes to the product here. Click save when you are done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                          Name
                                        </Label>
                                        <Input
                                          id="name"
                                          defaultValue={item.name}
                                          className="col-span-3"
                                          value={editedItemName}
                                          onChange={handleEditItemName}
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="price" className="text-right">
                                          Price
                                        </Label>
                                        <Input
                                          id="price"
                                          type="number"
                                          defaultValue={item.price.toString()}
                                          value={editedItemPrice}
                                          onChange={handleEditItemPrice}
                                          className="col-span-3"
                                          />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild ref={editModalCloseRef}>
                                        <Button type="button" variant={'secondary'}>
                                          Cancel
                                        </Button>
                                      </DialogClose>
                                      <Button onClick={handleUpdateItem(item.id)} type="submit" disabled={IsEditPending}>
                                        Save changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Dialog>
                                  <DialogTrigger className="w-full" asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2Icon className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Are you absolutely sure you want to delete {item.name}?</DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. Are you sure you want to permanently
                                        delete this file from our servers?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <DialogClose asChild ref={daleteModalCloseRef}>
                                        <Button type="button" variant={'secondary'}>
                                          Cancel
                                        </Button>
                                      </DialogClose>
                                      <Button onClick={handleDeleteItem(item.id)} type="submit" disabled={isDeletePending}>
                                        Confirm
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        )
                      )
                    }
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
              
            ) : null
          }
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </>
  );
}
