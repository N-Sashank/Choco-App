"use client";
import { useEffect, useRef, useState } from "react";
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
import { number } from "zod";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState(Number || null);
  const items = [
    {
      id: 1,
      icon: HomeIcon,
      label: "Dashboard",
      url: "/admin",
    },
    {
      id: 2,
      icon: Layers,
      label: "Products",
      url: "/admin/products",
    },
    {
      id: 3,
      icon: Warehouse,
      label: "Warehouses",
      url: "/admin/warehouses",
    },
    {
      id: 4,
      icon: Users,
      label: "Delivery_persons",
      url: "/admin/delivery_persons",
    },
    {
      id: 5,
      icon: ShoppingCart,
      label: "Orders",
      url: "/admin/orders",
    },

    {
      id: 6,
      icon: Blocks,
      label: "Inventory",
      url: "/admin/inventory",
    },
  ];
  const changeStatus = (id: number) => {
    setActiveItem(id);
    localStorage.setItem("activeSidebarItem", String(id));
  };

  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeSidebarItem");
    if (savedActiveItem) {
      setActiveItem(Number(savedActiveItem));
    }
  }, []);

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
                  onClick={(e) => {
                    changeStatus(item.id);
                  }}
                  href={item.url}
                  className={` 
                    ${
                      activeItem === item.id
                        ? "bg-stone-700 rounded-full text-amber-100 flex justify-start gap-3 items-center p-3 active:bg-stone-800 hover:bg-stone-700"
                        : "rounded-full text-slate-300 flex justify-start gap-3 items-center p-3 active:bg-stone-800 hover:bg-stone-700"
                    }`}
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
export default AdminLayout;
