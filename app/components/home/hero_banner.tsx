import React from 'react'
import ThreeJSBanner from './three_js_banner'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className="relative">
        {/* Three.js background */}
        <ThreeJSBanner />

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="ml-15 md:ml-30 pointer-events-auto">
                <h1 className="text-5xl md:text-8xl font-bold font-akira text-gmc-orange leading-tight drop-shadow-[6px_6px_0_#245760]">
                    GAME<br />
                    MAKER'S<br />
                    CLUB
                </h1>
                <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/">
                    <button className="mt-8 px-15 py-3 bg-gmc-cream text-gmc-teal font-bold font-arsenica text-4xl transition-colors rounded-tr-xl rounded-bl-xl">
                        JOIN NOW
                    </button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner