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

  // -------- Desktop carousel state --------
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  // -------- Mobile paging state (2 per page) --------
  const [mobilePage, setMobilePage] = useState(0)
  const totalMobilePages = Math.ceil(upcomingEvents.length / 2) // 0..N-1

  // Keep index valid if list changes
  useEffect(() => {
    if (upcomingEvents.length === 0) {
      setActiveIdx(0)
      setMobilePage(0)
      return
    }
    if (activeIdx > upcomingEvents.length - 1) setActiveIdx(0)
    if (mobilePage > totalMobilePages - 1) setMobilePage(0)
  }, [upcomingEvents.length, activeIdx, mobilePage, totalMobilePages])

  // Desktop: scroll to index (align start)
  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.querySelector<HTMLElement>(`[data-idx="${idx}"]`)
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  // Desktop prev/next (one card)
  const prevDesktop = () => {
    setActiveIdx(i => {
      const nextIdx = Math.max(0, i - 1)
      requestAnimationFrame(() => scrollToIndex(nextIdx))
      return nextIdx
    })
  }

  const nextDesktop = () => {
    setActiveIdx(i => {
      const nextIdx = Math.min(upcomingEvents.length - 1, i + 1)
      requestAnimationFrame(() => scrollToIndex(nextIdx))
      return nextIdx
    })
  }

  // Desktop: always select left-most visible card (bulletproof)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let raf = 0

    const updateActive = () => {
      const r = el.getBoundingClientRect()
      const x = r.left + 12 // if you have bigger left padding, bump to 20/24
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
    updateActive()

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
    }
  }, [upcomingEvents.length])

  const activeTitle = upcomingEvents[activeIdx]?.name ?? "Upcoming Events"

  // -------- Mobile paging (2 events at a time) --------
  const mobileStart = mobilePage * 2
  const mobileEvents = upcomingEvents.slice(mobileStart, mobileStart + 2)

  const prevMobile = () => setMobilePage(p => Math.max(0, p - 1))
  const nextMobile = () => setMobilePage(p => Math.min(totalMobilePages - 1, p + 1))

  return (
    <section className="w-full bg-neutral-900 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative bg-neutral-800/40 p-6 sm:p-8">
          <div className="flex gap-6 sm:gap-10">
            {/* Left strip (partial height) */}
            <div className="relative w-12 sm:w-16 shrink-0">
              <div className="absolute left-0 top-0 h-full lg:h-[80%] w-full bg-gmc-orange" />
            </div>

            {/* Right content */}
            <div className="min-w-0 flex-1">
              {/* ===== Desktop title + divider ===== */}
              <div className="hidden sm:block">
                <h2 className="text-xl font-semibold text-white">{activeTitle}</h2>
                <div className="mt-2 h-px w-full bg-white/50" />
              </div>

              {/* ===== MOBILE MODE (<sm): 2 events vertically ===== */}
              <div className="sm:hidden">
                <h2 className="text-xl font-semibold text-white">Events</h2>
                <div className="mt-2 h-px w-full bg-white/50" />

                <div className="mt-6 space-y-6">
                  {mobileEvents.length === 0 ? (
                    <div className="text-white/70">No upcoming events.</div>
                  ) : (
                    mobileEvents.map(e => (
                      <div key={e.id} className="w-full">
                        {/* image */}
                        <div className="h-[170px] w-full rounded-lg bg-neutral-200 overflow-hidden">
                          {e.thumbnail ? (
                            <img src={e.thumbnail} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </div>

                        {/* title + meta row */}
                        <div className="mt-3 flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="mt-2 text-lg font-semibold text-white">
                              {e.name}
                            </div>
                          </div>

                          <div className="shrink-0 text-right text-sm text-white/90 leading-tight">
                            <div>{dayjs(e.date.start).format("DD-MM-YYYY hh:mma")}</div>
                            <div>{e.location ?? "TBA"}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Mobile prev/next (page by 2) + see more */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={prevMobile}
                      disabled={mobilePage === 0 || upcomingEvents.length === 0}
                      className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                      aria-label="Previous events"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextMobile}
                      disabled={
                        upcomingEvents.length === 0 || mobilePage >= totalMobilePages - 1
                      }
                      className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                      aria-label="Next events"
                    >
                      ›
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <Link href="/events/" className = "flex justify-center">
                        <button className="p-2 font-bold font-arsenica rounded-tr-xl rounded-bl-xl 
                        bg-gmc-orange-dark hover:bg-gmc-orange text-white">
                            See More →
                        </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ===== DESKTOP MODE (sm+): carousel ===== */}
              <div className="hidden sm:block">
                <div className="mt-6 flex items-center gap-6">
                  {/* scroller */}
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

                            {/* meta only for active (reserve height) */}
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

                  {/* desktop buttons */}
                  <div className="shrink-0 flex gap-3">
                    <button
                      onClick={prevDesktop}
                      disabled={activeIdx === 0 || upcomingEvents.length === 0}
                      className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                      aria-label="Previous event"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextDesktop}
                      disabled={
                        upcomingEvents.length === 0 || activeIdx === upcomingEvents.length - 1
                      }
                      className="h-10 w-10 rounded-full bg-white/20 text-white disabled:opacity-30"
                      aria-label="Next event"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* desktop see more */}
                <div className="mt-10 flex justify-center">
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
              {/* ===== end desktop ===== */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
