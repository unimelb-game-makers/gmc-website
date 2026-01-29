'use client'

import React, { useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Upright standing plane component
interface StandingPlaneProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  imageUrl?: string
  opacity?: number
}

function StandingPlane({ position = [0, 0, 0], rotation = [0, 0, 0], imageUrl, opacity = 1 }: StandingPlaneProps) {
  const texture = imageUrl ? useLoader(THREE.TextureLoader, imageUrl) : null

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[4, 3]} />
      {texture ? (
        <meshStandardMaterial map={texture} transparent opacity={opacity} />
      ) : (
        <meshStandardMaterial color="#4f46e5" transparent opacity={opacity} />
      )}
    </mesh>
  )
}

// Generate a grid of planes
interface PlaneGridProps {
  rows: number
  columns: number
  spacingX: number
  spacingY: number
  rotation?: [number, number, number]
  images?: string[]
  fadeStartX?: number
  fadeEndX?: number
  scrollSpeed?: number
}

function PlaneGrid({
  rows,
  columns,
  spacingX,
  spacingY,
  rotation = [0, 0, 0],
  images = [],
  fadeStartX = 5,
  fadeEndX = 15,
  scrollSpeed = 0
}: PlaneGridProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Calculate the width of one grid cycle
  const gridWidth = columns * spacingX

  // Animate the grid scrolling with infinite loop
  useFrame((_state, delta) => {
    if (groupRef.current && scrollSpeed !== 0) {
      groupRef.current.position.x += scrollSpeed * delta

      // Wrap position for infinite scrolling
      if (scrollSpeed < 0 && groupRef.current.position.x < -gridWidth) {
        groupRef.current.position.x += gridWidth
      } else if (scrollSpeed > 0 && groupRef.current.position.x > gridWidth) {
        groupRef.current.position.x -= gridWidth
      }
    }
  })

  const createPlanes = (offsetX: number, keyPrefix: string) => {
    const planes = []
    const xOffset = ((columns - 1) * spacingX) / 2
    const yOffset = ((rows - 1) * spacingY) / 2

    let imageIndex = 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * spacingX - xOffset + offsetX
        const y = row * spacingY - yOffset

        // Skip planes that are past x = -30
        if (x < -30) {
          imageIndex++
          continue
        }

        // Calculate opacity based on x position
        let opacity = 1

        // Support both left-to-right and right-to-left fading
        if (fadeStartX > fadeEndX) {
          // Right-to-left fade (fadeStartX is on the right, fadeEndX is on the left)
          if (x <= fadeEndX) {
            opacity = 0
          } else if (x <= fadeStartX) {
            // Linear interpolation between fadeEndX and fadeStartX
            opacity = (x - fadeEndX) / (fadeStartX - fadeEndX)
          }
        } else {
          // Left-to-right fade (fadeStartX is on the left, fadeEndX is on the right)
          if (x >= fadeEndX) {
            opacity = 0
          } else if (x >= fadeStartX) {
            // Linear interpolation between fadeStartX and fadeEndX
            opacity = 1 - (x - fadeStartX) / (fadeEndX - fadeStartX)
          }
        }

        planes.push(
          <StandingPlane
            key={`${keyPrefix}-plane-${row}-${col}`}
            position={[x, y, 0]}
            imageUrl={images[imageIndex % images.length]}
            opacity={opacity}
          />
        )

        imageIndex++
      }
    }

    return planes
  }

  return (
    <group ref={groupRef} rotation={rotation}>
      {/* Create multiple copies of the grid for seamless looping */}
      {createPlanes(0, 'grid-0')}
      {createPlanes(gridWidth, 'grid-1')}
      {scrollSpeed < 0 && createPlanes(-gridWidth, 'grid-2')}
    </group>
  )
}

const ThreeJSBanner = () => {
  // Array of image URLs for the planes
  const images: string[] = [
    '/images/games_examples/game.png',
    '/images/games_examples/game1.png',
    '/images/games_examples/game3.png',
    '/images/games_examples/game4.png',
    '/images/games_examples/game5.png',
    '/images/games_examples/game6.png',
    '/images/games_examples/game7.png',
    '/images/games_examples/game8.png',
    '/images/games_examples/game9.png',
    '/images/games_examples/game10.png',
    '/images/games_examples/game11.png',
    '/images/games_examples/game12.png',
    '/images/games_examples/game13.png',
    '/images/games_examples/game14.png',
    '/images/games_examples/game15.png',
  ]

  return (
    <div className="w-full h-175">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={100} rotation={[0, 0.2*Math.PI, 0]} />
        {/* <OrbitControls enableZoom={true} /> */}

        {/* Lighting */}
        <ambientLight intensity={1} />
        {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}

        {/* 3D Objects */}
        <PlaneGrid
          rows={3}
          columns={10}
          spacingX={4.5}
          spacingY={3.5}
          rotation={[0, 0.0, 0]}
          images={images}
          fadeStartX={0}
          fadeEndX={-20}
          scrollSpeed={-0.1}
        />
      </Canvas>
    </div>
  )
}

export default ThreeJSBanner