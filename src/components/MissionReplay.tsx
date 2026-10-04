import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import mission from '../data/adcsMission.json'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import { useIsDark } from '../hooks/useIsDark'

const CubeSatView = lazy(() => import('./CubeSatView'))

// Row layout from scripts that exported the Simulink run: [t_s, err_deg, rate_deg_s, mode, q, q_des]
type Row = [number, number, number, number, number[], number[]]
const rows = mission.rows as Row[]
const T_END = rows[rows.length - 1][0]

const MODES: Record<number, { name: string; short: string; cls: string }> = {
  1: { name: 'Detumble', short: 'Detumble', cls: 'fill-muted/30' },
  2: { name: 'Coarse pointing', short: 'Coarse', cls: 'fill-muted/70' },
  3: { name: 'Fine pointing', short: 'Fine', cls: 'fill-signal' },
}

const SPEEDS = [100, 300, 1000] // × real time

const fmtT = (t: number) => {
  const s = Math.round(t)
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `T+${hh}:${mm}:${ss}`
}

const MissionReplay = ({ figLabel }: { figLabel: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>('200px')
  const dark = useIsDark()
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(300)
  const startedRef = useRef(false)

  // Start playing the first time the replay scrolls into view (unless reduced motion)
  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true
      if (!prefersReducedMotion()) setPlaying(true)
    }
  }, [inView])

  // Advance in simulated time; rows are evenly spaced so time maps linearly to index
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    let pos = idx
    const dtRow = rows[1][0] - rows[0][0]
    const tick = (now: number) => {
      pos += ((now - last) / 1000) * (speed / dtRow)
      last = now
      if (pos >= rows.length - 1) {
        setIdx(rows.length - 1)
        setPlaying(false)
        return
      }
      setIdx(Math.floor(pos))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // idx intentionally omitted: the loop owns position while playing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed])

  const scrubTo = useCallback((i: number) => {
    setPlaying(false)
    setIdx(Math.max(0, Math.min(rows.length - 1, i)))
  }, [])

  const togglePlay = () => {
    if (!playing && idx >= rows.length - 1) setIdx(0)
    setPlaying((p) => !p)
  }

  const [t, err, rate, mode, q, qDes] = rows[idx]

  return (
    <figure ref={ref} className="border border-rule bg-surface rounded-[3px]">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-5 min-w-0 relative h-[280px] sm:h-[320px] border-b lg:border-b-0 lg:border-r border-rule">
          {inView ? (
            <Suspense fallback={<Placeholder />}>
              <CubeSatView q={q} qDes={qDes} dark={dark} />
            </Suspense>
          ) : (
            <Placeholder />
          )}
          <div className="absolute left-3 top-3 font-mono text-[11.5px] text-muted leading-relaxed pointer-events-none">
            <p>
              <span className="inline-block w-2.5 h-2.5 bg-muted/60 border border-ink/70 mr-1.5 align-[-1px]" />
              true attitude
            </p>
            <p>
              <span className="inline-block w-2.5 h-2.5 border border-signal mr-1.5 align-[-1px]" />
              commanded (nadir)
            </p>
          </div>
          <p className="absolute right-3 bottom-2 font-mono text-[11px] text-muted pointer-events-none">drag to rotate</p>
        </div>

        <div className="lg:col-span-7 min-w-0 p-3 sm:p-4">
          <ErrorChart idx={idx} onScrub={scrubTo} />
        </div>
      </div>

      <div className="border-t border-rule px-3 sm:px-4 py-3 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button onClick={togglePlay} className="btn-quiet min-w-[5.5rem] justify-center" aria-label={playing ? 'Pause replay' : 'Play replay'}>
          {playing ? 'Pause' : idx >= rows.length - 1 ? 'Replay' : 'Play'}
        </button>

        <input
          type="range"
          min={0}
          max={rows.length - 1}
          value={idx}
          onChange={(e) => scrubTo(Number(e.target.value))}
          className="scrubber flex-1 min-w-[10rem]"
          aria-label="Mission time"
          aria-valuetext={fmtT(t)}
        />

        <div className="flex items-center gap-1 font-mono text-[12px]" role="group" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              aria-pressed={speed === s}
              className={`px-1.5 py-0.5 rounded-[2px] ${speed === s ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      <dl className="border-t border-rule grid grid-cols-2 sm:grid-cols-4 font-mono text-[13px]">
        <Readout label="Mission time" value={fmtT(t)} />
        <Readout label="Pointing error" value={`${err.toFixed(err < 10 ? 2 : 1)}°`} highlight />
        <Readout label="Body rate" value={`${rate.toFixed(3)} °/s`} />
        <Readout label="Control mode" value={MODES[mode]?.name ?? '—'} />
      </dl>

      <figcaption className="border-t border-rule px-3 sm:px-4 py-3 text-[14px] text-muted">
        <span className="font-mono text-ink mr-2">{figLabel}</span>
        Default 6,000 s mission from the Simulink model (10 ms step, 600,001 states; shown every 10 s). Pointing error is
        the angle between the true attitude and the commanded nadir attitude, on a log scale. It starts at 96° while
        tumbling and settles under 1° for the last ~14 minutes.
      </figcaption>
    </figure>
  )
}

const Placeholder = () => (
  <div className="absolute inset-0 flex items-center justify-center font-mono text-[12px] text-muted">loading 3D view…</div>
)

const Readout = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="px-3 sm:px-4 py-2.5 border-rule [&:not(:first-child)]:border-l max-sm:[&:nth-child(3)]:border-l-0 max-sm:[&:nth-child(n+3)]:border-t">
    <dt className="text-[11px] uppercase tracking-[0.06em] text-muted">{label}</dt>
    <dd className={`mt-0.5 tabular-nums ${highlight ? 'text-accent' : 'text-ink'}`}>{value}</dd>
  </div>
)

// ---------------------------------------------------------------------------
// Pointing-error chart (log y). Hand-rolled SVG: one series, so no chart library.

const H = 250
const M = { top: 10, right: 10, bottom: 46, left: 40 }
const Y_MIN = 0.05
const Y_MAX = 200
const Y_TICKS = [0.1, 1, 10, 100]
const X_TICKS = [0, 1000, 2000, 3000, 4000, 5000, 6000]

const ErrorChart = ({ idx, onScrub }: { idx: number; onScrub: (i: number) => void }) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(320)
  const dragging = useRef(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const plotW = w - M.left - M.right
  const plotH = H - M.top - M.bottom
  const x = useCallback((t: number) => M.left + (t / T_END) * plotW, [plotW])
  const y = (v: number) =>
    M.top + plotH - ((Math.log10(Math.max(v, Y_MIN)) - Math.log10(Y_MIN)) / (Math.log10(Y_MAX) - Math.log10(Y_MIN))) * plotH

  const path = useMemo(
    () => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r[0]).toFixed(1)},${y(r[1]).toFixed(1)}`).join(''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plotW],
  )

  // Collapse consecutive samples with the same mode into strip segments
  const modeRuns = useMemo(() => {
    const runs: { from: number; to: number; mode: number }[] = []
    rows.forEach((r, i) => {
      const last = runs[runs.length - 1]
      const next = rows[i + 1]?.[0] ?? T_END
      if (last && last.mode === r[3]) last.to = next
      else runs.push({ from: r[0], to: next, mode: r[3] })
    })
    return runs
  }, [])

  const indexFromEvent = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * w
    const tt = ((px - M.left) / plotW) * T_END
    return Math.round((tt / T_END) * (rows.length - 1))
  }

  const [t, err] = rows[idx]
  const stripY = M.top + plotH + 22
  const narrow = w < 440

  return (
    <div ref={wrapRef} className="w-full min-w-0 overflow-hidden">
      <p className="font-mono text-[11.5px] text-muted mb-1">pointing error [deg, log scale] vs mission time [s]</p>
      <svg
        width={w}
        height={H}
        className="block touch-none select-none cursor-crosshair"
        role="img"
        aria-label="Pointing error falls from 96 degrees to 0.62 degrees over the 6000 second mission"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          onScrub(indexFromEvent(e))
        }}
        onPointerMove={(e) => dragging.current && onScrub(indexFromEvent(e))}
        onPointerUp={() => (dragging.current = false)}
      >
        {Y_TICKS.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={w - M.right} y1={y(v)} y2={y(v)} className="stroke-rule" strokeDasharray={v === 1 ? '0' : '2 3'} />
            <text x={M.left - 6} y={y(v)} dy="0.32em" textAnchor="end" className="fill-muted font-mono text-[10.5px]">
              {v}
            </text>
          </g>
        ))}
        {X_TICKS.filter((v) => !narrow || v % 2000 === 0).map((v) => (
          <text
            key={v}
            x={x(v)}
            y={M.top + plotH + 14}
            textAnchor={v === T_END ? 'end' : v === 0 ? 'start' : 'middle'}
            className="fill-muted font-mono text-[10.5px]"
          >
            {v}
          </text>
        ))}

        <path d={path} fill="none" className="stroke-signal" strokeWidth={1.4} strokeLinejoin="round" />

        {/* control-mode strip */}
        {modeRuns.map((r) => (
          <rect key={r.from} x={x(r.from)} y={stripY} width={Math.max(0.5, x(r.to) - x(r.from))} height={7} className={MODES[r.mode]?.cls} />
        ))}
        <g className="font-mono text-[10.5px]">
          {Object.entries(MODES).map(([k, m], i) => (
            <g key={k} transform={`translate(${M.left + i * (narrow ? 80 : 118)}, ${stripY + 19})`}>
              <rect width={9} height={7} y={-6.5} className={m.cls} />
              <text x={13} className="fill-muted">
                {narrow ? m.short : m.name}
              </text>
            </g>
          ))}
        </g>

        {/* cursor */}
        <line x1={x(t)} x2={x(t)} y1={M.top} y2={stripY + 7} className="stroke-ink/60" />
        <circle cx={x(t)} cy={y(err)} r={3.5} className="fill-paper stroke-ink" strokeWidth={1.5} />
      </svg>
    </div>
  )
}

export default MissionReplay
