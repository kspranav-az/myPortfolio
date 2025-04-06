"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Database, Brain, LineChart, Server, Code } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState("data-analysis")

  const skillCategories = [
    {
      id: "data-analysis",
      name: "Data Analysis",
      icon: <BarChart className="h-5 w-5" />,
      skills: [
        { name: "Python", proficiency: 90 },
        { name: "R", proficiency: 85 },
        { name: "SQL", proficiency: 80 },
        { name: "Excel/Spreadsheets", proficiency: 95 },
        { name: "Tableau", proficiency: 85 },
        { name: "Power BI", proficiency: 80 },
      ],
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      icon: <Brain className="h-5 w-5" />,
      skills: [
        { name: "Scikit-Learn", proficiency: 85 },
        { name: "TensorFlow", proficiency: 75 },
        { name: "PyTorch", proficiency: 70 },
        { name: "Regression", proficiency: 90 },
        { name: "Classification", proficiency: 85 },
        { name: "Clustering", proficiency: 80 },
      ],
    },
    {
      id: "data-engineering",
      name: "Data Engineering",
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: "ETL Pipelines", proficiency: 80 },
        { name: "Airflow", proficiency: 75 },
        { name: "Spark", proficiency: 70 },
        { name: "Hadoop", proficiency: 65 },
        { name: "MongoDB", proficiency: 75 },
        { name: "PostgreSQL", proficiency: 85 },
      ],
    },
    {
      id: "statistics",
      name: "Statistics",
      icon: <LineChart className="h-5 w-5" />,
      skills: [
        { name: "Hypothesis Testing", proficiency: 90 },
        { name: "Bayesian Statistics", proficiency: 80 },
        { name: "Time Series Analysis", proficiency: 85 },
        { name: "A/B Testing", proficiency: 90 },
        { name: "Experimental Design", proficiency: 80 },
        { name: "Statistical Modeling", proficiency: 85 },
      ],
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: <Server className="h-5 w-5" />,
      skills: [
        { name: "AWS", proficiency: 75 },
        { name: "Google Cloud", proficiency: 70 },
        { name: "Docker", proficiency: 80 },
        { name: "Kubernetes", proficiency: 65 },
        { name: "CI/CD", proficiency: 70 },
        { name: "Terraform", proficiency: 60 },
      ],
    },
    {
      id: "programming",
      name: "Programming",
      icon: <Code className="h-5 w-5" />,
      skills: [
        { name: "Python", proficiency: 90 },
        { name: "R", proficiency: 85 },
        { name: "JavaScript", proficiency: 75 },
        { name: "Java", proficiency: 65 },
        { name: "Bash/Shell", proficiency: 70 },
        { name: "C/C++", proficiency: 60 },
      ],
    },
  ]

  return (
    <Tabs defaultValue="data-analysis" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-gray-800">
        {skillCategories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="flex items-center gap-2 data-[state=active]:bg-gray-700"
          >
            {category.icon}
            <span className="hidden md:inline">{category.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {skillCategories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 text-center">{category.name} Skills</h3>
              <div className="grid gap-6">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

