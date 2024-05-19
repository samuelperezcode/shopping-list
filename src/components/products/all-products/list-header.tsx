import { CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function ListHeader() {
  return (
    <CardHeader>
      <CardTitle>Products</CardTitle>
      <CardDescription>
        Manage your products and view their sales performance.
      </CardDescription>
    </CardHeader>
  )
}
