"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"

export function ProjectDisplay({ project, hovered }) {
  const meshRef = useRef()
  // Add a fallback for the texture to prevent errors
  const texture = useTexture(project?.image || "/placeholder.svg?height=600&width=800")

  // Different display based on project type
  const renderProjectContent = () => {
    if (!project) return null

    switch (project.type) {
      case "web":
        return (
          <>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial map={texture} transparent opacity={hovered ? 1 : 0.8} />
          </>
        )
      case "data":
        // For data projects, show visualization on each face of the cube
        return (
          <>
            <boxGeometry args={[2.4, 2.4, 2.4]} />
            <meshStandardMaterial map={texture} transparent opacity={hovered ? 1 : 0.8} />
          </>
        )
      case "mobile":
        return (
          <>
            <planeGeometry args={[1.3, 2.8]} />
            <meshBasicMaterial map={texture} transparent opacity={hovered ? 1 : 0.8} />
          </>
        )
      case "3d":
        return (
          <>
            <sphereGeometry args={[1.4, 32, 32]} />
            <meshStandardMaterial map={texture} transparent opacity={hovered ? 1 : 0.8} />
          </>
        )
      default:
        return (
          <>
            <boxGeometry args={[1.9, 1.9, 1.9]} />
            <meshStandardMaterial map={texture} transparent opacity={hovered ? 1 : 0.8} />
          </>
        )
    }
  }

  // Animate the content
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
      if (project?.type === "data" || project?.type === "3d") {
        meshRef.current.rotation.x += delta * 0.1
      }
    }
  })

  return (
    <mesh ref={meshRef} scale={hovered ? 0.9 : 0.8}>
      {renderProjectContent()}
    </mesh>
  )
}

