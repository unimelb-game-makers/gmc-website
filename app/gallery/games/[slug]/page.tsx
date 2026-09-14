import { notFound } from 'next/navigation'

import games from '@/mock-data/games.json'

type GamePageProps = {
  params: Promise<{ slug: string }>
}

const GamePage = async ({ params }: GamePageProps) => {
  const { slug } = await params
  const game = games.find(({ id }) => id === slug)

  if (!game) {
    notFound()
  }

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#252525] px-5 pb-20 pt-40 text-black sm:px-10 sm:pt-44 lg:px-16">
      <h1 className="text-center font-arsenica text-4xl font-extrabold text-white sm:text-5xl">
        {game.name}
      </h1>

      <section className="mx-auto mt-9 max-w-7xl overflow-hidden rounded-br-[32px] bg-gmc-cream">
        <div className="flex min-h-[500px]">
          <div className="w-4 shrink-0 bg-[#f1774d] sm:w-8 lg:w-12" />

          <div className="grid flex-1 gap-10 px-5 py-8 lg:grid-cols-2 lg:px-12 lg:py-11">
            
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#d9d9d9]">
                {/* Trailer or fallback image*/}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video rounded-xl bg-[#d9d9d9]" />
                <div className="aspect-video rounded-xl bg-[#d9d9d9]" />
                <div className="aspect-video rounded-xl bg-[#d9d9d9]" />
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p className="font-karla text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non
                  massa id velit tempor pulvinar et ac nunc. Donec magna arcu,
                  sollicitudin quis bibendum maximus, rutrum non felis.
                </p>

                <p className="mt-4 font-karla text-base leading-relaxed">
                  Vestibulum semper eros in est sagittis, vitae auctor ex ultrices.
                  Donec rutrum imperdiet fringilla.
                </p>
              </div>

              <div className="mt-10">
                <p className="font-karla text-base">
                  <span className="font-semibold">Tags:</span> Action, Shooter
                </p>

                <p className="mt-4 font-karla text-base">
                  Winner of xxxxxxx game jam
                </p>
              </div>

              <div className="mt-auto pt-10">
                {/* <MadeBy creators={gameCreators}> */}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default GamePage
