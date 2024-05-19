import Image from "next/image"

import { Badge } from "~/components/ui/badge"

import {
  TableCell,
  TableRow,
} from "~/components/ui/table"


import { type Decimal } from "@prisma/client/runtime/library"
import { ActionsMenu } from "./actions-menu"

interface ProductRowProps {
  item: {
    id: number;
    name: string;
    price: Decimal;
    checked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}

export function ProductRow({item}:ProductRowProps) {
  return (
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
        <ActionsMenu itemId={item.id} />
      </TableCell>
    </TableRow>
  )
}
