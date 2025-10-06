import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex justify-between space-x-[15px] p-[10px] bg-[#012E65] w-full h-[100px] font-karla'>
      <div className='flex p-[10px] items-center'>
        {/* Our Logo */}
        <a href="/" className='mx-2'>
          <Image src="/gmc_logo.png" alt="gmc_logo" width={80} height={80}/>
        </a>
        {/* UMSU */}
        <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/">
          <Image src="/icons/umsu_clubs.svg" alt="umsu" width={40} height={40} className='w-auto h-12'/>
        </a>
      </div>
      <div className='flex space-x-[15px] p-[20px]'>
        {/* logo area */}
        <a href="https://www.instagram.com/gmc.unimelb/">
          <Image src="/icons/instagram.png" alt="instagram" width={40} height={40} />
        </a>
        <a href="https://gmcunimelb.itch.io/">
          <Image src="/icons/itch.svg" alt="itch" width={40} height={40} />
        </a>
        <a href="http://discord.gg/NQEnBhsEGG">
          <Image src="/icons/discord.svg" alt="discord" width={40} height={40} />
        </a>
        <a href="https://www.linkedin.com/company/unimelb-game-makers-club/">
          <Image src="/icons/linkedin.png" alt="linkedin" width={40} height={40} />
        </a>
      </div>
    </div>
  )
}

export default Footer