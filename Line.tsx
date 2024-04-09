import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
  }
  materials: {
    ['Brand-Orange.002']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'Action' | 'Key.001Action'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/Line.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Plane" castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials['Brand-Orange.002']} position={[109.199, 0.018, -58.83]} scale={[0.056, 0.054, 0.054]} />
      </group>
    </group>
  )
}

useGLTF.preload('/Line.glb')
