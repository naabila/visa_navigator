import React from 'react'
import { Fade } from "react-awesome-reveal";
import bannerImage from "../assets/bannerBg.png"
function PageBanner({title}) {
  return (
    <>
      
      <div
        style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundPosition:'center center'
         }}
        className="bg-cover bg-center h-80 flex items-center justify-center"
        >
      <Fade direction='up'>
        <h2 className='text-[#fff] font-bold text-3xl'>{title}</h2>
      </Fade>
      </div>
      
    </>
  )
}

export default PageBanner