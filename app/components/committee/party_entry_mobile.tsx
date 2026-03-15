import React from 'react'
import LoadingImage from '../shared/loading_image'

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
      className={`flex flex-col items-center rounded-2xl border-4 overflow-hidden w-22 transition-colors duration-200 ${selected ? 'border-gmc-teal' : 'border-gmc-teal-dark'
        }`}
    >
      <div className="relative w-full aspect-square bg-gmc-cream overflow-hidden">
        <LoadingImage
          src={image || '/images/gmc_site_avatar.png'}
          alt={name}
          width={80}
          height={80}
          sizes="80px"
          spinnerSize="w-5 h-5"
          className="object-cover w-full h-full"
        />
      </div>
    </button>
  )
}

export default PartyEntryMobile
