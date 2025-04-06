"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  useTexture,
  Text3D,
  Float,
  MeshTransmissionMaterial,
  MeshReflectorMaterial,
  MeshDistortMaterial,
  Sphere,
  Box,
  RoundedBox,
  Html,
} from "@react-three/drei"
import { type Group, type Mesh, MathUtils } from "three"
import { usePortfolio } from "./portfolio-context"
import { ProjectDisplay } from "./project-display"

export function PortfolioScene({ setActiveProject, setCameraPosition }) {
  const { featuredProjects, projects } = usePortfolio()
  const { camera } = useThree()
  const groupRef = useRef<Group>()
  const floorRef = useRef<Mesh>()

  // State to track which project is being hovered
  const [hoveredProject, setHoveredProject] = useState(null)

  // Add cleanup for animation frames
  useEffect(() => {
    return () => {
      if (groupRef.current) {
        groupRef.current = null
      }
      if (floorRef.current) {
        floorRef.current = null
      }
    }
  }, [])

  // Handle project selection
  const handleProjectSelect = (projectId) => {
    setActiveProject(projectId)

    // Move camera to focus on the selected project
    const projectIndex = projects.findIndex((p) => p.id === projectId)
    if (projectIndex !== -1) {
      const angle = (projectIndex / projects.length) * Math.PI * 2
      const newPosition = [Math.sin(angle) * 8, 3, Math.cos(angle) * 8]
      setCameraPosition(newPosition)
    }
  }

  // Rotate the entire scene slowly
  useFrame((state, delta) => {
    if (groupRef.current && !hoveredProject) {
      groupRef.current.rotation.y += delta * 0.05
    }

    // Add subtle movement to the floor
    if (floorRef.current) {
      floorRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 - 5
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={!hoveredProject}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Main rotating group containing all portfolio items */}
      <group ref={groupRef}>
        {/* Central floating name/title */}
        <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
          <group position={[0, 2, 0]}>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={1.5}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
              position={[-5, 0, 0]}
            >
              Portfolio
              <MeshDistortMaterial
                color="#8b5cf6"
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.5}
                distort={0.2}
                speed={1.5}
              />
            </Text3D>
          </group>
        </Float>

        {/* Portfolio projects displayed in a circle */}
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2
          const radius = 10
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius

          return (
            <ProjectObject
              key={project.id}
              project={project}
              position={[x, 0, z]}
              rotation={[0, -angle + Math.PI, 0]}
              onSelect={() => handleProjectSelect(project.id)}
              onHover={(hovered) => setHoveredProject(hovered ? project.id : null)}
              featured={project.featured}
            />
          )
        })}
      </group>

      {/* Reflective floor */}
      <mesh ref={floorRef} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
        />
      </mesh>

      {/* Ambient particles */}
      <Particles count={200} />
    </>
  )
}

// Individual project display object
function ProjectObject({ project, position, rotation, onSelect, onHover, featured }) {
  const meshRef = useRef<Mesh>()
  const [hovered, setHovered] = useState(false)

  // Load project thumbnail texture
  const texture = useTexture(project.image)

  // Handle hover state
  const handlePointerOver = () => {
    setHovered(true)
    onHover(true)
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover(false)
    document.body.style.cursor = "auto"
  }

  // Animate on hover
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Scale up slightly when hovered
      meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.1 : 1, 0.1)
      meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, hovered ? 1.1 : 1, 0.1)
      meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, hovered ? 1.1 : 1, 0.1)

      // Add subtle floating motion
      if (!hovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      } else {
        meshRef.current.position.y = position[1] + 0.5
      }
    }
  })

  // Different display types based on project type
  const getProjectDisplay = () => {
    switch (project.type) {
      case "web":
        return (
          <RoundedBox args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={hovered ? 0.9 : 0.7}
              ior={1.5}
              chromaticAberration={0.06}
            />
            <ProjectDisplay project={project} hovered={hovered} />
          </RoundedBox>
        )
      case "data":
        return (
          <Box args={[2.5, 2.5, 2.5]}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={hovered ? 0.9 : 0.7}
              ior={1.5}
              chromaticAberration={0.06}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.2}
            />
            <ProjectDisplay project={project} hovered={hovered} />
          </Box>
        )
      case "mobile":
        return (
          <RoundedBox args={[1.5, 3, 0.2]} radius={0.2} smoothness={4}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={hovered ? 0.9 : 0.7}
              ior={1.5}
              chromaticAberration={0.06}
            />
            <ProjectDisplay project={project} hovered={hovered} />
          </RoundedBox>
        )
      case "3d":
        return (
          <Sphere args={[1.5, 32, 32]}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={hovered ? 0.9 : 0.7}
              ior={1.5}
              chromaticAberration={0.06}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.2}
            />
            <ProjectDisplay project={project} hovered={hovered} />
          </Sphere>
        )
      default:
        return (
          <Box args={[2, 2, 2]}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={hovered ? 0.9 : 0.7}
              ior={1.5}
              chromaticAberration={0.06}
            />
            <ProjectDisplay project={project} hovered={hovered} />
          </Box>
        )
    }
  }

  return (
    <group position={position} rotation={rotation}>
      <Float floatIntensity={featured ? 2 : 1} rotationIntensity={featured ? 0.5 : 0.2} speed={featured ? 2 : 1}>
        <mesh
          ref={meshRef}
          position={[0, featured ? 1 : 0, 0]}
          onClick={() => onSelect()}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
        >
          {getProjectDisplay()}

          {/* Project title that appears when hovered */}
          {hovered && (
            <Html position={[0, -2, 0]} center distanceFactor={10} occlude>
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-center w-48">
                <h3 className="font-bold text-purple-400">{project.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{project.technologies.join(", ")}</p>
              </div>
            </Html>
          )}
        </mesh>
      </Float>
    </group>
  )
}

// Ambient particles for atmosphere
function Particles({ count = 100 }) {
  const [particles] = useState(() => {
    return Array.from({ length: count }, () => ({
      position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30],
      speed: Math.random() * 0.05 + 0.02,
    }))
  })

  return (
    <group>
      {particles.map((data, i) => (
        <Particle key={i} data={data} />
      ))}
    </group>
  )
}

// Individual particle
function Particle({ data }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Move particle upward and reset when it goes too high
      meshRef.current.position.y += data.speed

      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15
        meshRef.current.position.x = (Math.random() - 0.5) * 30
        meshRef.current.position.z = (Math.random() - 0.5) * 30
      }
    }
  })

  return (
    <mesh ref={meshRef} position={data.position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
    </mesh>
  )
}

// Connection line between data points
const Connection = ({ start, end, color }) => {
  const points = useMemo(() => {
    const pointsArray = new Float32Array([start[0], start[1], start[2], end[0], end[1], end[2]])
    return pointsArray
  }, [start, end])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={points} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} opacity={0.4} transparent />
    </line>
  )
}

// If there's a DataSphere component in this file, replace it with this empty implementation
// since we're not using it in this version of the portfolio
export function DataSphere() {
  return null
}

