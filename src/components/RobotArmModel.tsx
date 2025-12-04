import { useRef, useEffect } from 'react'
import { Group, Box3, Vector3 } from 'three'
import { useGLTF } from '@react-three/drei'

const RobotArmModel = () => {
  const group = useRef<Group>(null)
  const { scene } = useGLTF('/robot_arm_assembly.glb')
  
  useEffect(() => {
    if (group.current) {
      // Calculate the bounding box of the model
      const box = new Box3().setFromObject(group.current)
      const center = new Vector3()
      box.getCenter(center)
      
      // Get the minimum point (bottom-left-front corner)
      const min = box.min
      
      // Offset the group so the bottom-left corner is at origin
      group.current.position.set(-min.x, -min.y, -min.z)
    }
  }, [scene])
  
  return (
    <group ref={group} scale={0.5}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload('/robot_arm_assembly.glb')

export default RobotArmModel
