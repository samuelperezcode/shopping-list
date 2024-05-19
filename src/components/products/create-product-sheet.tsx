
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"


import {

  PlusCircle,

} from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { useState, useTransition } from "react"
import { api } from "~/lib/api"
import { toast } from "sonner"

export function CreateProductSheet() {
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState<number>()
  const [isPending, startTransition] = useTransition()

  const {refetch} = api.item.getAll.useQuery()

  const { mutate: createItemMutation} = api.item.create.useMutation({
    onError: ({message}) => {
      toast.error(message)
    },
    onSuccess: async () => {
      toast.success('Item added to the shooping list!')
      await refetch()
    }
  })


  const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value)
  }
 
  const handleChangePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(Number(e.target.value))
  }

  const handleCreateItem = () => {
    startTransition(async () => {
      createItemMutation({
        name: itemName,
        price: itemPrice ?? 0
      })
      setItemName('')
      setItemPrice(undefined)
    })
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create item</SheetTitle>
          <SheetDescription>
            Add a new item to the shopping list. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={itemName} placeholder="LG X42 Smart TV" className="col-span-3" onChange={handleChangeName} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type="number" placeholder="230.99" value={itemPrice} className="col-span-3" onChange={handleChangePrice} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleCreateItem} disabled={isPending}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}