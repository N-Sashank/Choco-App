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

import DeliveryPersonForm from "./delivery_personform";

function Delivery_personDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-white rounded-xl text-black" variant="outline">
          Add delivery_person
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-stone-800  text-white  sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="text-yellow-700">
            Add delivery_person details
          </DialogDescription>
        </DialogHeader>

        <DeliveryPersonForm />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default Delivery_personDialog;
