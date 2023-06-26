'use client';

import {AiFillLock, AiOutlineMail} from 'react-icons/ai'
import Link from 'next/link'
import { useState } from 'react';
import { UserAuth } from '@/context/AuthContext';

const Signinpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {signin} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try{
      await signin(email, password)
    }catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
      <div className='text-2xl font-bold'>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl '>
              <input onChange={(e) => setEmail(e.target.value)} className='w-full p-2 bg-primary border border-input rounded-2xl' type="email" />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div> 
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl '>
              <input onChange={(e) => setPassword(e.target.value)} className='w-full p-2 bg-primary border border-input rounded-2xl'  type="password" />
              <AiFillLock className='absolute right-2 top-3 text-gray-400'/>
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText shadow-xl rounded-2xl' onClick={signin}>Sign in</button>
        </form>
        <p className='my-4'>Don't have an account? <Link className='text-accent' href='/signup'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default page