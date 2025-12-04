import { Suspense, useState, useEffect } from 'react'
import RobotArmModel from './RobotArmModel.tsx'

const RobotArm = () => {
  const [hasError, setHasError] = useState(false)
  const [Canvas, setCanvas] = useState<any>(null)
  const [components, setComponents] = useState<any>(null)

  useEffect(() => {
    // Dynamically import to catch errors
    import('@react-three/fiber').then(module => {
      setCanvas(() => module.Canvas)
    }).catch(err => {
      console.error('Failed to load Canvas:', err)
      setHasError(true)
    })

    import('@react-three/drei').then(module => {
      setComponents(module)
    }).catch(err => {
      console.error('Failed to load drei:', err)
      setHasError(true)
    })
  }, [])

  if (hasError) {
    return (
      <section id="robot-arm" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-8">Robot Arm Assembly</h2>
          <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
            <p className="text-red-800 dark:text-red-200">Error loading 3D viewer. Check console for details.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!Canvas || !components) {
    return (
      <section id="robot-arm" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-8">Robot Arm Assembly</h2>
          <div className="w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-2xl flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Loading 3D viewer...</p>
          </div>
        </div>
      </section>
    )
  }

  const { OrbitControls, PerspectiveCamera } = components

  return (
    <section id="robot-arm" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-8">Robot Arm Assembly</h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          Interactive 3D model of a robot arm assembly. Use your mouse to rotate, zoom, and explore the assembly from any angle.
        </p>

        {/* 3D Viewer Container */}
        <div className="w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[3, 3, 3]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              {/* Axes Helper - Red=X, Green=Y, Blue=Z */}
              <axesHelper args={[2]} />
              
              {/* Grid Helper */}
              <gridHelper args={[10, 10, '#888888', '#444444']} />
              
              {/* Robot Arm Model */}
              <RobotArmModel />
              
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>

        {/* Instructions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">🖱️ Rotate</h3>
            <p className="text-gray-700 dark:text-gray-300">Click and drag to rotate the model</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">🔍 Zoom</h3>
            <p className="text-gray-700 dark:text-gray-300">Scroll to zoom in and out</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">↔️ Pan</h3>
            <p className="text-gray-700 dark:text-gray-300">Right-click and drag to pan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RobotArm
