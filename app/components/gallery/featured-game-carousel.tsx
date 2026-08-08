"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

export type GalleryCreator = {
  name: string
  picture: string
  about: string
}

export type GalleryGame = {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  creators: GalleryCreator[]
}

type FeaturedGameCarouselProps = {
  games: GalleryGame[]
  intervalMs?: number
}

const toRouteSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const FeaturedGameCarousel = ({
  games,
  intervalMs = 4500,
}: FeaturedGameCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (games.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % games.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [games.length, intervalMs])

  const visibleGames = useMemo(() => {
    if (games.length === 0) {
      return []
    }

    return [-1, 0, 1].map((offset) => {
      const index = (activeIndex + offset + games.length) % games.length

      return {
        game: games[index],
        offset,
      }
    })
  }, [activeIndex, games])

  if (games.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl bg-black/40 text-white">
        No featured games available.
      </div>
    )
  }

  const activeGame = games[activeIndex]
  const activeGameDetails = [activeGame.description, ...activeGame.tags].join(', ')

  return (
    <div className="relative mx-auto flex min-h-[240px] w-full max-w-6xl flex-col items-center justify-center py-2 sm:min-h-[320px] lg:min-h-[400px]">
      <div className="relative h-[230px] w-full max-w-6xl sm:h-[300px] lg:h-[380px]">
        {visibleGames.map(({ game, offset }) => {
          const isActive = offset === 0
          const positionClass = isActive
            ? 'left-1/2 top-3 z-20 w-[68%] max-w-[800px] -translate-x-1/2 scale-100 opacity-100 shadow-2xl sm:top-4'
            : offset < 0
              ? 'left-0 top-8 z-10 w-[58%] translate-x-0 scale-95 opacity-85 sm:top-16'
              : 'right-0 top-8 z-10 w-[58%] translate-x-0 scale-95 opacity-85 sm:top-16'

          return (
            <article
              className={`absolute aspect-[2/1] overflow-hidden rounded-md bg-black transition-all duration-700 ${positionClass}`}
              key={`${game.name}-${offset}`}
            >
              <Link
                aria-label={`Open ${game.name}`}
                className="absolute inset-0 z-10"
                href={`/gallery/games/${toRouteSlug(game.name)}`}
              />
              <Image
                src={game.thumbnail}
                alt=""
                fill
                sizes={isActive ? '(min-width: 1024px) 800px, 68vw' : '(min-width: 1024px) 680px, 58vw'}
                className="object-cover"
                priority={isActive}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              {isActive && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-3 text-white sm:p-4">
                  <div className="min-w-0">
                    <h2 className="font-arsenica text-3xl font-bold leading-none text-white sm:text-5xl">
                      {game.name}
                    </h2>
                    <p className="mt-3 text-xs font-bold text-white sm:text-base">
                      {activeGameDetails}
                    </p>
                  </div>
                  <div className="pointer-events-auto flex shrink-0 flex-row-reverse items-center">
                    {game.creators.map((creator, index) => (
                      <Link
                        aria-label={`Open ${creator.name}`}
                        className="-ml-2 rounded-full border-2 border-gmc-teal bg-gmc-teal p-0.5 first:ml-0 sm:border-[3px]"
                        href={`/gallery/creator/${toRouteSlug(creator.name)}`}
                        key={`${creator.name}-${index}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-black sm:h-[52px] sm:w-[52px]">
                          <Image
                            src={creator.picture}
                            alt={`${creator.name} profile picture`}
                            fill
                            sizes="52px"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturedGameCarousel
