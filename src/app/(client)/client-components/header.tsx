import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
    <div className=''>
      
    <div className=' w-full h-7 bg-yellow-950 flex justify-center items-center'>
        <p className='text-sm font-extralight text-white '>Free cupcake for every order</p>
    </div>
    <div className=''>
      <ul className='flex justify-center gap-6 p-4 bg-white'>
        <li className='text-yellow-700 hover:text-yellow-900 hover:underline '><Link href={"http://localhost:3000/admin"}>Home</Link></li>
        <li className='text-yellow-700 hover:text-yellow-900 hover:underline '><Link href={"http://localhost:3000/admin"}>Best Selling </Link></li>
        <li className='text-yellow-700 hover:text-yellow-900 hover:underline '><Link href={"http://localhost:3000/admin"}>Offers</Link></li>
        <li className='text-yellow-700 hover:text-yellow-900 hover:underline '><Link href={"http://localhost:3000/admin"}>Orders </Link></li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default Header
