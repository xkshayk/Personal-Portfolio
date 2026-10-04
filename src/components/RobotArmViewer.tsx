import { Suspense, lazy, useState } from 'react'
import { useIsDark } from '../hooks/useIsDark'

const RobotArmScene = lazy(() => import('./RobotArmScene'))

/** Click-to-load wrapper: the GLB is large, so nothing is fetched until asked for. */
const RobotArmViewer = ({ figLabel }: { figLabel: string }) => {
  const [load, setLoad] = useState(false)
  const dark = useIsDark()

  return (
    <figure className="border border-rule bg-surface rounded-[3px]">
      <div className="relative h-[340px] sm:h-[440px]">
        {load ? (
          <Suspense fallback={<p className="absolute inset-0 grid place-items-center font-mono text-[12px] text-muted">loading viewer…</p>}>
            <RobotArmScene dark={dark} />
          </Suspense>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center px-6">
              <img src="/media/arm-assembly.webp" alt="" className="mx-auto h-40 sm:h-52 object-contain opacity-80" />
              <button onClick={() => setLoad(true)} className="btn mt-5">
                Load the 3D model
              </button>
              <p className="mt-2 font-mono text-[11.5px] text-muted">≈30 MB · drag to orbit, scroll to zoom</p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="border-t border-rule px-3 sm:px-4 py-3 text-[14px] text-muted">
        <span className="font-mono text-ink mr-2">{figLabel}</span>
        The full SolidWorks assembly, exported to glTF.
      </figcaption>
    </figure>
  )
}

export default RobotArmViewer
