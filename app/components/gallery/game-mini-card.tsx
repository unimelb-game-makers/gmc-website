import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { type GalleryGame } from './featured-game-carousel'

const toRouteSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const GameMiniCard = ({ game }: { game: GalleryGame }) => {
  return (
    <Link
      href={`/gallery/games/${toRouteSlug(game.name)}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-md bg-black shadow-lg"
    >
      <Image
        src={game.thumbnail}
        alt={game.name}
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-arsenica text-lg font-bold text-white sm:text-xl">{game.name}</h3>
      </div>
    </Link>
  )
}

export default GameMiniCard
