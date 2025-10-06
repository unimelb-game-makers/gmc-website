import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex justify-center space-x-[15px] p-[30px] bg-[#012E65] w-full h-[100px] font-karla'>
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
  )
}

export default Footer