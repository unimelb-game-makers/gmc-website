import React from 'react'

import FeaturedGameCarousel, { type GalleryGame } from '../components/gallery/featured-game-carousel'
import GalleryBrowser from '../components/gallery/gallery-browser'
import { getGames } from '@/services/games-gallery/game.service'
import { getFeaturedTags } from '@/services/games-gallery/tag.service'

const FEATURED_GAME_COUNT = 4

const pickRandomGames = (games: GalleryGame[], count: number) => {
  const shuffled = [...games]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled.slice(0, count)
}

const GalleryPage = async () => {
  const games = await getGames()
  const featuredTags = await getFeaturedTags()
  const featuredGames = pickRandomGames(games, FEATURED_GAME_COUNT)

  return (
    <main className="min-h-screen bg-[#252525] px-4 pb-20 pt-44 sm:px-8 sm:pt-48 lg:px-12">
      <h1 className="mx-auto max-w-6xl text-center font-akira text-3xl font-extrabold tracking-wide text-white drop-shadow-teal sm:text-5xl lg:text-6xl">
        GMC GAMES GALLERY
      </h1>

      <section className="mx-auto mt-8 max-w-7xl">
        <FeaturedGameCarousel games={featuredGames} />
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <GalleryBrowser games={games} featuredTags={featuredTags} />
      </section>
    </main>
  )
}

export default GalleryPage
