'use client';

import { auth } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { UserAuth } from '@/context/AuthContext'


const Signin = () => {
  const {logout} = UserAuth();

  if(auth?.currentUser){
    return (
      <button className='border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl' onClick={()=> logout()}>Logout</button>
    )
  }
  return (
    <Link href='/Signin'>Sign in</Link>
  )
}

export default Signin