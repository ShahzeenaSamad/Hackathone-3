import Image from 'next/image'
import React from 'react'
import full from "../../../public/full.png"

export default function ProductDetail() {
  return (
    <div className='w-[1440px] h-auto relative'>
      <div className='w-[1200px] h-auto ml-0 mt-12'>
      <Image src={full} alt="image" width={1200} height={1125}/>
      </div>
         
    </div>
  )
}
