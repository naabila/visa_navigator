import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-lightBlue/10">
     <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
       Oops!
     </h1>
     <p className="text-2xl font-semibold text-gray-700 mt-4">404 - PAGE NOT FOUND</p>
     <p className="text-gray-500 mt-2 text-center max-w-md">
       The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
     </p>
     <Link href="/" className="btn btn-primary mt-6">
       Go to Homepage
     </Link>
   </div>
   </>
  )
}

export default Error