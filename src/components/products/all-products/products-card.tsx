import {
  Card,
  CardContent,
} from "~/components/ui/card"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"


import { ListFooter } from "./list-footer"
import { ListHeader } from "./list-header"
import { api } from "~/lib/api"

import { ProductRow } from "./product-row"

export function ProductsCard() {
  const {data: items, isLoading} = api.item.getAll.useQuery()

  return (
    <Card className="mt-8">
      <ListHeader />
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
              !isLoading && items !== undefined && items?.length > 0 ? (   
                items?.map( item => (
                  <ProductRow key={item.id} item={item} />
                 )
               )
              ) : null
            }
          </TableBody>
        </Table>
      </CardContent>
      <ListFooter />
    </Card>
  )
}