import React from 'react'
import Logo from './assets/logoSGC.jpeg'

const navbar = () => {
  return (
    <>
      {/* component */}
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-betwee px-[4rem] py-02 h-[8rem]">
        {/* logo */}
        <img
        src={Logo}
        className='w-[7%] m-[1rem]'
        />
        {/* navigation */}
        <div className='flex justify-center w-full'>
        <nav className="nav font-semibold text-lg">
          <ul className="flex items-center">
            <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer active">
              <a href>Form</a>
            </li>
            <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
              <a href>Report</a>
            </li>
            <li className="p-[1.75rem] border-b-2 text-[1.65rem]  border-blue-800 border-opacity-0 hover:border-opacity-100 hover:text-blue-800 duration-200 cursor-pointer">
              <a href>Debugging</a>
            </li>
          </ul>
        </nav>
        </div>
        {/* buttons -*/}
        
      </header>
    </>
  );
}

export default navbar