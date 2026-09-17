import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaArtstation, FaExternalLinkAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import creatorGames from '@/mock-data/creator_games.json'
import creatorLinks from '@/mock-data/creator_links.json'
import creators from '@/mock-data/creators.json'
import games from '@/mock-data/games.json'

type CreatorPageProps = {
  params: Promise<{ slug: string }>
}

const gameFallbacks = [
  '/images/games_examples/game27.png',
  '/images/games_examples/game2.png',
  '/images/games_examples/game3.png',
  '/images/games_examples/game4.png',
]

const linkIcon = (name: string) => {
  const normalizedName = name.toLowerCase()

  if (normalizedName.includes('twitter') || normalizedName === 'x') {
    return <FaXTwitter aria-hidden />
  }

  if (normalizedName.includes('artstation')) {
    return <FaArtstation aria-hidden />
  }

  return <FaExternalLinkAlt aria-hidden />
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const { slug } = await params
  const creator = creators.find(({ id }) => id === slug)

  if (!creator) {
    notFound()
  }

  const links = creatorLinks.filter(({ creator_id }) => creator_id === creator.id)
  const credits = creatorGames
    .filter(({ creator_id }) => creator_id === creator.id)
    .map((credit) => ({
      ...credit,
      game: games.find(({ id }) => id === credit.game_id),
    }))
    .filter((credit) => credit.game)

  const profileImage = creator.picture?.includes('example.com')
    ? '/images/gmc_site_avatar.png'
    : creator.picture || '/images/gmc_site_avatar.png'

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#252525] px-5 pb-20 pt-40 text-black sm:px-10 sm:pt-44 lg:px-16">
      <h1 className="text-center font-arsenica text-4xl font-extrabold text-white sm:text-5xl">
        {creator.name}
      </h1>

      <section className="mx-auto mt-9 grid min-h-[500px] max-w-7xl gap-10 rounded-tl-[32px] rounded-br-[32px] bg-gmc-cream px-7 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:gap-16 lg:px-12 lg:py-11">
        <div className="flex min-w-0 flex-col">
          <Image
            src={profileImage}
            alt={`${creator.name}'s profile picture`}
            width={160}
            height={160}
            priority
            className="h-36 w-36 rounded-full border-[5px] border-gmc-teal-dark object-cover sm:h-40 sm:w-40"
          />

          <p className="mt-7 max-w-2xl whitespace-pre-line font-karla text-base leading-relaxed sm:text-lg">
            {creator.about || 'This creator has not added a biography yet.'}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-12">
            {links.map((link, index) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${creator.name}'s ${link.name}`}
                title={link.name}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl text-white transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gmc-teal-dark ${
                  index === 0 ? 'bg-[#ff6262]' : 'bg-black'
                }`}
              >
                {linkIcon(link.name)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-arsenica text-2xl font-bold text-[#252525] lg:sr-only">
            Games by {creator.name}
          </h2>

          {credits.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
              {credits.map((credit, index) => (
                <Link
                  key={credit.id}
                  href={`/gallery/games/${credit.game!.id}`}
                  className="group overflow-hidden rounded-xl bg-[#d9d9d9] shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gmc-teal-dark"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-300">
                    <Image
                      src={gameFallbacks[index % gameFallbacks.length]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 40vw, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-arsenica text-xl font-bold text-[#252525]">
                      {credit.game!.name}
                    </h3>
                    <p className="mt-1 font-karla text-sm font-semibold text-gmc-teal-dark">
                      {credit.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-[#d9d9d9] p-8 text-center font-karla text-neutral-700">
              No games have been added for this creator yet.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default CreatorPage
