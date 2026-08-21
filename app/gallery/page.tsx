import React from 'react'

import FeaturedGameCarousel, { type GalleryGame } from '../components/gallery/featured-game-carousel'
import GalleryBrowser from '../components/gallery/gallery-browser'

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
    name: 'Neon Relay',
    description: '2025 Mid Sem Winner',
    thumbnail: '/images/games_examples/game2.png',
    tags: ['Arcade', 'Speed', 'Sci-Fi'],
    creators: [
      {
        name: 'GMC Designer',
        picture: '/images/gmc-cat-whiteboard.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Petal Shift',
    description: '2025 Mid Sem Winner',
    thumbnail: '/images/games_examples/game3.png',
    tags: ['Strategy', 'Fantasy', 'Card'],
    creators: [
      {
        name: 'GMC Illustrator',
        picture: '/images/committee.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Velvet Zero',
    description: '2025 Mid Sem Winner',
    thumbnail: '/images/games_examples/game4.png',
    tags: ['Action', 'Sci-Fi', 'Boss Rush'],
    creators: [
      {
        name: 'GMC Developer',
        picture: '/images/gmc-cat-mail.png',
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
    name: 'Frostbyte Sprint',
    description: 'Winter Jam 2026',
    thumbnail: '/images/games_examples/game5.png',
    tags: ['Platformer', 'Winter', 'Arcade'],
    creators: [
      {
        name: 'GMC Artist',
        picture: '/images/gmc_site_avatar.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Lantern Loop',
    description: 'Winter Jam 2026',
    thumbnail: '/images/games_examples/game6.png',
    tags: ['Puzzle', 'Cozy', 'Adventure'],
    creators: [
      {
        name: 'GMC Programmer',
        picture: '/images/gmc-cat.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Snowglobe Signal',
    description: 'Winter Jam 2026',
    thumbnail: '/images/games_examples/game7.png',
    tags: ['Narrative', 'Winter', 'Mystery'],
    creators: [
      {
        name: 'GMC Developer',
        picture: '/images/gmc-cat-mail.png',
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
    name: 'Wireframe Run',
    description: 'GMC x CISSA 2026',
    thumbnail: '/images/games_examples/game16.png',
    tags: ['Racing', 'Sci-Fi', 'Multiplayer'],
    creators: [
      {
        name: 'GMC Programmer',
        picture: '/images/gmc-cat.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Switchblade Garden',
    description: 'GMC x CISSA 2026',
    thumbnail: '/images/games_examples/game18.png',
    tags: ['Action', 'Fantasy', 'Co-op'],
    creators: [
      {
        name: 'GMC Illustrator',
        picture: '/images/committee.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Echo Cabinet',
    description: 'GMC x CISSA 2026',
    thumbnail: '/images/games_examples/game19.png',
    tags: ['Horror', 'Mystery', 'Puzzle'],
    creators: [
      {
        name: 'GMC Artist',
        picture: '/images/gmc_site_avatar.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Eye Bloom',
    description: '2025 Showcase',
    thumbnail: '/images/games_examples/game20.png',
    tags: ['Experimental', 'Art', 'Casual'],
    creators: [
      {
        name: 'GMC Illustrator',
        picture: '/images/committee.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Cardboard Crown',
    description: '2025 Showcase',
    thumbnail: '/images/games_examples/game21.png',
    tags: ['Adventure', 'Comedy', 'Card'],
    creators: [
      {
        name: 'GMC Designer',
        picture: '/images/gmc-cat-whiteboard.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Moon Static',
    description: '2025 Showcase',
    thumbnail: '/images/games_examples/game23.png',
    tags: ['Sci-Fi', 'Narrative', 'Exploration'],
    creators: [
      {
        name: 'GMC Programmer',
        picture: '/images/gmc-cat.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
  {
    name: 'Prism Patrol',
    description: '2025 Showcase',
    thumbnail: '/images/games_examples/game24.png',
    tags: ['Shooter', 'Arcade', 'Color'],
    creators: [
      {
        name: 'GMC Artist',
        picture: '/images/gmc_site_avatar.png',
        about: 'A featured student from Game Maker\'s Club.',
      },
    ],
  },
]

const featuredGames = galleryGames.slice(0, 4)

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-[#252525] px-4 pb-20 pt-44 sm:px-8 sm:pt-48 lg:px-12">
      <h1 className="mx-auto max-w-6xl text-center font-akira text-3xl font-extrabold tracking-wide text-white drop-shadow-teal sm:text-5xl lg:text-6xl">
        GMC GAMES GALLERY
      </h1>

      <section className="mx-auto mt-8 max-w-7xl">
        <FeaturedGameCarousel games={featuredGames} />
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <GalleryBrowser games={galleryGames} />
      </section>
    </main>
  )
}

export default GalleryPage
