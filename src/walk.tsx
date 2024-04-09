import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, Line } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh
    Cylinder005: THREE.Mesh
    Cylinder003: THREE.Mesh
    Text002: THREE.Mesh
    Cube003: THREE.Mesh
    Retopo_Plane: THREE.SkinnedMesh
    Cube001: THREE.Mesh
    Text001: THREE.Mesh
    Curve1760_1: THREE.Mesh
    Curve1760_2: THREE.Mesh
    line001: THREE.Mesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    ['Brand-Orange.002']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Brand-Orange.002']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'guidance line' | 'Key.001Action' | 'Hotel.003' | 'Hotel.002' | 'Hotel.001' | 'Hotel' | 'character' | 'Character Appearance and Vanishing Act' | 'Walk' | 'Retopo_PlaneAction' | 'Camera' | 'Home'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh'] | JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('../public/Walk.gltf') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions.Home) {
      actions.Home.play()
    }
  }, [actions.Home])
  
  const homeRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    console.log(actions.Home?.isRunning())
    if (homeRef.current) {
      console.log(homeRef.current.scale)
      homeRef.current.scale.x += 0.01
      homeRef.current.scale.y += 0.01
      homeRef.current.scale.z += 0.01
    }
    })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh scale={10} position={[0,10,0]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
        <group name="Hotel" position={[92.672, 1.48, -53.769]} rotation={[0, 0.833, 0]} scale={[0.371, 1.391, 1]}>
          <mesh name="Cube002" castShadow receiveShadow geometry={nodes.Cube002.geometry} material={materials['Brand-Orange.002']} position={[0.038, -1.495, 0.017]} rotation={[0, 1.549, 0]} scale={[0.675, 0.485, 1.817]} />
          <mesh name="Cylinder005" castShadow receiveShadow geometry={nodes.Cylinder005.geometry} material={materials.Material} position={[0.038, -0.28, 0.017]} rotation={[0, -1.544, 3.142]} scale={[0.353, 0.253, 0.949]}>
            <mesh name="Cylinder003" castShadow receiveShadow geometry={nodes.Cylinder003.geometry} material={materials['Brand-Orange.002']} position={[0, 0, 0.789]} rotation={[-Math.PI / 2, 0, 0]} scale={0.96} />
          </mesh>
          <mesh name="Text002" castShadow receiveShadow geometry={nodes.Text002.geometry} material={materials.Material} position={[-0.087, -1.034, -0.014]} rotation={[-Math.PI, 1.561, -Math.PI]} scale={[0.481, 0.346, 1.294]} />
          <mesh name="Cube003" castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials['Brand-Orange.002']} position={[0.037, -1.049, 0.031]} rotation={[0, 1.554, 0]} scale={[0.785, 0.564, 2.112]} />
        </group>
        <group name="Character" position={[92.618, 0.568, -65.241]} rotation={[0, -0.006, 0]} scale={0.832}>
          <group name="Character_Appearance_and_Vanishing_Act" position={[0, -0.761, 0]} rotation={[0, -0.868, 0]} scale={[0.046, 0.117, 0.036]}>
            <group name="Walk" position={[-0.108, -0.979, -0.056]} rotation={[Math.PI / 2, 0, 0]} scale={[0.033, 0.042, 0.013]}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh name="Retopo_Plane" geometry={nodes.Retopo_Plane.geometry} material={materials['Brand-Orange.002']} skeleton={nodes.Retopo_Plane.skeleton} />
            </group>
          </group>
        </group>
        <group name="Camera" position={[92.607, 0.568, -65.261]} scale={0.832} />
        <group name="Home" position={[91.568, 0.051, -65.527]} scale={0} ref={homeRef}>
          <mesh name="Cube001" castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials['Brand-Orange.002']} position={[0, 0, 512]} scale={0}>
            <mesh name="Text001" castShadow receiveShadow geometry={nodes.Text001.geometry} material={nodes.Text001.material} position={[0, 0, 512]} scale={0} />
          </mesh>
        </group>
        <group name="ine" position={[91.857, 0.568, -58.83]} />
        <mesh name="line001" castShadow receiveShadow geometry={nodes.line001.geometry} material={materials['Brand-Orange.002']} position={[109.199, 0.018, -58.83]} />
      </group>
    </group>
  )
}

useGLTF.preload('/Walk.gltf')
