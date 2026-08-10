import { Component, Suspense, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, Clone, OrbitControls, useGLTF } from '@react-three/drei'

const MODEL_URL = '/robot_arm_assembly.glb'

type SceneErrorBoundaryProps = {
  children: ReactNode
  fallback: ReactNode
  onError: () => void
}

type SceneErrorBoundaryState = {
  hasError: boolean
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

type RobotArmModelProps = {
  onReady: () => void
}

function RobotArmModel({ onReady }: RobotArmModelProps) {
  const { scene } = useGLTF(MODEL_URL)

  useEffect(() => {
    onReady()
  }, [onReady, scene])

  return <Clone object={scene} castShadow receiveShadow />
}

function SceneLoadingState() {
  return (
    <div className="robot-arm-experience__scene-state" role="status">
      <span className="robot-arm-experience__loader" aria-hidden="true" />
      <span>Preparing the assembly model</span>
    </div>
  )
}

function SceneErrorState() {
  return (
    <div className="robot-arm-experience__scene-state robot-arm-experience__scene-state--error">
      <span className="robot-arm-experience__state-index" aria-hidden="true">
        3D
      </span>
      <p>The interactive model is unavailable, but the project notes remain below.</p>
    </div>
  )
}

export default function RobotArmExperience() {
  const [modelReady, setModelReady] = useState(false)
  const [modelFailed, setModelFailed] = useState(false)
  const handleModelReady = useCallback(() => setModelReady(true), [])
  const handleModelError = useCallback(() => setModelFailed(true), [])

  return (
    <section
      id="robot-arm"
      className="robot-arm-experience"
      aria-labelledby="robot-arm-title"
    >
      <div className="robot-arm-experience__header">
        <p className="robot-arm-experience__eyebrow">
          <span>Interactive study</span>
          <span aria-hidden="true">No. 01</span>
        </p>

        <div className="robot-arm-experience__heading-grid">
          <h2 id="robot-arm-title" className="robot-arm-experience__title">
            Robot arm,
            <span> inspected in three dimensions.</span>
          </h2>

          <p id="robot-arm-summary" className="robot-arm-experience__summary">
            A spatial view of the complete mechanical assembly, built to make the
            relationships between joints, links, and the end effector easier to read.
            Rotate it, move closer, and inspect the design from any angle.
          </p>
        </div>
      </div>

      <figure
        className="robot-arm-experience__figure"
        aria-labelledby="robot-arm-title"
        aria-describedby="robot-arm-summary robot-arm-controls"
      >
        <div className="robot-arm-experience__viewer">
          <div className="robot-arm-experience__viewer-bar" aria-hidden="true">
            <span>Assembly / full system</span>
            <span>Interactive viewport</span>
          </div>

          <div className="robot-arm-experience__canvas-wrap">
            {!modelReady && !modelFailed && <SceneLoadingState />}

            <SceneErrorBoundary fallback={<SceneErrorState />} onError={handleModelError}>
              <Canvas
                className="robot-arm-experience__canvas"
                aria-hidden="true"
                shadows
                dpr={[1, 1.75]}
                camera={{ position: [5.5, 3.5, 5.5], fov: 34, near: 0.01, far: 1000 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <ambientLight intensity={0.8} />
                <hemisphereLight args={['#e8f0f5', '#172027', 1.25]} />
                <directionalLight
                  castShadow
                  position={[6, 8, 5]}
                  intensity={2.25}
                  color="#fff4df"
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <directionalLight position={[-5, 2, -4]} intensity={0.9} color="#8fc9dc" />

                <OrbitControls
                  makeDefault
                  enableDamping
                  dampingFactor={0.065}
                  minDistance={1.25}
                  maxDistance={18}
                  minPolarAngle={Math.PI * 0.08}
                  maxPolarAngle={Math.PI * 0.88}
                  zoomSpeed={0.75}
                  rotateSpeed={0.65}
                  panSpeed={0.6}
                />

                <Suspense fallback={null}>
                  <Bounds fit clip observe margin={1.25}>
                    <Center bottom>
                      <RobotArmModel onReady={handleModelReady} />
                    </Center>
                  </Bounds>
                </Suspense>
              </Canvas>
            </SceneErrorBoundary>

            <span
              className="robot-arm-experience__reticle robot-arm-experience__reticle--top"
              aria-hidden="true"
            />
            <span
              className="robot-arm-experience__reticle robot-arm-experience__reticle--bottom"
              aria-hidden="true"
            />
          </div>
        </div>

        <figcaption id="robot-arm-controls" className="robot-arm-experience__caption">
          <p className="robot-arm-experience__caption-lead">
            <span aria-hidden="true">01</span>
            Explore the assembly
          </p>

          <ul className="robot-arm-experience__controls" aria-label="3D model controls">
            <li>
              <span>Drag</span>
              <span>Rotate</span>
            </li>
            <li>
              <span>Scroll or pinch</span>
              <span>Zoom</span>
            </li>
            <li>
              <span>Right-drag</span>
              <span>Pan</span>
            </li>
          </ul>

          <p className="robot-arm-experience__access-note">
            The viewer is optional: it shows a robot-arm assembly with a rotating base,
            articulated links, joint hardware, and an end effector arranged as one
            connected mechanism.
          </p>
        </figcaption>
      </figure>
    </section>
  )
}
