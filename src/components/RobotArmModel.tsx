import { useMemo } from 'react'
import { Box3, Vector3 } from 'three'
import { useGLTF } from '@react-three/drei'

export const ROBOT_ARM_GLB = '/robot_arm_assembly.glb'
const SCALE = 0.5

// No useGLTF.preload here on purpose: the file is ~30 MB and only loads when someone asks for it.
const RobotArmModel = () => {
  const { scene } = useGLTF(ROBOT_ARM_GLB)

  // Sit the model's bounding-box corner on the origin so it rests on the grid. Computed during
  // render (not in an effect) so <Bounds> frames the camera on the final position.
  const offset = useMemo(() => {
    const min = new Box3().setFromObject(scene).min
    return new Vector3(-min.x, -min.y, -min.z).multiplyScalar(SCALE)
  }, [scene])

  return (
    <group position={offset} scale={SCALE}>
      <primitive object={scene} />
    </group>
  )
}

export default RobotArmModel
