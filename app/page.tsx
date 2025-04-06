"use client"

import { useState, useEffect } from "react"
import { Resume } from "@/components/resume"
import { ResumeProvider } from "@/components/resume-context"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [loading, setLoading] = useState(true)

  // Add a cleanup function to prevent memory leaks
  useEffect(() => {
    // Set a more reasonable timeout for loading
    const timer = setTimeout(() => setLoading(false), 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <ResumeProvider>
      <div className="w-full h-screen bg-gray-950 overflow-hidden">
        {/* Static Background Image */}
        <div className="fixed inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url("/images/neural-network-bg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950/90" />
        </div>

        {/* Resume Content */}
        <div className="relative z-10 w-full h-full">
          <Resume activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Loading Screen */}
        {loading && (
          <div
            className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center"
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            <div className="text-white text-2xl font-bold flex items-center">
              <span className="text-teal-500 mr-2">Pranav's</span> Portfolio
              <span className="ml-2 animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>
    </ResumeProvider>
  )
}

