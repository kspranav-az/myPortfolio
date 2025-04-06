"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Award,
  Languages,
  Activity,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Calendar,
  ExternalLink, Database,
} from "lucide-react"

import { useResume } from "./resume-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

export function Resume({ activeSection, setActiveSection }) {
  const resume = useResume()
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="w-full h-full overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-teal-900/30">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">

            <div>
              <h1 className="text-xl font-bold text-white">{resume.personal.name}</h1>
              <p className="text-sm text-teal-300">{resume.personal.title}</p>
            </div>
          </div>

          <nav className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <NavTabs activeSection={activeSection} setActiveSection={setActiveSection} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeSection === "about" && <AboutSection key="about" />}
          {activeSection === "experience" && <ExperienceSection key="experience" />}
          {activeSection === "education" && <EducationSection key="education" />}
          {activeSection === "projects" && <ProjectsSection key="projects" />}
          {activeSection === "publications" && <PublicationsSection key="publications" />}
          {activeSection === "skills" && <SkillsSection key="skills" />}
          {activeSection === "more" && <MoreSection key="more" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

// Navigation tabs
function NavTabs({ activeSection, setActiveSection }) {
  const tabs = [
    { id: "about", label: "About", icon: <User className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { id: "publications", label: "Research", icon: <FileText className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Award className="w-4 h-4" /> },
    { id: "more", label: "More", icon: <Activity className="w-4 h-4" /> },
  ]

  return (
    <Tabs value={activeSection} onValueChange={setActiveSection}>
      <TabsList className="bg-gray-900/50 border border-teal-900/30">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 ${
              activeSection === tab.id ? "bg-teal-900/30 text-teal-300" : "text-gray-400"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

// About section
function AboutSection() {
  const { personal, skills } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="bg-gray-900/50 border-teal-900/30 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-600 mb-4 bg-purple-900/30">
                <img
                    src="/1707661782022.jpg" // Replace this with your actual image URL or path
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white">{personal.name}</h2>
              <p className="text-teal-400">{personal.title}</p>
        </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href={`mailto:${personal.email}`} className="text-white hover:text-teal-300 transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href={`tel:${personal.phone}`} className="text-white hover:text-teal-300 transition-colors">
                      {personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <MapPin className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{personal.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Linkedin className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-300 transition-colors flex items-center gap-1"
                    >
                      @linkedin <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Github className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-300 transition-colors flex items-center gap-1"
                    >
                      @github <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Code className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LeetCode</p>
                    <a
                        href={personal.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-300 transition-colors flex items-center gap-1"
                    >
                      @leetcode <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Linkedin className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-300 transition-colors flex items-center gap-1"
                    >
                      @linkedin <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-teal-900/30 p-2 rounded-full">
                    <Database className="w-4 h-4 text-teal-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Kaggle</p>
                    <a
                        href={personal.kaggle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-300 transition-colors flex items-center gap-1"
                    >
                      @kaggle <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                </div>
              </div>



            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="bg-gray-900/50 border-teal-900/30 h-full">
            <CardHeader>
              <CardTitle className="text-white">About Me</CardTitle>
              <CardDescription className="text-gray-400">Data Scientist & Machine Learning Specialist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">
                I'm a data scientist specializing in machine learning, deep learning, and natural language processing.
                With a strong foundation in both the theoretical and applied aspects of AI, I develop innovative solutions
                to complex, real-world problems. I'm deeply curious by nature and driven by a passion for learning, building,
                and improving. I believe that technology, when thoughtfully applied, has the power to create meaningful change
                — and that’s what I strive for in every project I take on.
              </p>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.specialization.map((skill, index) => (
                    <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Core Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-teal-400 mb-2">Languages</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {skills.languages.slice(0, 5).map((lang, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-teal-500" />
                          {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-teal-400 mb-2">Frameworks</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {skills.frameworks.map((framework, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-teal-500" />
                          {framework}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-teal-400 mb-2">ML Libraries</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {skills.libraries.slice(0, 5).map((lib, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-teal-500" />
                          {lib}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

// Experience section
function ExperienceSection() {
  const { experience } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Professional Experience</h2>

      <div className="space-y-6">
        {experience.map((job, index) => (
          <Card key={index} className="bg-gray-900/50 border-teal-900/30 overflow-hidden">
            <div className="border-l-4 border-teal-600 pl-6 py-6 pr-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <p className="text-teal-400">{job.company}</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">{job.period}</span>
                </div>
              </div>

              <ul className="space-y-2 text-gray-300">
                {job.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

// Education section
function EducationSection() {
  const { education } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Education</h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card key={index} className="bg-gray-900/50 border-teal-900/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                  <p className="text-teal-400">{edu.degree}</p>
                </div>
                <div className="flex flex-col items-end mt-2 md:mt-0">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-400">Graduation: {edu.graduation}</span>
                  </div>
                  <div className="mt-1">
                    <Badge className="bg-teal-900/30 text-teal-300 border-teal-500/30">GPA: {edu.gpa}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

// Projects section
function ProjectsSection() {
  const { projects } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="bg-gray-900/50 border-teal-900/30 h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{project.title}</CardTitle>
                <Badge className="bg-teal-900/30 text-teal-300 border-teal-500/30">{project.date}</Badge>
              </div>
              <CardDescription className="text-gray-400">{project.technologies}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-300">
                {project.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

// Publications section
function PublicationsSection() {
  const { publications } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Research & Publications</h2>

      <div className="space-y-6">
        {publications.map((pub, index) => (
          <Card key={index} className="bg-gray-900/50 border-teal-900/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{pub.title}</h3>
                <Badge className="mt-2 md:mt-0 w-fit bg-teal-900/30 text-teal-300 border-teal-500/30">{pub.date}</Badge>
              </div>
              <p className="text-sm text-gray-400 mb-2">{pub.technologies}</p>
              <p className="text-gray-300">{pub.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

// Skills section
function SkillsSection() {
  const { skills } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Technical Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Programming Languages */}
        <Card className="bg-gray-900/50 border-teal-900/30">
          <CardHeader>
            <CardTitle className="text-white">Programming Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((lang, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Frameworks & Libraries */}
        <Card className="bg-gray-900/50 border-teal-900/30">
          <CardHeader>
            <CardTitle className="text-white">Frameworks & Libraries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((framework, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {framework}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ML & Data Science Libraries */}
        <Card className="bg-gray-900/50 border-teal-900/30">
          <CardHeader>
            <CardTitle className="text-white">ML & Data Science</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.libraries.map((lib, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {lib}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DevOps & Cloud */}
        <Card className="bg-gray-900/50 border-teal-900/30">
          <CardHeader>
            <CardTitle className="text-white">DevOps & Cloud</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((tool, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {tool}
                </Badge>
              ))}
              {skills.cloud.map((tool, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card className="bg-gray-900/50 border-teal-900/30">
          <CardHeader>
            <CardTitle className="text-white">Specialization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.specialization.map((area, index) => (
                <Badge key={index} className="bg-teal-900/30 text-teal-300 border-teal-500/30">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

// More section (certifications, languages, activities)
function MoreSection() {
  const { certifications, languages, activities } = useResume()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Certifications */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-start gap-3 bg-gray-900/30 p-4 rounded-lg border border-teal-900/20">
              <Award className="w-5 h-5 text-teal-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">{cert.title}</h3>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Languages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang, index) => (
            <div key={index} className="flex items-start gap-3 bg-gray-900/30 p-4 rounded-lg border border-teal-900/20">
              <Languages className="w-5 h-5 text-teal-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">{lang.name}</h3>
                <p className="text-sm text-gray-400">{lang.proficiency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Extra-Curricular Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 bg-gray-900/30 p-4 rounded-lg border border-teal-900/20">
              <Activity className="w-5 h-5 text-teal-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">{activity.title}</h3>
                <p className="text-sm text-gray-400">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

