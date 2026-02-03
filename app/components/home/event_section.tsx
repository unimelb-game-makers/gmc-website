"use client"

import dayjs from "dayjs"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Event } from "@/@types/schema.ds";

type Props = {
  eventsData: Event[]
}

export default function EventsSection({ eventsData }: Props) {
  const upcomingEvents = useMemo(() => {
    return (eventsData ?? [])
      .filter(e => dayjs(e.date?.start).isAfter(dayjs()))
      .sort((a, b) => dayjs(a.date.start).diff(dayjs(b.date.start))) // soonest first
      .slice(0, 6)
  }, [eventsData])

  const [activeIdx, setActiveIdx] = useState(0)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  // Keep index valid if list changes
  useEffect(() => {
    if (upcomingEvents.length === 0) {
      setActiveIdx(0)
      return
    }
    if (activeIdx > upcomingEvents.length - 1) setActiveIdx(0)
  }, [upcomingEvents.length, activeIdx])

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.querySelector<HTMLElement>(`[data-idx="${idx}"]`)
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  const prev = () => {
    setActiveIdx(i => {
      const nextIdx = Math.max(0, i - 1)
      requestAnimationFrame(() => scrollToIndex(nextIdx))
      return nextIdx
    })
  }

  const next = () => {
    setActiveIdx(i => {
      const nextIdx = Math.min(upcomingEvents.length - 1, i + 1)
      requestAnimationFrame(() => scrollToIndex(nextIdx))
      return nextIdx
    })
  }

  // Always select the LEFT-most visible card (works in both scroll directions)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let raf = 0

    const updateActive = () => {
      const r = el.getBoundingClientRect()

      // Probe slightly inside the left edge.
      // If you have big left padding, bump 12 -> 20/24.
      const x = r.left + 12
      const y = r.top + r.height / 2

      const hit = document.elementFromPoint(x, y) as HTMLElement | null
      if (!hit) return

      const card = hit.closest("[data-idx]") as HTMLElement | null
      if (!card) return

      const idxStr = card.getAttribute("data-idx")
      if (!idxStr) return

      const idx = Number(idxStr)
      if (!Number.isFinite(idx)) return

      setActiveIdx(idx)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateActive)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    updateActive() // init

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
    }
  }, [upcomingEvents.length])

  const activeTitle = upcomingEvents[activeIdx]?.name ?? "Upcoming Events"

  return (
    <section className="w-full bg-neutral-900 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative bg-neutral-800/40 p-8">
          <div className="flex gap-10">
            {/* Left vertical strip (partial height example: 65%) */}
            <div className="relative w-16 shrink-0">
              <div className="absolute left-0 top-0 h-[65%] w-full bg-[#F4B164]" />
            </div>

            {/* Right content */}
            <div className="min-w-0 flex-1">
              {/* Dynamic title */}
              <h2 className="text-xl font-semibold text-white">{activeTitle}</h2>

              {/* Divider */}
              <div className="mt-2 h-px w-full bg-white/50" />

              {/* Cards row + controls */}
              <div className="mt-6 flex items-center gap-6">
                {/* Scrollable cards */}
                <div
                  ref={scrollerRef}
                  className="
                    events-scroller
                    flex min-w-0 flex-1 gap-8
                    overflow-x-auto scroll-smooth
                    snap-x snap-mandatory
                    scroll-pl-4 pr-2
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                  "
                >
                  <style>{`
                    .events-scroller::-webkit-scrollbar { display: none; }
                  `}</style>

                  {upcomingEvents.length === 0 ? (
                    <div className="text-white/70">No upcoming events.</div>
                  ) : (
                    upcomingEvents.map((e, idx) => {
                      const isActive = idx === activeIdx

                      return (
                        <div
                          key={e.id}
                          data-idx={idx}
                          className={[
                            "snap-start shrink-0 w-[260px] sm:w-[320px]",
                            "transition-all duration-200 ease-out origin-left",
                            isActive ? "scale-105 opacity-100" : "scale-95 opacity-70",
                          ].join(" ")}
                        >
                          {/* Image */}
                          <div
                            className={[
                              "h-[160px] w-full overflow-hidden rounded-md bg-neutral-200",
                              "transition-shadow duration-200",
                              isActive
                                ? "shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                                : "shadow-none",
                            ].join(" ")}
                          >
                            {e.thumbnail ? (
                              <img
                                src={e.thumbnail}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>

                          {/* Meta: only active shows (reserve height to avoid layout jump) */}
                          <div className="mt-3 min-h-[42px] text-sm text-white/90">
                            {isActive && (
                              <>
                                <div>// {dayjs(e.date.start).format("DD-MM-YYYY hh:mma")}</div>
                                <div>{e.location ?? "TBA"}</div>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Prev / Next buttons */}
                <div className="shrink-0 flex gap-3">
                  <button
                    onClick={prev}
                    disabled={activeIdx === 0 || upcomingEvents.length === 0}
                    className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                    aria-label="Previous event"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    disabled={upcomingEvents.length === 0 || activeIdx === upcomingEvents.length - 1}
                    className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                    aria-label="Next event"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* SEE MORE */}
              <div className="mt-10 flex justify-center">
                <Link href="/events/" className = "flex justify-center">
                    <button className="mt-8 px-15 py-3 font-bold font-arsenica text-4xl rounded-tr-xl rounded-bl-xl 
                    bg-gmc-orange-dark hover:bg-gmc-orange text-white">
                        See More →
                    </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
