import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const navItems = [
        { name: "Events", path: '/events/'},
        { name: "About", path: '/about/'},
        { name: "Blog", path: '/blog/'},
        { name: "Contact", path: '/contact/'},
    ]
    
  return (
    <div className='flex items-center justify-between p-[30px] bg-[#1A2223] w-[1280px] h-[142px]'>
        {/* logo area */}
        <div className='flex items-center space-x-3'>
            <Image src='/gmc_logo.png' alt='gmc_logo' width={80} height={80} />
        </div>
        <div className='flex items-center overflow-hidden'>
            {navItems.map(({name, path}, idx) => (
                <Link key={name} href={path} className='px-[22px] py-[30px] text-[#F7F6F3] text-[32px] font-karla'>
                    {name}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Header