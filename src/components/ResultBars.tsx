import { useInView } from '../hooks/useInView'

// Only the relative changes are published (from the resume), so both metrics are indexed
// to last year's model = 100 rather than shown in absolute seconds / collisions.
const metrics = [
  { label: 'Simulated lap time', before: 100, after: 77, delta: '−23%' },
  { label: 'Simulated collision rate', before: 100, after: 15, delta: '−85%' },
]

const ResultBars = ({ figLabel }: { figLabel: string }) => {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <figure ref={ref} className="border border-rule bg-surface rounded-[3px] p-4 sm:p-5">
      <div className="space-y-6">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[15px] font-medium">{m.label}</p>
              <p className="font-mono text-[20px] text-accent">{m.delta}</p>
            </div>
            <div className="mt-2 space-y-1.5 font-mono text-[11.5px]">
              <Bar label="last year’s model" value={m.before} show={inView} className="bg-muted/35" />
              <Bar label="this year’s model" value={m.after} show={inView} className="bg-signal" />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 pt-3 border-t border-rule text-[14px] text-muted">
        <span className="font-mono text-ink mr-2">{figLabel}</span>
        AutoDRIVE simulation results, indexed to the previous year’s autonomous model (= 100). Lower is better on both.
      </figcaption>
    </figure>
  )
}

const Bar = ({ label, value, show, className }: { label: string; value: number; show: boolean; className: string }) => (
  <div className="grid grid-cols-[8rem_1fr_2.5rem] sm:grid-cols-[9rem_1fr_2.5rem] items-center gap-3">
    <span className="text-muted">{label}</span>
    <div className="h-3 bg-rule/40">
      <div
        className={`h-full ${className} transition-[width] duration-1000 ease-out motion-reduce:transition-none`}
        style={{ width: show ? `${value}%` : '0%' }}
      />
    </div>
    <span className="text-right tabular-nums">{value}</span>
  </div>
)

export default ResultBars
