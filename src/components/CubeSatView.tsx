import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BoxGeometry, BufferGeometry, EdgesGeometry, Group, Line, LineBasicMaterial, Quaternion, Vector3 } from 'three'

// Scalar-first quaternions from the sim are passive ECI→body. The body's orientation
// as an object in the ECI scene is the inverse rotation, i.e. the conjugate.
const toObjectQuat = ([w, x, y, z]: number[]) => new Quaternion(-x, -y, -z, w)

interface Props {
  q: number[]
  qDes: number[]
  dark: boolean
}

// 3U CubeSat: 10 × 10 × 30 cm, long axis along body +Z
const SIZE: [number, number, number] = [1, 1, 3]

// Body axes (x red, y green, z blue). Built once as plain three objects:
// <line> in JSX collides with the SVG <line> element type.
const makeAxes = (length: number) => {
  const group = new Group()
  ;(
    [
      [[length, 0, 0], '#c4513a'],
      [[0, length, 0], '#3f8f5a'],
      [[0, 0, length], '#3b6fb0'],
    ] as const
  ).forEach(([end, color]) => {
    const geom = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(...end)])
    group.add(new Line(geom, new LineBasicMaterial({ color })))
  })
  return group
}

const CubeSatView = ({ q, qDes, dark }: Props) => {
  const edges = useMemo(() => new EdgesGeometry(new BoxGeometry(...SIZE)), [])
  const axes = useMemo(() => makeAxes(2.4), [])
  const body = toObjectQuat(q)
  const target = toObjectQuat(qDes)

  return (
    <Canvas camera={{ position: [5.2, 3.6, 5.2], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={dark ? 0.55 : 0.75} />
      <directionalLight position={[6, 8, 4]} intensity={0.9} />

      {/* Commanded (desired) attitude: outline only */}
      <group quaternion={target}>
        <lineSegments geometry={edges} scale={1.06}>
          <lineBasicMaterial color={dark ? '#f5803e' : '#e8590c'} />
        </lineSegments>
      </group>

      {/* True attitude: solid body with body axes */}
      <group quaternion={body}>
        <mesh>
          <boxGeometry args={SIZE} />
          <meshStandardMaterial color={dark ? '#8f8d86' : '#c9c7bf'} metalness={0.2} roughness={0.7} />
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial color={dark ? '#ecebe6' : '#1a1a18'} />
        </lineSegments>
        <primitive object={axes} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

export default CubeSatView
