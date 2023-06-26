'use client';

import {createContext, useContext} from 'react'
import {HiSun, HiMoon} from 'react-icons/hi'
import { ThemeContext } from '@/context/ThemeContext'

const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <div className='block justify-center items-start'>
        {theme === 'dark' ? (
            <div onClick={toggleTheme} className='flex items-center cursor-pointer'><HiSun/>Light Mode</div>
        ): (
            <div onClick={toggleTheme} className='flex items-center cursor-pointer'><HiMoon/>Dark Mode</div>
        )}
    </div>
  )
}

export default ThemeToggle;