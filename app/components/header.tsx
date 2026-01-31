"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
        { name: "About", path: '/about/'},
        { name: "Events", path: '/events/'},
        { name: "Education", path: '/education/'},
        { name: "Contact", path: '/contact/'},
        { name: "Committee", path: '/committee/'}
    ];

  return (
    <nav className='w-full flex justify-center mt-12 mb-8'>
        <div className='relative flex items-center w-11/12'>
            {/* Logo positioned in front of navbar */}
            <Link href='/' className='absolute -left-12 z-10'>
                <div className='bg-[#D9D9D9] rounded-tr-4xl rounded-bl-4xl rounded-br-4xl p-1'>
                    <Image src='/gmc_logo.png' alt='gmc_logo' width={120} height={120} />
                </div>
            </Link>

            {/* Navbar spanning full width with links on the right */}
            <div className='w-full flex items-center justify-end pl-36 pr-6 py-3 bg-gmc-teal-dark rounded-3xl shadow-md'>
            {/* Desktop Navbar */}
            <div className='hidden lg:flex items-center'>
                {navItems.map(({name, path}, idx) => (
                    <React.Fragment key={name}>
                        {idx > 0 && <span className='text-white-500'>|</span>}
                        <Link
                            href={path}
                            className='px-4 py-2 text-white transition-colors duration-200 hover:text-orange-300 font-tasa-orbiter font-bold text-2xl'
                        >
                            {name}
                        </Link>
                    </React.Fragment>
                ))}
            </div>

            {/* Mobile Hamburger Icon Navbar */}
            <div className='lg:hidden'>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-white focus:outline-none'>
                    <HiMenu className='w-10 h-10 transition-colors duration-200 hover:text-teal-300' />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className='lg:hidden absolute top-full right-0 w-48 bg-[#2d3436] border border-gray-600 rounded-md shadow-lg z-10 flex flex-col'>
                    {navItems.map(({ name, path }) => (
                        <Link key={name} href={path} className='block px-4 py-2 text-sm text-white hover:bg-gray-700' onClick={() => setIsMenuOpen(false)}>
                            {name}
                        </Link>
                    ))}
                </div>
            )}
            </div>
        </div>
    </nav>
  );
};

export default Header;
