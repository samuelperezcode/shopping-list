import {
  CardFooter,
} from "~/components/ui/card"

export  function ListFooter() {
  return (
    <CardFooter>
      <div className="text-xs text-muted-foreground">
        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
        products
      </div>
    </CardFooter>
  )
}
