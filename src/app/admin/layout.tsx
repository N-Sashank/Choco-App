"use client";
import { useMemo, useState } from "react";
import {
  Blocks,
  CircleCheck,
  HomeIcon,
  Layers,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";

function adminLayout({ children }: { children: React.ReactNode }) {
  const [items, setitems] = useState([
    {
      icon: HomeIcon,
      label: "Dashboard",
      url: "/admin",
      active: true,
    },
    {
      icon: Layers,
      label: "Products",
      url: "/admin/products",
      active: false,
    },
    {
      icon: Warehouse,
      label: "Warehouses",
      url: "/admin/warehouses",
      active: false,
    },
    {
      icon: Users,
      label: "Delivery_persons",
      url: "/admin/delivery_persons",
      active: false,
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      url: "/admin/orders",
      active: false,
    },

    {
      icon: Blocks,
      label: "Inventory",
      url: "/admin/inventory",
      active: false,
    },
  ]);

  const changeStatus = (data: string) => {
    const items1 = [...items];
    items1.map((i) => {
      if (i.label === data) {
        i.active = true;
      } else {
        i.active = false;
      }
    });
    setitems(items1);
  };

  return (
    <>
      <div
        id="menubar"
        className=" bg-stone-500 min-h-screen max-h-[200vh] w-screen flex "
      >
        <div className="  bg-stone-900 w-56 lg:w-1/5  p-4">
          <div className="">
            <div className=" mb-10 flex gap-3 items-center ">
              {" "}
              <CircleCheck className=" text-white" />
              <Link href={"/"}>
                <b className="text-2xl text-orange-700 font-bold ">Choco Inc</b>
              </Link>
            </div>

            {items.map((item) => {
              return (
                <Link
                  key={item.label}
                  onClick={() => {
                    changeStatus(item.label);
                  }}
                  href={item.url}
                  className={
                    item.active
                      ? "bg-stone-700 rounded-full text-amber-100 flex justify-start gap-3 items-center p-3 active:bg-stone-800 hover:bg-stone-700"
                      : "rounded-full text-slate-300 flex justify-start gap-3 items-center p-3 active:bg-stone-800 hover:bg-stone-700"
                  }
                >
                  <item.icon className="hidden lg:block text-stone-400" />
                  <h4>{item.label}</h4>
                </Link>
              );
            })}
          </div>
        </div>

        <div id="nav_component" className="w-full ">
          <div className="w-full h-12 bg-stone-800 flex  items-center justify-end ">
            <span className=" mx-2 text-white "> Admin Dashboard</span>
          </div>
          <span className="">{children}</span>
        </div>
      </div>
    </>
  );
}
export default adminLayout;
