import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex space-x-[15px] p-[30px] bg-[#163B50] w-[1280px] h-[130px]'>
        {/* logo area */}
        <div className='flex'>
            <Image src='/gmc_logo.png' alt='gmc_logo' width={72} height={72} />
        </div>
        <div className='flex'>
            <Image src='/gmc_logo.png' alt='gmc_logo' width={72} height={72} />
        </div>
    </div>
  )
}

export default Footer