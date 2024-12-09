import React, { useContext } from 'react'
import { AuthContext } from '../firebase/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({children}) {
    const{user,loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(user){
        return children
    }
  return (
    <>
        <Navigate state={location.pathname} to='/login'></Navigate>
    </>
  )
}

export default PrivateRoute