import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BiLoaderAlt } from 'react-icons/bi'

interface PartyEntryMobileProps {
  name: string
  role: string
  image?: string
  onClick?: () => void
  selected?: boolean
}

const PartyEntryMobile = ({ name, image, onClick, selected }: PartyEntryMobileProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [image]);

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-2xl border-4 overflow-hidden w-22 transition-colors duration-200 ${selected ? 'border-gmc-teal' : 'border-gmc-teal-dark'
        }`}
    >
      <div className="relative w-full aspect-square bg-gmc-cream overflow-hidden flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 text-gmc-teal">
            <BiLoaderAlt className="w-5 h-5 animate-spin" />
          </div>
        )}
        <Image
          src={image || '/images/cat.jpg'}
          alt={name}
          width={80}
          height={80}
          sizes="80px"
          unoptimized
          onLoad={() => setIsLoading(false)}
          className={`object-cover w-full h-full transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
    </button>
  )
}

export default PartyEntryMobile
