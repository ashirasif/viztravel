/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/CharacterAnimation.glb -ts 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    character_object: THREE.SkinnedMesh
    root: THREE.Bone
    ['MCH-torsoparent']: THREE.Bone
    ['MCH-hand_ikparentL']: THREE.Bone
    ['MCH-upper_arm_ik_targetparentL']: THREE.Bone
    ['MCH-hand_ikparentR']: THREE.Bone
    ['MCH-upper_arm_ik_targetparentR']: THREE.Bone
    ['MCH-foot_ikparentL']: THREE.Bone
    ['MCH-thigh_ik_targetparentL']: THREE.Bone
    ['MCH-foot_ikparentR']: THREE.Bone
    ['MCH-thigh_ik_targetparentR']: THREE.Bone
  }
  materials: {
    ['Brand-Orange.002']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'Appear' | 'Disappear' | 'Idle' | 'Walk'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>

export function Character(props: JSX.IntrinsicElements['group'] & { walk: boolean }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/CharacterAnimation.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions.Idle && actions.Walk) {
      if (props.walk) {
        actions.Walk.reset()
        actions.Walk.crossFadeFrom(actions.Idle, 0.5, true).play()
      } else {
        actions.Idle.reset()
        actions.Idle.crossFadeFrom(actions.Walk, 0.5, true).play()
      }
    }
  }, [props.walk])
  
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="character_Rig">
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes['MCH-hand_ikparentL']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
          <primitive object={nodes['MCH-hand_ikparentR']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
          <primitive object={nodes['MCH-foot_ikparentL']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
          <primitive object={nodes['MCH-foot_ikparentR']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
          <skinnedMesh name="character_object" geometry={nodes.character_object.geometry} material={materials['Brand-Orange.002']} skeleton={nodes.character_object.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/CharacterAnimation.glb')
