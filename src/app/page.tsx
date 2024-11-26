import { Button } from "@/components/ui/button"
import Link from "next/link";

 

export default function Home() {
  return (
   <>
   <div className="h-screen bg-stone-500">

   <h1 className="bg-stone-400  ">choco-app</h1>
   <Link href={"http://localhost:3000/admin"}> <Button className="bg-red-50 hover:bg-red-100 text-gray-900 m-3"> Admin Dashboard</Button> </Link>
   </div>
   </>
  );
}
