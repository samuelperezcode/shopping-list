import { Button } from "~/components/ui/button"

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

import { type ElementRef, useRef } from "react"
import { api } from "~/lib/api"
import { toast } from "sonner"

interface DeleteItemModalProps {
  itemId: number
  children: React.ReactNode
}

export function DeleteItemModal({children,itemId}:DeleteItemModalProps) {
  const closeRef = useRef<ElementRef<"button">>(null)

  const {data:item, isLoading, isError} = api.item.getById.useQuery({itemId})
  const {refetch} = api.item.getAll.useQuery()

  const {mutate: deleteItemMutation, isPending: isDeletePending} = api.item.delete.useMutation({
    onSuccess: async ({name}) => {
      toast.success(`${name} was deleted successfully`)
      closeRef.current?.click()
      await refetch()
    },
    onError: ({message}) => toast.error(message),
  })

  const handleDeleteItem = () => {
    deleteItemMutation({
      id: itemId
    })
    
  }

  if(isLoading || !item){
    return <p>Loading...</p>
  }

  if(isError){
    return <p>Something went wrong</p>
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
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
          <DialogClose asChild ref={closeRef}>
            <Button type="button" variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleDeleteItem} type="submit" disabled={isDeletePending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
