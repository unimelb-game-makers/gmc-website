import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import games from '@/mock-data/games.json'
import creatorGames from '@/mock-data/creator_games.json'
import creators from '@/mock-data/creators.json'

import { FaSteam, FaYoutube } from 'react-icons/fa'
import { FaItchIo } from 'react-icons/fa'
import { FaExternalLinkAlt } from 'react-icons/fa'


type GamePageProps = {
  params: Promise<{ slug: string }>
}

const gameLinkIcon = (name: string) => {
  const normalizedName = name.toLowerCase()

  if (normalizedName.includes('steam')) {
    return <FaSteam aria-hidden />
  }

  if (normalizedName.includes('itch')) {
    return <FaItchIo aria-hidden />
  }

  if (normalizedName.includes('youtube')) {
    return <FaYoutube aria-hidden />
  }

  return <FaExternalLinkAlt aria-hidden />
}

const GamePage = async ({ params }: GamePageProps) => {
  const { slug } = await params
  const game = games.find(({ id }) => id === slug)

  if (!game) {
    notFound()
  }

  const gameCreators = creatorGames
    .filter(({ game_id }) => game_id === game.id)
    .map((credit) => ({
      ...credit,
      creator: creators.find(({ id }) => id === credit.creator_id),
    }))
    .filter((credit) => credit.creator)

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#252525] px-5 pb-20 pt-40 text-black sm:px-10 sm:pt-44 lg:px-16">
      <h1 className="text-center font-arsenica text-4xl font-extrabold text-white sm:text-5xl">
        {game.name}
      </h1>

      <section className="mx-auto mt-9 max-w-7xl overflow-hidden rounded-br-[32px] bg-gmc-cream">
        <div className="flex min-h-[500px]">

          <div className="w-4 shrink-0 bg-[#f1774d] sm:w-8 lg:w-12" />

          <div className="grid flex-1 gap-10 px-5 py-8 lg:grid-cols-2 lg:px-12 lg:pt-8 lg:pb-8">
            
            {/* LEFT */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#d9d9d9]">
                {game.thumbnail ? (
                  <Image
                    src={game.thumbnail}
                    alt={`${game.name} thumbnail`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-karla text-neutral-600">
                    No image available
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-xl bg-[#d9d9d9]">
                    <Image
                      src={screenshot}
                      alt={`${game.name} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-auto flex gap-3 pt-6 lg:-mb-4 lg:-mr-8">
                {game.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${game.name} on ${link.name}`}
                    title={link.name}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white transition hover:-translate-y-1 hover:scale-105"
                  >
                    {gameLinkIcon(link.name)}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col">
              <div>
                <p className="font-karla text-base font-medium leading-relaxed">
                  {game.description}
                </p>
              </div>

              <div className="mt-10">
                <p className="font-karla font-medium text-base">
                  <span className="font-semibold">Tags:</span>{' '}
                  {game.tags.join(', ')}
                </p>

                <p className="mt-4 font-karla font-medium text-base">
                  {game.event}
                </p>
              </div>

              <div className="mt-auto flex items-end justify-end gap-3 pt-10 lg:-mb-4 lg:-mr-8">
                <span className="font-karla font-semibold text-base">
                  Made By: 
                </span>

                <div className="flex">
                  {gameCreators.map((credit, index) => {
                    const creator = credit.creator!

                    const profileImage = creator.picture?.includes('example.com')
                      ? '/images/gmc_site_avatar.png'
                      : creator.picture || '/images/gmc_site_avatar.png'

                    return (
                      <Link
                        key={creator.id}
                        href={`/gallery/creator/${creator.id}`}
                        title={`${creator.name} - ${credit.role}`}
                        style={{ zIndex: gameCreators.length - index }}
                        className={`
                          relative h-12 w-12 overflow-hidden rounded-full 
                          border-2 border-gmc-teal-dark 
                          transition-transform 
                          hover:!z-[999] hover:-translate-y-1 hover:scale-105
                          lg:h-20 lg:w-20
                          ${index === 0 ? '' : '-ml-2 lg:-ml-8'}
                        `}
                      >
                        <Image
                          src={profileImage}
                          alt={creator.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default GamePage
