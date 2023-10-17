import React from 'react'
import { MdSearch } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({ type }) => {

    const navigate = useNavigate();

    const user = localStorage.getItem("email");

    const handleClick = (e) =>{
        e.preventDefault();
        localStorage.removeItem("email");
        localStorage.removeItem("token");

        navigate(0);
    }

  return (
    <div className="container mx-auto flex flex-wrap p-[15px] px-10 flex-col md:flex-row items-center z-50">
           <a className="flex items-center z-50">
               <img className="w-[120px]" src={"/logo.png"} alt="Logo" />
           </a>
           <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
               {user && <a className="text-base mr-5 text-gray-100 cursor-pointer ">Home</a> }
               <a className="text-base mr-5 text-gray-100 cursor-pointer ">Story</a>
               <a className="text-base mr-5 text-gray-100 cursor-pointer ">Gallery</a>
               <a className="text-base mr-5 text-gray-100 cursor-pointer ">Contact Us</a>
               {user && <a className="text-base mr-5 text-gray-100 cursor-pointer " onClick={handleClick}>Logout</a>}
           </nav>
           <div className='flex mt-4 md:mt-0'>
               <MdSearch size={25} color='#fff' className='cursor-pointer hidden lg:block' />
               {/* <img src={profile} /> */}
           </div>
       </div>
  )
}

export default Navbar