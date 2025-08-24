import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const navItems = [
        { name: "Home", path: '/'},
        { name: "Events", path: '/events/'},
        { name: "About", path: '/about/'},
        { name: "Gallery", path: '/gallery/'},
        { name: "Education", path: '/education/'},
        { name: "Contact", path: '/contact/'},
        { name: "Committee", path: '/committee/'},
    ]

  return (
    <nav className='flex items-center justify-between px-6 py-3 bg-blue-900'>
        {/* logo area */}
        <div className='flex items-center space-x-3'>
            <Image src='/gmc_logo.png' alt='gmc_logo' width={40} height={40} />
        </div>
        <span className='text-xl font-semibold'>Unimelb Game Makers' Club</span>
        <div className='flex items-center border border-black rounded-xl overflow-hidden text-sm font-medium'>
            {navItems.map(({name, path}, idx) => (
                <Link key={name} href={path} className='px-4 py-1.5 border-1 border-black first:border-1-0'>
                    {name}
                </Link>
            ))}
        </div>
    </nav>
  )
}

export default Navbar