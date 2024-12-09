import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../firebase/AuthProvider'
import { Tooltip } from 'react-tooltip'
import Lottie from "lottie-react";
import compass from "../../src/assets/lotties/Compass.json";
import { FaRegMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
function Header() {
  const{user,logoutUser,theme, toggleTheme }=useContext(AuthContext);
  
  //Logout User
  const handleSignOut=()=>{
    logoutUser();
  }
  const links=<>
    <NavLink to='/'
    className={({isActive})=>isActive?'text-komla font-semibold':"text-gray-900 font-semibold"}
    >Home</NavLink>
    <NavLink to='/addvisas'
    className={({isActive})=>isActive?'text-komla font-semibold':"text-gray-900 font-semibold"}
    >Add Visa</NavLink>

    <NavLink to='/allvisas'
    className={({isActive})=>isActive?'text-komla font-semibold':"text-gray-900 font-semibold"}
    >All Visa</NavLink>

    <NavLink to='/myvisas'
    className={({isActive})=>isActive?'text-komla font-semibold':"text-gray-900 font-semibold"}
    >My Added Visa</NavLink>

    <NavLink to='/appliedVisas'
    className={({isActive})=>isActive?'text-komla font-semibold':"text-gray-900 font-semibold"}
    >Applyed Visa</NavLink>
    
  </>
  return (
    <>
    <div className="container mx-auto">
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow gap-5 z-50">
       {links}
      </ul>
    </div>
    <Link>
    <div className="flex items-center">
  <Lottie className="h-[70px]" animationData={compass} loop={true} />
  <span className={`text-3xl ${theme==="dark"?'text-white':'text-nil'} font-bold  -ml-2`}>Visa Navigator</span>
</div>
    </Link>
  </div>
  <div className="navbar-center z-50 hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-8">
    {links}
    </ul>
  </div>
  <div className="navbar-end gap-3">
  {user?
   <>
   <img className='h-[50px] w-[50px] rounded-full my-anchor-element' src={user.photoURL} alt="user-image" />
   <Tooltip anchorSelect=".my-anchor-element" place="top">
  {user.displayName}
</Tooltip>
  <button onClick={handleSignOut} className={`btn bg-komla ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
  }`}>Logout</button>
   </>
    :
    <Link to='/login' className={`btn bg-komla ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
  }`}>Login</Link>
    
  }
  
    <Link to='/register' className={`btn bg-komla ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
  }`}>Register</Link>
 {/* Theme Toggle Button */}
 <button
          onClick={toggleTheme}
          className="btn btn-ghost text-lg p-2"
        >
          {theme === "light" ? (
            <FaRegMoon className="text-gray-600" />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>
  </div>
    </div>
    </div>
    </>
  )
}

export default Header