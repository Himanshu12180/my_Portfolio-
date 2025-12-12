import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * PeacockFeather3D - 3D Peacock feather with scroll/mouse reactivity
 * Features:
 * - Soft neon emissive glow
 * - Floating animation
 * - Mouse parallax (reacts to cursor)
 * - Scroll parallax (moves downward as user scrolls)
 * - Cinematic spiritual motion
 */
export default function PeacockFeather3D({ scrollRef, mouseRef }) {
  const featherRef = useRef()
  const timeRef = useRef(0)

  /* Create procedural feather geometry */
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2, 0),
      new THREE.Vector3(0.3, -1, 0.1),
      new THREE.Vector3(0.5, 0, 0.2),
      new THREE.Vector3(0.4, 1, 0.15),
      new THREE.Vector3(0.2, 2, 0.1),
      new THREE.Vector3(0, 2.5, 0),
    ])

    const points = curve.getPoints(64)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    // Create feather shape using TubeGeometry for the shaft
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.08, 8, false)

    // Add decorative feather barbs
    const group = new THREE.Group()

    // Main shaft
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: '#06b6d4',
      metalness: 0.6,
      roughness: 0.3,
      emissive: '#0d9488',
      emissiveIntensity: 0.5,
    })
    const shaft = new THREE.Mesh(tubeGeo, shaftMaterial)
    group.add(shaft)

    // Add decorative eye spot (ocellus) on feather
    const eyeGeo = new THREE.SphereGeometry(0.3, 32, 32)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: '#7c3aed',
      metalness: 0.8,
      roughness: 0.1,
      emissive: '#a78bfa',
      emissiveIntensity: 0.8,
    })
    const eye = new THREE.Mesh(eyeGeo, eyeMaterial)
    eye.position.set(0.5, 0.8, 0)
    group.add(eye)

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(0.45, 0.05, 32, 100)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#fbbf24',
      emissiveIntensity: 0.6,
    })
    const ring = new THREE.Mesh(ringGeo, ringMaterial)
    ring.position.set(0.5, 0.8, 0)
    ring.rotation.x = Math.PI / 3
    group.add(ring)

    return group
  }, [])

  useFrame(({ camera, clock, mouse }) => {
    if (!featherRef.current) return

    timeRef.current += 0.01
    const scroll = scrollRef?.current || 0
    const mx = mouseRef?.current?.x || 0
    const my = mouseRef?.current?.y || 0

    // Floating bobbing motion
    const floatY = Math.sin(timeRef.current * 1.2) * 0.4
    const floatX = Math.cos(timeRef.current * 0.8) * 0.3

    // Scroll-driven downward movement (z-axis depth changes)
    const scrollY = scroll * 3 // Moves down as you scroll
    const scrollZ = scroll * 1.5 // Depth parallax

    // Mouse parallax - react to cursor position
    const mouseInfluenceX = mx * 2
    const mouseInfluenceY = my * 1.5

    featherRef.current.position.y = floatY + scrollY + mouseInfluenceY
    featherRef.current.position.x = floatX + mouseInfluenceX
    featherRef.current.position.z = scrollZ

    // Rotation - scroll-driven + breathing motion
    featherRef.current.rotation.y += 0.005 + scroll * 0.3
    featherRef.current.rotation.x = Math.sin(timeRef.current * 0.6) * 0.3 + my * 0.5
    featherRef.current.rotation.z = Math.cos(timeRef.current * 0.4) * 0.2 + mx * 0.3

    // Slight scale breathing
    const breatheScale = 1 + Math.sin(timeRef.current * 0.5) * 0.08
    featherRef.current.scale.set(breatheScale, breatheScale, breatheScale)
  })

  return <primitive ref={featherRef} object={geometry} />
}

/**
 * PeacockFeatherCanvas - Wrapper component with scroll/mouse tracking
 * Usage in Hero:
 * <Canvas>
 *   <Suspense>
 *     <PeacockFeatherCanvas scrollRef={scrollRef} />
 *   </Suspense>
 * </Canvas>
 */
export function PeacockFeatherCanvas({ scrollRef }) {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Lighting for 3D peacock feather */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 0, 5]} intensity={0.8} color="#06b6d4" />

      {/* Peacock feather component */}
      <PeacockFeather3D scrollRef={scrollRef} mouseRef={mouseRef} />
    </>
  )
}
