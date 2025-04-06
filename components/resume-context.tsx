"use client"

import { createContext, useContext, type ReactNode } from "react"

// Define the resume data structure
export type Experience = {
  title: string
  company: string
  period: string
  description: string[]
}

export type Project = {
  title: string
  technologies: string
  date: string
  description: string[]
}

export type Publication = {
  title: string
  technologies: string
  date: string
  status: string
}

export type Education = {
  institution: string
  degree: string
  gpa: string
  graduation: string
}

export type Certification = {
  title: string
  issuer: string
}

export type Language = {
  name: string
  proficiency: string
}

export type Activity = {
  title: string
  description: string
}

// Resume data based on the provided resume
const resumeData = {
  personal: {
    name: "Pranav Dutthan K S",
    title: "Data Scientist",
    location: "Vellore, Tamilnadu, India",
    phone: "+91-7860555936",
    email: "pranavdutthanks@gmail.com",
    linkedin: "https://www.linkedin.com/in/k-s-pranav",
    github: "https://github.com/kspranav-az",
    leetcode: "https://leetcode.com/u/kspranav-az",
    kaggle: "https://www.kaggle.com/kspranavaz",
  },
  skills: {
    languages: ["Python", "Kotlin", "Java",  "R", "C/C++", "SQL (PL-SQL, MySQL)", "JavaScript", "HTML", "XML", "CSS"],
    frameworks: ["Node.js", "Flask", "Django", "Bootstrap"],
    devops: ["Git", "Docker", "Postman"],
    cloud: ["Linux (Configuring and Managing)"],
    specialization: [
      "Machine Learning",
      "Deep Learning",
      "Large Language Models",
      "Natural Language Processing",
      "Image Processing",
    ],
    libraries: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Keras",
      "Pandas",
      "NumPy",
      "OpenCV",
      "Hugging Face Transformers",
      "NLTK",
      "spaCy",
    ],
  },
  experience: [
    {
      title: "Samsung PRISM Project",
      company: "Collaborator",
      period: "March 2024 - Present",
      description: [
        "Contributed to a collaborative project between Samsung and our college, focusing on solving real-world problems through innovative approaches.",
        "Specialized in domain adaptation, applying machine learning techniques to enhance model performance across different domains.",
        "Developed practical solutions to complex problems, demonstrating proficiency in both theoretical and applied aspects of domain adaptation.",
        "Collaborated with a diverse team of peers, enhancing teamwork and communication skills while tackling engineering and tech development challenges.",
        "Showcased ability to translate academic knowledge into practical solutions, contributing to the advancement of the project goals.",
      ],
    },
    {
  title: "Android & Web Developer",
  company: "Self Employed",
  period: "August 2022 - Present",
  description: [
    "Developed customized Android application for Infinity Fitness, implementing membership management with WhatsApp payment reminders and bill generation, reducing manual follow-ups by 40%.",
    "Engineered Android application for barber shop, focusing on financial management and billing systems.",
    "Implemented cloud backup solutions for both applications, ensuring secure data storage and accessibility of records.",
    "Enhanced booking systems across projects, reducing customer wait times by 30% and improving retention rates.",
    "Collaborated with local taxi service to develop web application, increasing daily trips by 10% through streamlined booking process.",
  ]
}
  ],
  education: [
  {
    institution: "Vellore Institute of Technology, Vellore",
    degree: "M.Tech (Integrated), Computer Science and Engineering (Data Science specialization)",
    gpa: "8.8/10 (3.28/4)",
    graduation: "March 2027",
  },
  {
    institution: "St.Xavier’s High School, Balrampur",
    degree: "Higher Secondary School (12th Grade), CBSE",
    gpa: "92.6%",
    graduation: "2022",
  },
  {
    institution: "St.Xavier’s High School, Balrampur",
    degree: "Secondary School (10th Grade), CBSE",
    gpa: "93.8%",
    graduation: "2020",
  },
]
,
  projects: [
    {
      "title": "Autism Prediction System",
      "technologies": "TensorFlow, VGG16, XGBoost, OpenCV, FastAPI, Go, Next.js",
      "date": "February 2025",
      "description": [
        "Developed a multi-modal detection system combining VGG16 CNN for facial video analysis and XGBoost ensemble for behavioral data, achieving 92% classification accuracy.",
        "Processed facial frames using MTCNN extraction with 88% F1-score for emotion/gesture recognition.",
        "Built scalable backend architecture with Go for core services and FastAPI for model inference.",
        "Created interactive dashboards using Next.js to visualize model predictions and patient insights.",
        "Reduced screening costs by 40% compared to traditional methods in pilot clinical deployments."
      ]
    },
      {
      "title": "E-tutor AI Website",
      "technologies": "Django, Google Colab, Gemini API, TensorFlow, Python",
      "date": "March 2024",
      "description": [
        "Leading the development of E-Tutor, a website leveraging deepfake technology to enhance teacher efficiency in generating educational content from PowerPoint presentations, resulting in a 50% time saving.",
        "Utilizing Large Language Models (LLMs) for doubt-solving, contributing to a 10% increase in efficiency.",
        "Implementing an AI-driven recommendation system to personalize learning experiences for students, leading to an increase in user engagement.",
      ]
    },
      {
      "title": "Brain Tumor Detection",
      "technologies": "TensorFlow, Google Colab, Jupyter Notebook",
      "date": "March 2024",
      "description": [
        "Developed a brain tumor detection model using TensorFlow, leveraging Variational Autoencoder (VAE) within a Generative Adversarial Network (GAN) framework to process MRI and CT images, effectively expanding the dataset.",
        "Implemented VAE for Reversible GAN to convert MRI and CT images, scaling the dataset from 3600 discrete images to 7400 paired images, resulting in a 200% increase in data diversity.",
        "Achieved a 2 to 3% enhancement across all evaluation metrics, including sensitivity, specificity, and accuracy, subsequent to the augmentation of the dataset with 3600 additional images.",
      ]
    },{
      "title": "MRI-CT Scan Translation",
      "technologies": "TensorFlow, CycleGAN, Variational Autoencoders",
      "date": "January 2024",
      "description": [
        "Created hybrid VAE-CycleGAN model for medical image translation between MRI and CT modalities.",
        "Achieved SSIM score of 0.89 on unpaired dataset translation tasks.",
        "Developed pipeline reducing radiologist annotation time by 30% through synthetic data generation."
      ]
    },
    {
      "title": "Infinity Fitness",
      "technologies": "Kotlin, XML, Room Database, WhatsApp API",
      "date": "September 2024",
      "description": [
        "Built gym management app with WhatsApp integration for automated billing and payment reminders.",
        "Implemented due date alert system sending notifications directly to members' WhatsApp.",
        "Configured daily Firebase backups of Room Database to prevent data loss.",
      ]
    },

      {
  "title": "Document Understanding Bot (RAG)",
  "technologies": "Python, Hugging Face Transformers, FAISS, TensorFlow",
  "date": "June 2024",
  "description": [
    "Developed RAG-based document Q&A system supporting PDF/DOCX/TXT files",
    "Implemented FAISS vector search for document retrieval & BART/T5 for answer generation",
    "Enabled context-aware question answering from uploaded documents with 85% relevance score"
  ]
      },
      {
      "title": "CryptoCommerce",
      "technologies": "Blockchain, Solidity, React.js, RFID, NodeMCU",
      "date": "December 2023",
      "description": [
        "Built blockchain-based e-commerce platform with RFID product authentication.",
        "Implemented tamper detection system using ultrasonic sensors (99% accuracy).",
        "Developed cryptocurrency payment integration with Ethereum smart contracts."
      ]
    },
      {
      "title": "AR/VR Zoo",
      "technologies": "Python, OpenCV, ArUco, PyOpenGL",
      "date": "November 2023",
      "description": [
        "Created marker-based AR experience projecting 3D animal models using ArUco markers.",
        "Integrated voice control via Google Speech API for interactive commands.",
        "Developed cross-platform support for both desktop and VR headset displays."
      ]
    },
    {
      "title": "GeoLocator Application",
      "technologies": "Python, Kotlin, XML, Android Studio",
      "date": "August 2023",
      "description": [
        "Engineered a geotagging-based application, pioneering its creation for research purposes and contributing expertise to both front-end and back-end development.",
        "Enhanced location accuracy by 25% compared to existing solutions through algorithm optimization.",
        "Revolutionized the operational workflow by transitioning from a manual system to a digital platform, reducing work time by approximately 75%, thereby substantially boosting operational efficiency.",
      ]
    },
    {
      "title": "Leo Call Taxi Website",
      "technologies": "Django, HTML, CSS, SQL",
      "date": "March 2023",
      "description": [
        "Designed and developed an interactive website for a local cab company using Django to convert 80 to 100% customers to online mode.",
        "Incorporated a user-friendly booking system, aimed at a 40% increase in online bookings within the first month of launch",
        "Optimized website performance and responsiveness, leading to a 20% reduction in bounce rate.",
      ]
    },


  ]
,
  publications: [
    {
      title:
        "Analyzing the Impact of Unexpected Climate Changes: A Machine Learning Method for Improved Crop Prediction",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status:
        "Accepted at International Conference of Progressive Computational Intelligence, Information Technology, and Networking (COM-IT-CON 2024).",
    },
    {
      title: "UV-CyGAN: High Score Bi-Direction Biomedical Image Translation",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status: "Under Publication",
    },
    {
      title: "The Role of Machine Learning and Deep Learning in Drug Discovery",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status: "Under Publication",
    },
    {
      title: "TileSwap-SSG: A Novel Approach to Domain Adaptation",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status: "Under Publication",
    },
    {
      title: "Meta-Heuristic Based Bug Detection",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status: "Under Publication",
    },
    {
      title: "BlNet PSS: A Method for Protein Secondary Structure Prediction Using Bi-Directional LSTM Networks",
      technologies: "TensorFlow, Google Colab, Jupyter Notebook",
      date: "NOV 2024",
      status: "Under Publication",
    },
  ],
  certifications: [
    { title: "Machine Learning Specialization", issuer: "DeepLearning.AI" },
    { title: "Advanced Learning Algorithm", issuer: "DeepLearning.AI" },
    { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI" },
    { title: "Unsupervised Machine Learning", issuer: "DeepLearning.AI" },
    { title: "SQL (Intermediate)", issuer: "HackerRank" },
    { title: "Java (Basic)", issuer: "HackerRank" },
    { title: "Python (Basic)", issuer: "HackerRank" },
  ],
  languages: [
    { name: "English", proficiency: "Professional proficiency" },
    { name: "Hindi", proficiency: "Native speaker" },
    { name: "Tamil", proficiency: "Native speaker" },
    { name: "Malayalam", proficiency: "Native speaker" },
  ],
  activities: [
    { title: "Smart India Hackathon", description: "Qualified Internal Hackathon among 200+ teams" },
    { title: "HackBattle (IEEE-CS)", description: "Finalist were placed in top 7" },
    { title: "Taekwondo", description: "Black Belt" },
  ],
}

// Define the context type
type ResumeContextType = {
  personal: typeof resumeData.personal
  skills: typeof resumeData.skills
  experience: Experience[]
  education: Education[]
  projects: Project[]
  publications: Publication[]
  certifications: Certification[]
  languages: Language[]
  activities: Activity[]
}

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

// Provider component
export function ResumeProvider({ children }: { children: ReactNode }) {
  return <ResumeContext.Provider value={resumeData}>{children}</ResumeContext.Provider>
}

// Custom hook to use the resume context
export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}

