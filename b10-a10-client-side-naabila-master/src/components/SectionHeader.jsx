import React, { useContext } from 'react'
import { AuthContext } from '../firebase/AuthProvider'
import { Fade } from 'react-awesome-reveal'

function SectionHeader({title,subTitle}) {
    const{theme}=useContext(AuthContext)
  return (
    <>
        <Fade direction='up'>
        <div className='flex justify-center'>
        <div className='text-center my-10 md:w-1/2 lg:w-1/3'>
            <h2 className={`
            text-4xl
            font-extrabold
            my-3
            ${theme==="dark"?"text-komla":"text-nil"}
            `}>{title}</h2>
            <p className={` ${theme==="dark"?"text-[#fff]":""}`}>{subTitle}</p>
        </div>
        </div>
        </Fade>
    </>
  )
}

export default SectionHeader