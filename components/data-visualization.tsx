"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, Text3D, Line, Sphere, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei"
import { MathUtils } from "three"

// Neural network visualization
export function DataVisualization({ activeSection }) {
  const { camera } = useThree()
  const groupRef = useRef()

  // Add proper cleanup for animation frames
  useEffect(() => {
    return () => {
      // This will clean up any animation frames when component unmounts
      if (groupRef.current) {
        groupRef.current = null
      }
    }
  }, [])

  // Generate nodes for neural network
  const layers = [4, 8, 12, 8, 4] // Number of nodes in each layer
  const layerDistance = 4 // Distance between layers
  const nodeDistance = 2 // Distance between nodes in the same layer

  // Generate nodes and connections
  const { nodes, connections } = useMemo(() => {
    const nodesArray = []
    const connectionsArray = []

    // Create nodes
    layers.forEach((nodeCount, layerIndex) => {
      const x = (layerIndex - (layers.length - 1) / 2) * layerDistance

      for (let i = 0; i < nodeCount; i++) {
        const y = (i - (nodeCount - 1) / 2) * nodeDistance
        nodesArray.push({
          position: [x, y, 0],
          layerIndex,
          nodeIndex: i,
          size: MathUtils.randFloat(0.1, 0.2),
          color: getColorForSection(activeSection),
        })
      }
    })

    // Create connections between layers
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNodes = nodesArray.filter((node) => node.layerIndex === l)
      const nextLayerNodes = nodesArray.filter((node) => node.layerIndex === l + 1)

      currentLayerNodes.forEach((startNode) => {
        nextLayerNodes.forEach((endNode) => {
          // Add connection with some randomness to avoid connecting all nodes
          if (Math.random() > 0.3) {
            connectionsArray.push({
              start: startNode.position,
              end: endNode.position,
              color: getColorForSection(activeSection),
              opacity: MathUtils.randFloat(0.2, 0.6), // Increased opacity
            })
          }
        })
      })
    }

    return { nodes: nodesArray, connections: connectionsArray }
  }, [layers, activeSection])

  // Animate the neural network
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate slowly
      groupRef.current.rotation.y += delta * 0.1

      // Adjust position based on active section
      const targetZ = activeSection === "about" ? 0 : -5
      groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05)
    }
  })

  // Add floating particles
  const particleCount = 100 // Increased particle count
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      position: [MathUtils.randFloatSpread(30), MathUtils.randFloatSpread(30), MathUtils.randFloatSpread(30)],
      size: MathUtils.randFloat(0.05, 0.2),
      speed: MathUtils.randFloat(0.02, 0.08), // Increased speed
      color: getColorForSection(activeSection, true),
    }))
  }, [activeSection])

  return (
    <>
      {/* Main neural network */}
      <group ref={groupRef}>
        {/* Nodes */}
        {nodes.map((node, index) => (
          <NeuralNode
            key={`node-${index}`}
            position={node.position}
            size={node.size}
            color={node.color}
            activeSection={activeSection}
          />
        ))}

        {/* Connections */}
        {connections.map((connection, index) => (
          <NeuralConnection
            key={`connection-${index}`}
            start={connection.start}
            end={connection.end}
            color={connection.color}
            opacity={connection.opacity}
          />
        ))}
      </group>

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <FloatingParticle
          key={`particle-${index}`}
          position={particle.position}
          size={particle.size}
          speed={particle.speed}
          color={particle.color}
        />
      ))}

      {/* Section title in 3D */}
      <SectionTitle activeSection={activeSection} />
    </>
  )
}

// Neural network node
function NeuralNode({ position, size, color, activeSection }) {
  const meshRef = useRef()

  // Pulse effect
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        roughness={0.05}
        transmission={0.95}
        ior={1.5}
        chromaticAberration={0.06}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.2}
        color={color}
        emissive={color}
        emissiveIntensity={3} // Increased intensity
      />
    </Sphere>
  )
}

// Connection between nodes
function NeuralConnection({ start, end, color, opacity }) {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={1.5} // Increased line width
      opacity={opacity}
      transparent
    />
  )
}

// Floating particle
function FloatingParticle({ position, size, speed, color }) {
  const meshRef = useRef()
  const initialPosition = useMemo(() => position, [position])

  useFrame((state) => {
    if (meshRef.current) {
      // Float upward
      meshRef.current.position.y += speed

      // Reset position when it goes too high
      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15
        meshRef.current.position.x = MathUtils.randFloatSpread(30)
        meshRef.current.position.z = MathUtils.randFloatSpread(30)
      }

      // Add some horizontal movement
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + initialPosition[0]) * 0.01
      meshRef.current.position.z += Math.cos(state.clock.elapsedTime * 0.5 + initialPosition[2]) * 0.01
    }
  })

  return (
    <Sphere ref={meshRef} position={initialPosition} args={[size, 8, 8]}>
      <meshBasicMaterial color={color} transparent opacity={0.8} /> {/* Increased opacity */}
    </Sphere>
  )
}

// 3D section title
function SectionTitle({ activeSection }) {
  const titleRef = useRef()
  const [title, setTitle] = useState("")

  // Update title based on active section
  useEffect(() => {
    switch (activeSection) {
      case "about":
        setTitle("About")
        break
      case "experience":
        setTitle("Experience")
        break
      case "education":
        setTitle("Education")
        break
      case "projects":
        setTitle("Projects")
        break
      case "publications":
        setTitle("Research")
        break
      case "skills":
        setTitle("Skills")
        break
      default:
        setTitle("Portfolio")
    }
  }, [activeSection])

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
      <Text3D
        ref={titleRef}
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-5, 5, -10]}
      >
        {title}
        <MeshDistortMaterial
          color={getColorForSection(activeSection)}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.5}
          distort={0.2}
          speed={1.5}
        />
      </Text3D>
    </Float>
  )
}

// Helper function to get color based on section
function getColorForSection(section, isParticle = false) {
  switch (section) {
    case "about":
      return isParticle ? "#9333ea" : "#a855f7" // Brighter purple
    case "experience":
      return isParticle ? "#2563eb" : "#3b82f6" // Brighter blue
    case "education":
      return isParticle ? "#059669" : "#10b981" // Brighter green
    case "projects":
      return isParticle ? "#d97706" : "#f59e0b" // Brighter amber
    case "publications":
      return isParticle ? "#db2777" : "#ec4899" // Brighter pink
    case "skills":
      return isParticle ? "#0891b2" : "#06b6d4" // Brighter cyan
    default:
      return isParticle ? "#9333ea" : "#a855f7" // Brighter purple
  }
}

