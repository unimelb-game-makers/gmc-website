import React from 'react'
import ThreeJSBanner from './three_js_banner'
import fs from 'fs'
import path from 'path'

const HeroBanner = () => {
  const dir = path.join(process.cwd(), 'public', 'images', 'games_examples')
  const images = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map(f => `/images/games_examples/${f}`)

  return (
    <div className="relative bg-[#161616] pt-30">
        {/* Three.js background */}
        <ThreeJSBanner images={images} />

        {/* Overlay content */}
        <div className="mt-5 absolute inset-0 flex items-center pointer-events-none">
            <div className="ml-15 md:ml-30 pointer-events-auto">
                <h1 className="text-5xl md:text-8xl font-bold font-akira text-gmc-orange leading-tight drop-shadow-[6px_6px_0_#245760]">
                    GAME<br />
                    MAKER&apos;S<br />
                    CLUB
                </h1>
                <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/">
                    <button className="mt-8 px-8 sm:px-15 py-3 bg-gmc-cream text-gmc-teal font-extrabold font-arsenica text-3xl sm:text-4xl rounded-tr-xl rounded-bl-xl transition-all duration-200 hover:text-gmc-teal-dark hover:scale-105 cursor-pointer">
                        JOIN NOW
                    </button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner