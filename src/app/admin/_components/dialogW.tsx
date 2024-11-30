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

import WarehouseForm from "./warehouseform";

function WarehousesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl text-black" variant="outline">
          Add Warehouse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>Add Warehouse details</DialogDescription>
        </DialogHeader>

        <WarehouseForm />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default WarehousesDialog;
