import { useState } from 'react';
import './App.css';
import logo from "../src/assets/dictionary.png"
import github from "../src/assets/github.png"

function App() {

  return (
    <div className='font-sans overflow-x-hidden min-h-screen'>
      <div className='flex lg:justify-between px-2 shadow-sm items-center'>
        <img alt='logo' src={logo} className='size-7 md:size-10 lg:size-7'/>
        <p className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold'>Pen-Ultman</p>
        <div className='hidden lg:flex items-center gap-x-2 group translate-y-2'>
          <p className='opacity-0 -z-10 translate-x-[100px] group-hover:translate-none group-hover:opacity-100 font-serif transition-all duration-500 ease-in-out'>
            Follow Me 
            </p>
          <img alt='github logo' src={github} className='lg:size-7 bg-black/30 animate-bounce github'/>
        </div>
      </div>
    </div>
  )
}

export default App
