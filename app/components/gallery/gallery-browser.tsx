"use client"

import React, { useDeferredValue, useState } from 'react'

import { type GalleryGame } from './featured-game-carousel'
import GameMiniCard from './game-mini-card'

const hashValue = (value: string) => {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

const pickDefaultTagGames = (games: GalleryGame[], tagName: string) => {
  const orderedGames = [...games].sort(
    (leftGame, rightGame) =>
      hashValue(`${tagName}-${leftGame.name}`) - hashValue(`${tagName}-${rightGame.name}`)
  )
  const displayCount = games.length >= 8 ? 8 : Math.min(4, games.length)

  return orderedGames.slice(0, displayCount)
}

const GalleryBrowser = ({ games }: { games: GalleryGame[] }) => {
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const availableTags = Array.from(new Set(games.flatMap((game) => game.tags))).sort((leftTag, rightTag) =>
    leftTag.localeCompare(rightTag)
  )

  const hasActiveFilters = deferredQuery.length > 0 || selectedTags.length > 0
  const matchingGames = games.filter((game) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      game.name.toLowerCase().includes(deferredQuery) ||
      game.description.toLowerCase().includes(deferredQuery) ||
      game.tags.some((tag) => tag.toLowerCase().includes(deferredQuery)) ||
      game.creators.some((creator) => creator.name.toLowerCase().includes(deferredQuery))
    const matchesTags = selectedTags.every((tag) => game.tags.includes(tag))

    return matchesQuery && matchesTags
  })

  const groupedGames = games.reduce<Record<string, GalleryGame[]>>((groups, game) => {
    game.tags.forEach((tag) => {
      if (!groups[tag]) {
        groups[tag] = []
      }

      groups[tag].push(game)
    })

    return groups
  }, {})

  const defaultSections = Object.entries(groupedGames)
    .sort(([leftTag], [rightTag]) => leftTag.localeCompare(rightTag))
    .map(([tagName, tagGames]) => ({
      tagName,
      games: pickDefaultTagGames(tagGames, tagName),
    }))

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag]
    )
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 overflow-hidden rounded-[1.5rem] bg-[#9B9B9B] shadow-lg">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search games, events, tags, or creators"
            className="w-full bg-transparent px-6 py-4 font-tasa-orbiter text-base font-semibold text-neutral-900 outline-none placeholder:text-neutral-600"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gmc-teal-dark transition-colors hover:bg-gmc-cream"
          aria-label="Toggle filters"
        >
          <span className="block h-6 w-6 [clip-path:polygon(0_0,100%_0,62%_42%,62%_100%,38%_100%,38%_42%)] bg-current" />
        </button>
      </div>

      {isFilterOpen && (
        <div className="mx-auto flex max-w-5xl overflow-hidden rounded-sm bg-gmc-cream shadow-lg">
          <div className="flex w-16 shrink-0 items-center justify-center bg-gmc-teal-dark px-2 py-4">
            <span className="font-arsenica text-4xl font-bold tracking-wide text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
              FILTER
            </span>
          </div>

          <div className="flex-1 px-6 py-4">
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)

                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-4 py-1.5 font-tasa-orbiter text-sm font-semibold transition-colors ${
                      isSelected ? 'bg-gmc-teal-dark text-white' : 'bg-[#B6B6B6] text-neutral-800 hover:bg-[#A8A8A8]'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-akira text-2xl text-white sm:text-3xl">RESULTS</h2>
            <p className="font-tasa-orbiter text-sm text-neutral-300">
              {matchingGames.length} game{matchingGames.length === 1 ? '' : 's'}
            </p>
          </div>

          {matchingGames.length === 0 ? (
            <div className="rounded-md border border-dashed border-gmc-teal-light/40 px-6 py-10 text-center font-tasa-orbiter text-neutral-300">
              No games match the current search and filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {matchingGames.map((game) => (
                <GameMiniCard key={`${game.description}-${game.name}`} game={game} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {defaultSections.map(({ tagName, games: tagGames }) => (
            <section key={tagName} className="space-y-4">
              <h2 className="text-center font-tasa-orbiter text-3xl font-extrabold text-white sm:text-4xl">
                {tagName}
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {tagGames.map((game) => (
                  <GameMiniCard key={`${tagName}-${game.name}`} game={game} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

export default GalleryBrowser
