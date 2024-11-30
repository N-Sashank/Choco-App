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

import InventoryForm from "./inventory_form";

function InventoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl text-black" variant="outline">
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>Add Inventory details</DialogDescription>
        </DialogHeader>

        <InventoryForm />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default InventoryDialog;
