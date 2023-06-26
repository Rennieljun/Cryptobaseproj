'use client';

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import {AiOutlineMenu, AiOutlineClose} from'react-icons/ai'
import { useState } from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { UserAuth } from '@/context/AuthContext';



const Navbar = () => {
  const [nav, setNav] = useState(false);
  const {user, logout} = UserAuth();
  const handleNav = () => {
    setNav((prev => (prev == false ? true : false)));
  }



  return (
    <div className='navBar flex items-center justify-between h-20 font-bold'>
        <Link href='/' className='text-2xl md:pt-0 pt-10'>CRYPTOBASE</Link>
        <div className='hidden md:block'> 
          <ThemeToggle/>
        </div>
        <div className='md:block hidden'> 

          {user?.email? (
          <Link href='/' className='p-4 hover:text-accent' >HOME</Link>
          ) : (
          <Link href="/Signin" className='p-4 hover:text-accent' >Sign in</Link>
          )}
          {user?.email ? (
            <Link href="/Account" className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl' >Profile</Link>
          ) : (
            <Link href="/Signup" className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl' >Sign up</Link>
          )}
        </div>
        <div className='md:hidden fixed top-0 left-0 right-0 px-5 pt-2 flex justify-between items-center w-full cursor-pointer bg-primary border border-secondary shadow-sm z-10'>
          <div>
            {nav ? <AiOutlineClose size={25} onClick={handleNav}/>: <AiOutlineMenu size={25} onClick={handleNav}/>}
          </div>
        </div>
        <div className={nav ? 'md:hidden fixed left-0 top-10 flex flex-col items-center justify-between w-full h-[85%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-10 flex flex-col items-center justify-between h-[85%] bg-primary ease-in duration-300 z-10' }>
          <ul className='w-full p-4 '>
            <li className='border-b py-6'>
              <Link href='/' onClick={handleNav}>Home</Link>
            </li>
            {user?.email ? (
            <li className='border-b py-6'>
              <Link href='/Account' onClick={handleNav}>Account</Link>
            </li>
            ) : ('')}
            <li className='py-6'>
              <ThemeToggle/>
            </li>
          </ul>
            <div className='flex flex-col w-full p-4 text-center'>
              {user?.email ? (
                <button onClick={()=> logout()} className='w-full my-2 p-3 bg-button text-btnText border border-secondary rounded-2xl shadow-xl'>
                Logout
              </button>
              ): (
                <Link href='/Signup' className='w-full my-2 p-3 bg-button text-btnText border border-secondary rounded-2xl shadow-xl' onClick={handleNav}>
                Sign up
              </Link>
              )}
              {user?.email ? (<></>):
              (
                 <Link href='/Signin' className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl' onClick={handleNav}>
               Sign in
              </Link>
              )}
             
              
            </div>
        </div>
    </div>
  )
}

export default Navbar