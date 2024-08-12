import React from 'react'
import logo from '../assets/chat-app-logo.jpg'

const AuthLayout = ({children}) => {
  return (
    <>
        <header className='bg-white flex justify-center items-center py-3 h-20 shadow-md'> 
            <img src={logo} width={100} height={60} alt="" />
        </header>
        {
            children
        }
        
    </>
  )
}

export default AuthLayout
