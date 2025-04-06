"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, Github, ExternalLink, Code, Database, Smartphone, CuboidIcon as Cube } from "lucide-react"
import { usePortfolio } from "./portfolio-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function UI({ activeProject, setActiveProject, loading }) {
  const { getProjectById, bio } = usePortfolio()
  const [showIntro, setShowIntro] = useState(true)

  // Get the active project details
  const project = activeProject ? getProjectById(activeProject) : null

  // Hide intro when a project is selected
  useEffect(() => {
    if (activeProject) {
      setShowIntro(false)
    }
  }, [activeProject])

  // Close project detail view
  const handleClose = () => {
    setActiveProject(null)
  }

  // Get icon for project type
  const getProjectTypeIcon = (type) => {
    switch (type) {
      case "web":
        return <Code className="h-4 w-4" />
      case "data":
        return <Database className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "3d":
        return <Cube className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-2xl font-bold">
              <span className="text-purple-500">3D</span> Portfolio
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && !loading && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md text-center p-8 bg-black/70 backdrop-blur-md rounded-xl pointer-events-auto">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                {bio.name}
              </h1>
              <h2 className="text-xl text-white mb-4">{bio.title}</h2>
              <p className="text-gray-300 mb-6">{bio.description}</p>
              <Button onClick={() => setShowIntro(false)} className="bg-purple-600 hover:bg-purple-700">
                Explore Portfolio
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation help */}
      <div className="fixed bottom-4 left-4 text-white text-sm bg-black/50 backdrop-blur-sm p-2 rounded-md z-30">
        <p>Click and drag to rotate • Scroll to zoom</p>
      </div>

      {/* Project detail panel */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-black/90 backdrop-blur-md z-40 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-purple-500/20">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-purple-500/20">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {project && (
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-purple-500/50 text-white">
                        <div className="flex items-center gap-1">
                          {getProjectTypeIcon(project.type)}
                          <span>{project.type}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                    <p className="text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-purple-500/10 text-purple-300 border-purple-500/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.github && (
                        <Button asChild variant="outline" className="border-gray-700 hover:border-purple-500">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.link && (
                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bio button */}
      <Button
        className="fixed top-4 left-4 bg-black/50 backdrop-blur-sm hover:bg-purple-500/50 z-30"
        onClick={() => setShowIntro(true)}
      >
        About Me
      </Button>
    </>
  )
}

