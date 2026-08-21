"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'

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
}

const toRouteSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const FeaturedGameCarousel = ({ games }: FeaturedGameCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % games.length)
  }

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + games.length) % games.length)
  }

  const handlePointerDown = (event: React.PointerEvent) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: React.PointerEvent) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null

    if (!start || games.length <= 1) {
      return
    }

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    const SWIPE_THRESHOLD = 40

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) {
      return
    }

    if (deltaX < 0) {
      goToNext()
    } else {
      goToPrevious()
    }
  }

  const slides = useMemo(() => {
    const total = games.length

    if (total === 0) {
      return []
    }

    return games
      .map((game, index) => {
        const raw = index - activeIndex
        const wrapped = ((raw % total) + total) % total
        const offset = wrapped > total / 2 ? wrapped - total : wrapped

        return { game, index, offset }
      })
      .filter(({ offset }) => Math.abs(offset) <= 1)
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
      <div
        className="relative h-[230px] w-full max-w-6xl touch-pan-y select-none sm:h-[300px] lg:h-[380px]"
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {slides.map(({ game, index, offset }) => {
          const isActive = offset === 0
          const positionClass = isActive
            ? 'top-3 z-20 w-[68%] max-w-[800px] opacity-100 shadow-2xl sm:top-4'
            : 'top-8 z-10 w-[58%] opacity-85 sm:top-16'
          // Every slide is anchored at the same `left: 50%` and positioned purely via
          // `transform: translateX(...)`, so the animation only ever changes one
          // property. Anchoring left/right neighbors with `left-0`/`right-0` instead
          // would switch CSS properties between center <-> side transitions, which
          // cannot be interpolated and causes the position to snap instead of slide.
          const translateX = isActive ? -50 : offset < 0 ? -86.2069 : -13.7931
          const scale = isActive ? 1 : 0.95

          return (
            <article
              className={`absolute left-1/2 aspect-[2/1] overflow-hidden rounded-md bg-black transition-all duration-700 ${positionClass}`}
              key={`slide-${index}`}
              style={{ transform: `translateX(${translateX}%) scale(${scale})` }}
            >
              {isActive ? (
                <Link
                  aria-label={`Open ${game.name}`}
                  className="absolute inset-0 z-10"
                  href={`/gallery/games/${toRouteSlug(game.name)}`}
                />
              ) : (
                <button
                  aria-label={`Show ${game.name}`}
                  className="absolute inset-0 z-10"
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              )}
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
