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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

function InventoryDialog() {
  const [Pid, setPid] = useState(" ");
  const [warehouse_id, setwarehouse_id] = useState(" ");
  const [sku, setsku] = useState(" ");

  const addDelivery_person = async () => {
    try {
      console.log(typeof(Number(Pid)),typeof(sku),typeof(Number(warehouse_id)))
      const data = {
        sku,
        product_id: Number(Pid),
        warehouse_id: Number(warehouse_id),
      };
    //   console.log(data)

      const response = await axios
        .post("http://localhost:3000/api/inventory", {
          data,
        })
        .then(function (response) {
            // console.log(response)

        })
        .catch(function (error) {
          console.log(error);
        });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product_id" className="text-right">
              Product_id
            </Label>
            <Input
              onChange={(e) => {
                setPid(e.target.value);
              }}
              autoComplete="off"
              id="product_id"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="warehouse_id" className="text-right">
              Warehouse_id
            </Label>
            <Input
              onChange={(e) => {
                setwarehouse_id(e.target.value);
              }}
              autoComplete="off"
              id="warehouse_id"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sku" className="text-right">
              sku
            </Label>
            <Input
              onChange={(e) => {
                setsku(e.target.value);
              }}
              autoComplete="off"
              id="sku"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className=" rounded-xl text-black font-bold hover:bg-yellow-600"
            type="submit"
            onClick={addDelivery_person}
          >
            ADD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default InventoryDialog;
