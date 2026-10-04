import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Html, OrbitControls, useProgress } from '@react-three/drei'
import RobotArmModel from './RobotArmModel'

const Progress = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <p className="font-mono text-[12px] text-muted whitespace-nowrap">loading model… {progress.toFixed(0)}%</p>
    </Html>
  )
}

const RobotArmScene = ({ dark }: { dark: boolean }) => (
  <Canvas camera={{ position: [3, 2.6, 3], fov: 45 }} dpr={[1, 2]}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <gridHelper args={[4, 32, dark ? '#4a4945' : '#bdbbb3', dark ? '#2c2b28' : '#dddbd3']} />
    <Suspense fallback={<Progress />}>
      {/* Bounds frames the camera on the model, whatever units the CAD export used */}
      <Bounds fit clip observe margin={1.15}>
        <RobotArmModel />
      </Bounds>
    </Suspense>
    <OrbitControls makeDefault enablePan={false} />
  </Canvas>
)

export default RobotArmScene
