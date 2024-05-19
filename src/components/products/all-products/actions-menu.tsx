import { Button } from "~/components/ui/button"

import {
  EditIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

import { EditItemModal } from "./edit-item-modal"
import { DeleteItemModal } from "./delete-item-modal"

interface ActionsMenuProps {
 itemId: number
}

export function ActionsMenu({itemId}:ActionsMenuProps) {
  return (
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
        <EditItemModal itemId={itemId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </EditItemModal>
        <DeleteItemModal itemId={itemId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DeleteItemModal>                            
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
