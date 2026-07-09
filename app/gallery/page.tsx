import React from 'react'

import FeaturedGameCarousel, { type GalleryGame } from '../components/gallery/featured-game-carousel'

const galleryGames: GalleryGame[] = [
  {
    name: 'Anatis',
    description: '2025 Mid Sem Winner',
    thumbnail: '/images/games_examples/game27.png',
    tags: ['Puzzle', 'Casual', 'Fantasy'],
    creators: [
      {
        name: 'GMC Artist',
        picture: '/images/gmc_site_avatar.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
      {
        name: 'GMC Programmer',
        picture: '/images/gmc-cat.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Cassidy Dungeon',
    description: 'Winter Jam 2026',
    thumbnail: '/images/games_examples/game1.png',
    tags: ['Dungeon', 'Pixel', 'Action'],
    creators: [
      {
        name: 'GMC Designer',
        picture: '/images/gmc-cat-whiteboard.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Clockwork Orbit',
    description: 'GMC x CISSA 2026',
    thumbnail: '/images/games_examples/game25.png',
    tags: ['Arcade', 'Precision', 'Jam'],
    creators: [
      {
        name: 'GMC Developer',
        picture: '/images/gmc-cat-mail.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Eye Bloom',
    description: '2025 Showcase',
    thumbnail: '/images/games_examples/game7.png',
    tags: ['Experimental', 'Art', 'Casual'],
    creators: [
      {
        name: 'GMC Illustrator',
        picture: '/images/committee.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
]

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-[#252525] px-4 pb-20 pt-44 sm:px-8 sm:pt-48 lg:px-12">
      <h1 className="mx-auto max-w-6xl text-center font-akira text-3xl font-extrabold tracking-wide text-white drop-shadow-teal sm:text-5xl lg:text-6xl">
        GMC GAMES GALLERY
      </h1>

      <section className="mx-auto mt-8 max-w-7xl">
        <FeaturedGameCarousel games={galleryGames} intervalMs={4500} />
      </section>
    </main>
  )
}

export default GalleryPage
