"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"
import { Float } from "@react-three/drei"

// Data point component
const DataPoint = ({ position, color, size = 0.05 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

// Connection line between data points
const Connection = ({ start, end, color }) => {
  const points = useMemo(() => [start, end], [start, end])

  return (
    <line>
      <bufferGeometry attach="geometry">
        <float32BufferAttribute attach="attributes-position" args={[new Float32Array([...start, ...end]), 3]} />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} opacity={0.4} transparent />
    </line>
  )
}

export function DataSphere() {
  const groupRef = useRef()

  // Generate random data points
  const dataPoints = useMemo(() => {
    const points = []
    const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4"]

    for (let i = 0; i < 100; i++) {
      // Create points in a spherical distribution
      const theta = MathUtils.randFloat(0, Math.PI * 2)
      const phi = MathUtils.randFloat(0, Math.PI)
      const radius = MathUtils.randFloat(1.5, 2.5)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      points.push({
        position: [x, y, z],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: MathUtils.randFloat(0.02, 0.08),
      })
    }

    return points
  }, [])

  // Generate connections between some data points
  const connections = useMemo(() => {
    const lines = []
    const numConnections = 80

    for (let i = 0; i < numConnections; i++) {
      const pointA = Math.floor(Math.random() * dataPoints.length)
      let pointB = Math.floor(Math.random() * dataPoints.length)

      // Ensure we don't connect a point to itself
      while (pointB === pointA) {
        pointB = Math.floor(Math.random() * dataPoints.length)
      }

      lines.push({
        start: dataPoints[pointA].position,
        end: dataPoints[pointB].position,
        color: "#6366f1",
      })
    }

    return lines
  }, [dataPoints])

  // Animate the sphere
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Render data points */}
        {dataPoints.map((point, index) => (
          <DataPoint key={`point-${index}`} position={point.position} color={point.color} size={point.size} />
        ))}

        {/* Render connections */}
        {connections.map((connection, index) => (
          <Connection
            key={`connection-${index}`}
            start={connection.start}
            end={connection.end}
            color={connection.color}
          />
        ))}
      </group>
    </Float>
  )
}

