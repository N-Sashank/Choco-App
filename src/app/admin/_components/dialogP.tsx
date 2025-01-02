"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductForm from "./productForm";

function ProductsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl text-black bg-white" variant="outline">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-stone-800  text-white  rounded sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="text-yellow-700">
            Add Product details
          </DialogDescription>
        </DialogHeader>

        <ProductForm />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ProductsDialog;
