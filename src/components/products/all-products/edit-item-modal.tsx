import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

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
import { type ElementRef, useRef, useState } from "react"
import { api } from "~/lib/api"
import { toast } from "sonner"

interface EditItemModalProps {
  itemId: number
  children: React.ReactNode
}

export function EditItemModal({children,itemId}: EditItemModalProps) {

  const {data: item, isLoading, isError} = api.item.getById.useQuery({itemId: itemId})

  const {refetch} = api.item.getAll.useQuery()

  const [itemName, setItemName] = useState<string>()
  const [itemPrice, setItemPrice] = useState<number>()

  const closeRef = useRef<ElementRef<"button">>(null)

  const {mutate:editItemMutation, isPending:IsEditPending} = api.item.edit.useMutation({
    onError: ({message}) => toast.error(message),
    onSuccess: async () => {
      toast.success('Item edited sucessfully')
      closeRef.current?.click()
      await refetch()
    },
  })



  const handleUpdateItem = (id: number) => async () => {
    editItemMutation({
      id: id,
      name: itemName,
      price: itemPrice 
    })
  }

  const handleEditItemName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value)
  }
  const handleEditItemPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(Number(e.target.value))
  }

  if (isLoading || !item) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Something went wrong</p>
  }


  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
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
              value={itemName}
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
              value={itemPrice}
              onChange={handleEditItemPrice}
              className="col-span-3"
              />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild ref={closeRef}>
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
  )
}
