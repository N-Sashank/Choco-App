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

function WarehousesDialog() {
  const [Wname, setWname] = useState(" ");
  const [pincode, setpincode] = useState(" ");

  const addwarehouse = async () => {
    try {
      // console.log(typeof(Wname),typeof(pincode))
      const data = {
        name: Wname,
        pincode,
      };
      //   console.log(data)

      const response = await axios
        .post("http://localhost:3000/api/warehouses", {
          data,
        })
        .then(function (response) {console.log(response)})
        .catch(function (error) {
          console.log(error.response.data.message.issues[0]);
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
          Add Warehouse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>Add warehouse details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Warehouse_Id
            </Label>
            <Input
              onChange={(e) => {
                setWname(e.target.value);
              }}
              autoComplete="off"
              id="name"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pincode" className="text-right">
              Pincode
            </Label>
            <Input
              onChange={(e) => {
                setpincode(e.target.value);
              }}
              autoComplete="off"
              id="pincode"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className=" rounded-xl text-black font-bold hover:bg-yellow-600"
            type="submit"
            onClick={addwarehouse}
          >
            ADD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default WarehousesDialog;
