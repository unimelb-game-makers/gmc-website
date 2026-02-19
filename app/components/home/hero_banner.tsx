import React from 'react'
import ThreeJSBanner from './three_js_banner'

const HeroBanner = () => {
  return (
    <div className="relative bg-[#161616] pt-30">
        {/* Three.js background */}
        <ThreeJSBanner />

        {/* Overlay content */}
        <div className="mt-5 absolute inset-0 flex items-center pointer-events-none">
            <div className="ml-15 md:ml-30 pointer-events-auto">
                <h1 className="text-5xl md:text-8xl font-bold font-akira text-gmc-orange leading-tight drop-shadow-[6px_6px_0_#245760]">
                    GAME<br />
                    MAKER&apos;S<br />
                    CLUB
                </h1>
                <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/">
                    <button className="mt-8 px-15 py-3 bg-gmc-cream text-gmc-teal font-extrabold font-arsenica text-4xl rounded-tr-xl rounded-bl-xl transition-all duration-200 hover:text-gmc-teal-dark hover:scale-105 cursor-pointer">
                        JOIN NOW
                    </button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner