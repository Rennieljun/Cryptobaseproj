'use client';
import { ThemeProvider } from '@/context/ThemeContext'
import {AuthContextProvider} from '@/context/AuthContext'

const Providers = ({children}) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
            {children}
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default Providers