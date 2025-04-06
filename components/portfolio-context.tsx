"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the portfolio data structure
export type PortfolioItem = {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  github?: string
  type: "web" | "data" | "mobile" | "design" | "3d"
  featured?: boolean
}

// Sample portfolio data
const portfolioData: PortfolioItem[] = [
  {
    id: "project1",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with filtering and real-time updates.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "D3.js", "Python", "Flask"],
    link: "https://example.com/project1",
    github: "https://github.com/yourusername/project1",
    type: "data",
    featured: true,
  },
  {
    id: "project2",
    title: "Machine Learning Model",
    description: "Predictive analytics model for customer segmentation with 95% accuracy.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
    github: "https://github.com/yourusername/project2",
    type: "data",
    featured: true,
  },
  {
    id: "project3",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and inventory management.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/project3",
    github: "https://github.com/yourusername/project3",
    type: "web",
    featured: true,
  },
  {
    id: "project4",
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking and workout planning.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    link: "https://example.com/project4",
    type: "mobile",
  },
  {
    id: "project5",
    title: "Natural Language Processing Tool",
    description: "Text analysis tool for sentiment analysis and entity recognition.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Python", "NLTK", "spaCy", "Flask"],
    github: "https://github.com/yourusername/project5",
    type: "data",
  },
  {
    id: "project6",
    title: "3D Product Configurator",
    description: "Interactive 3D product customization tool for e-commerce.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Three.js", "React", "WebGL", "GLSL"],
    link: "https://example.com/project6",
    github: "https://github.com/yourusername/project6",
    type: "3d",
  },
  {
    id: "project7",
    title: "Blockchain Analytics Platform",
    description: "Real-time analytics dashboard for blockchain transactions and smart contracts.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Ethereum", "Web3.js", "React", "Node.js"],
    link: "https://example.com/project7",
    type: "web",
  },
  {
    id: "project8",
    title: "Augmented Reality Experience",
    description: "AR application for educational purposes with interactive 3D models.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Unity", "ARKit", "ARCore", "C#"],
    link: "https://example.com/project8",
    type: "3d",
  },
]

// Define the context type
type PortfolioContextType = {
  projects: PortfolioItem[]
  featuredProjects: PortfolioItem[]
  getProjectById: (id: string) => PortfolioItem | undefined
  getProjectsByType: (type: string) => PortfolioItem[]
  bio: {
    name: string
    title: string
    description: string
    skills: string[]
    contact: {
      email: string
      github: string
      linkedin: string
    }
  }
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

// Provider component
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects] = useState<PortfolioItem[]>(portfolioData)

  const featuredProjects = projects.filter((project) => project.featured)

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id)
  }

  const getProjectsByType = (type: string) => {
    return projects.filter((project) => project.type === type)
  }

  const bio = {
    name: "Your Name",
    title: "Data Scientist & Full Stack Developer",
    description:
      "I specialize in creating data-driven applications and visualizations that help businesses make better decisions. With expertise in both front-end and back-end technologies, as well as machine learning and data analysis, I build comprehensive solutions from concept to deployment.",
    skills: [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "TensorFlow",
      "Data Visualization",
      "Machine Learning",
      "SQL",
      "NoSQL",
      "Cloud Computing",
      "API Development",
      "Three.js",
    ],
    contact: {
      email: "your.email@example.com",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourprofile",
    },
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        featuredProjects,
        getProjectById,
        getProjectsByType,
        bio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

// Custom hook to use the portfolio context
export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}

