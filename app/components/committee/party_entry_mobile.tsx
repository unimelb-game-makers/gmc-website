import React from 'react'
import Image from 'next/image'

interface PartyEntryMobileProps {
  name: string
  role: string
  image?: string
  onClick?: () => void
  selected?: boolean
}

const PartyEntryMobile = ({ name, image, onClick, selected }: PartyEntryMobileProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-2xl border-4 overflow-hidden w-22 transition-colors duration-200 ${
        selected ? 'border-gmc-teal' : 'border-gmc-teal-dark'
      }`}
    >
      <div className="w-full aspect-square bg-gmc-cream overflow-hidden">
        <Image
          src={image || '/images/cat.jpg'}
          alt={name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
    </button>
  )
}

export default PartyEntryMobile
