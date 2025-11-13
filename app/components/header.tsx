"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
        { name: "Events", path: '/events/'},
        { name: "About", path: '/about/'},
        { name: "Blog", path: '/blog/'},
        { name: "Contact", path: '/contact/'},
        { name: "Committee", path: '/committee/'}
    ];
    
  return (
    <nav className='flex items-center justify-between px-[15px] bg-[#012E65] w-full relative'>
        <div className='flex items-center space-x-3 py-[15px]'>
            <Image src='/gmc_logo.png' alt='gmc_logo' width={80} height={80} />
        </div>
        
        {/* Desktop Navbar */}
        <div className='hidden lg:flex items-center overflow-hidden'>
            {navItems.map(({name, path}, idx) => (
                <Link key={name} href={path} className='px-[22px] py-[15px] text-[#F7F6F3] text-[24px] font-karla transition-colors duration-200 hover:text-blue-300'>
                    {name}
                </Link>
            ))}
        </div>

        {/* Mobile Hamburger Icon Navbar */}
        <div className='lg:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-[#F7F6F3] focus:outline-none mt-4'>
                <HiMenu className='w-10 h-10 transition-colors duration-200 hover:text-blue-300' />
            </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
            <div className='lg:hidden absolute top-full right-0 w-48 bg-[#012E65] border border-black rounded-md shadow-lg z-10 flex flex-col'>
                {navItems.map(({ name, path }) => (
                    <Link key={name} href={path} className='block px-4 py-2 text-sm text-[#F7F6F3] hover:bg-blue-800' onClick={() => setIsMenuOpen(false)}>
                        {name}
                    </Link>
                ))}
            </div>
        )}
    </nav>
  );
};

export default Header;
