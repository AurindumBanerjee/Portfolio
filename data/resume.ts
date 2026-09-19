/**
 * Single source of truth for all portfolio content.
 *
 * Every value here is transcribed from the resumes in the repository root
 * (main.tex, IITJ_ML_Resume.pdf, IITJ_SDE_Resume.pdf,
 * Everything_Soft_Skills_Resume_SC.pdf). Where the resumes disagree, main.tex
 * and the 2026 PDFs win, since they are the most recent.
 *
 * Nothing in this file may be invented. If a link or metric is not in a
 * resume, it is omitted rather than guessed.
 */

/** Visual environment assigned to a project. Purely a theme — not a game level. */
export type SceneId =
  | "laboratory"
  | "multimodal-lab"
  | "security"
  | "archive"
  | "observatory"
  | "workshop"
  | "terminal"
  | "datastore";

export interface Profile {
  readonly name: string;
  readonly rollNumber: string;
  readonly degree: string;
  readonly branch: string;
  readonly institute: string;
  /** Short technical positioning statement shown under the name in the hero. */
  readonly tagline: string;
  /** Two-to-three sentence introduction for the hero. */
  readonly intro: string;
  readonly focusAreas: readonly string[];
}

export interface ContactLink {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly icon: "mail" | "phone" | "github" | "linkedin" | "code" | "trophy";
}

export interface EducationRow {
  readonly qualification: string;
  readonly institute: string;
  readonly score: string;
  readonly years: string;
}

export interface ExperienceEntry {
  readonly id: string;
  readonly title: string;
  readonly role: string;
  readonly organisation: string;
  readonly location: string;
  readonly period: string;
  readonly scene: SceneId;
  readonly highlights: readonly string[];
  readonly tech: readonly string[];
}

export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  /** Short subtitle, used on cards. */
  readonly summary: string;
  readonly period: string;
  readonly scene: SceneId;
  /** One-line framing of what problem this addresses, derived from resume bullets. */
  readonly problem: string;
  /** Technical approach bullets, transcribed from the resume. */
  readonly approach: readonly string[];
  readonly tech: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly repo?: string;
  /** Featured projects get large editorial treatment in the showcase. */
  readonly featured: boolean;
}

export interface SkillCategory {
  readonly id: string;
  readonly label: string;
  readonly icon: "code" | "brain" | "eye" | "server" | "database" | "wrench" | "shield";
  readonly items: readonly string[];
}

export interface CourseGroup {
  readonly label: string;
  /** `grade` is present only where the resume records one. */
  readonly courses: readonly { readonly name: string; readonly grade?: string }[];
}

export interface LeadershipEntry {
  readonly role: string;
  readonly organisation: string;
  readonly period: string;
  readonly location?: string;
  /** Sub-roles held within one organisation, newest first. */
  readonly tracks?: readonly { readonly name: string; readonly period: string }[];
  /** What the role actually involved. Omitted where nothing is recorded. */
  readonly detail?: readonly string[];
}

/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: "Aurindum Banerjee",
  rollNumber: "B23CS1006",
  degree: "Bachelor of Technology",
  branch: "Computer Science and Engineering",
  institute: "Indian Institute of Technology, Jodhpur",
  tagline: "LLM adaptation, computer vision, and systems engineering.",
  intro:
    "Final-year CSE undergraduate at IIT Jodhpur. I work on teaching language models domain knowledge they were never trained on, on vision pipelines that run under real constraints, and on systems built close to the metal - shells, databases, and microcontrollers.",
  focusAreas: [
    "LLM domain adaptation",
    "Multimodal prompt optimization",
    "Computer vision",
    "Systems & security",
  ],
};

export const contactLinks: readonly ContactLink[] = [
  {
    label: "Email",
    value: "banerjeeaurindum@gmail.com",
    href: "mailto:banerjeeaurindum@gmail.com",
    icon: "mail",
  },
  {
    label: "Institute email",
    value: "b23cs1006@iitj.ac.in",
    href: "mailto:b23cs1006@iitj.ac.in",
    icon: "mail",
  },
  // Phone deliberately withheld from the public site. Restore this entry to
  // show it again.
  // {
  //   label: "Phone",
  //   value: "+91 97574 74001",
  //   href: "tel:+919757474001",
  //   icon: "phone",
  // },
  {
    label: "GitHub",
    value: "AurindumBanerjee",
    href: "https://github.com/AurindumBanerjee",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "aurindum-banerjee",
    href: "https://www.linkedin.com/in/aurindum-banerjee/",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    value: "AurindumBanerjee",
    href: "https://leetcode.com/u/AurindumBanerjee",
    icon: "code",
  },
  {
    label: "Codeforces",
    value: "Aurindum",
    href: "https://codeforces.com/profile/Aurindum",
    icon: "trophy",
  },
];

export const education: readonly EducationRow[] = [
  {
    qualification: "B.Tech, Computer Science & Engineering",
    institute: "Indian Institute of Technology, Jodhpur",
    score: "9.09 CGPA (current)",
    years: "2023 - Present",
  },
  {
    qualification: "Senior Secondary",
    institute: "CBSE Board",
    score: "97.2%",
    years: "2022",
  },
  {
    qualification: "Secondary",
    institute: "CBSE Board",
    score: "95%",
    years: "2020",
  },
];

export const experience: readonly ExperienceEntry[] = [
  {
    id: "infoedge",
    title: "Foundation Model for Company Knowledge",
    role: "Data Science Intern",
    organisation: "InfoEdge",
    location: "Noida, UP",
    period: "May 2026 - July 2026",
    scene: "laboratory",
    highlights: [
      "Built a domain adaptation pipeline (Continual Pre-Training + Supervised Fine-Tuning) that teaches LLMs knowledge of Indian companies.",
      "Ran controlled data-composition experiments on paraphrasing, replication, and augmentation, raising correctness from 10.3% to 74.0% on held-out company questions.",
      "Built an LLM-as-a-judge and lm-eval-harness evaluation suite to measure correctness, hallucination, and general-capability retention across experiments.",
    ],
    tech: ["Python", "PyTorch", "Hugging Face Transformers", "vLLM", "lm-eval-harness"],
  },
  {
    id: "diversity-maximisation",
    title: "Diversity Maximisation Optimisation",
    role: "Research Intern under Dr. Tanmay Nitin Inamdar",
    organisation: "IIT Jodhpur",
    location: "Jodhpur",
    period: "January 2025 - April 2025",
    scene: "observatory",
    highlights: [
      "Investigated theoretical computer science aspects of the Diversity Maximisation problem in metric spaces.",
      "Studied NP-hard variants: Max-Min (maximize minimum pairwise distance) and Max-Avg (maximize average pairwise distance).",
      "Analyzed greedy approximation strategies: Greedy Max-Min, Greedy Max-Avg.",
      "Explored algorithmic heuristics and their geometric performance using bounded doubling dimension theory.",
      "Derived distance guarantees in Euclidean spaces with low doubling dimensions to optimize algorithmic performance.",
    ],
    tech: [
      "Metric Space Geometry",
      "Covering & Packing",
      "Kissing Numbers",
      "Diameter Estimation",
    ],
  },
  {
    id: "tinyml",
    title: "TinyML-Based Image Recognition on Microcontrollers",
    role: "Research Project under Dr. Binod Kumar",
    organisation: "IIT Jodhpur",
    location: "Jodhpur",
    period: "April 2024 - December 2024",
    scene: "workshop",
    highlights: [
      "Designed and deployed a lightweight image classification model on an STM32 microcontroller.",
      "Implemented MobileNetV3 with TensorFlow Lite for Microcontrollers, for efficient inference.",
      "Optimized deep learning models for low-power, resource-constrained environments.",
      "Converted TensorFlow models into C code using X-Cube-AI, enabling real-time deployment.",
      "Target hardware: STM32 Nucleo F412ZG (ARM Cortex-M4).",
    ],
    tech: [
      "Python",
      "C",
      "TensorFlow Lite for Microcontrollers",
      "STM32Cube IDE",
      "X-Cube-AI",
      "Google Colab",
    ],
  },
];

export const projects: readonly Project[] = [
  {
    id: "ipo-modernisation",
    name: "IPO Modernisation",
    summary: "Gradient-free Interpretable Prompt Optimization for CLIP, run fully locally.",
    period: "February 2026 - April 2026",
    scene: "multimodal-lab",
    problem:
      "Interpretable Prompt Optimization for CLIP depended on hosted GPT-3.5 and MiniCPM calls, tying reproduction of the method to paid external APIs.",
    approach: [
      "Replaced GPT-3.5/MiniCPM with local Llama 3/Mistral and LLaVA models via Ollama for fully local prompt optimization.",
      "Built a multimodal optimization pipeline using image captioning, candidate prompt filtering, no-class-name constraints, and iterative refinement over 100 steps.",
      "Achieved 89.64% accuracy on OxfordPets, within 0.52 percentage points of the corrected GPT-3.5 baseline.",
    ],
    tech: [
      "Python",
      "PyTorch",
      "CLIP",
      "Ollama",
      "Llama 3",
      "Mistral",
      "LLaVA",
      "OpenAI APIs",
      "Hugging Face",
    ],
    metrics: [
      { label: "OxfordPets accuracy", value: "89.64%" },
      { label: "Gap to GPT-3.5 baseline", value: "0.52 pp" },
      { label: "Refinement steps", value: "100" },
    ],
    repo: "https://github.com/AurindumBanerjee/IPO-Modernisation",
    featured: true,
  },
  {
    id: "bxss",
    name: "BXSS Attack & Defense",
    summary: "Dockerized testbed for automated Blind XSS attack and defense evaluation.",
    period: "February 2026 - April 2026",
    scene: "security",
    problem:
      "Blind XSS fires long after injection, in a context the attacker never sees - which makes it hard to reproduce, and harder to prove a mitigation actually works.",
    approach: [
      "Implemented MCTS-based polyglot payload generation with automated Puppeteer-based victim simulation for realistic Blind XSS attack workflows.",
      "Developed vulnerable and hardened Express applications to demonstrate payload delivery, execution, exfiltration, and end-to-end mitigation.",
      "Implemented Content Security Policy, HttpOnly cookies, input sanitization, and output escaping to prevent script execution and session compromise.",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "Express",
      "Puppeteer",
      "Docker",
      "MCTS",
      "JavaScript",
      "CSP",
      "Git/GitHub",
    ],
    metrics: [],
    repo: "https://github.com/AurindumBanerjee/BXSS-Attack-and-Defense",
    featured: true,
  },
  {
    id: "delphion",
    name: "Delphion",
    summary: "Document-grounded RAG system with modular, independently deployable services.",
    period: "May 2025",
    scene: "archive",
    problem:
      "Answering questions over a corpus of PDFs requires retrieval and generation to be tuned independently - which a monolithic pipeline makes awkward.",
    approach: [
      "Engineered a question-answering system over PDFs using a modular FastAPI backend served via Modal containers.",
      "Designed microservices - Embedder, Retriever, Generator - with clear API boundaries and vector DB sessions.",
      "Integrated LangChain-based chunking (recursive, semantic) and OpenAI API for document embeddings.",
      "Built an interactive Gradio UI with real-time chunking config, top-k tuning, and generation previews.",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Modal",
      "Gradio",
      "LangChain",
      "ChromaDB",
      "NLTK",
      "Hugging Face Spaces",
    ],
    metrics: [],
    repo: "https://github.com/AurindumBanerjee/Delphion",
    featured: true,
  },
  {
    id: "script-identifier",
    name: "Script-Identifier",
    summary: "Scene-text script classification across 13 Indic languages.",
    period: "February 2025 - April 2025",
    scene: "observatory",
    problem:
      "Scene text in Indic scripts must be identified before it can be read - and the class distribution is heavily imbalanced.",
    approach: [
      "Tried out models including Logistic Regression, SVM, KNN, ANN, Random Forest, Decision Trees and XGBoost.",
      "Used features (HOG, SIFT) and deep features (ResNet, VGG, ViT) with dimensionality reduction (PCA, LDA).",
      "Achieved 77.5% accuracy and 0.60 F1 score; improved minority-class F1 by 12.7% using an ANN + ViT with Siamese Learning approach.",
      "Deployed a real-time classification pipeline on GCP using FastAPI and Next.js with Dockerized CI/CD.",
    ],
    tech: [
      "Python",
      "Scikit-Learn",
      "PyTorch",
      "OpenCV",
      "FastAPI",
      "Next.js",
      "Gradio",
      "Matplotlib",
      "YAML",
    ],
    metrics: [
      { label: "Accuracy", value: "77.5%" },
      { label: "F1 score", value: "0.60" },
      { label: "Minority-class F1 gain", value: "+12.7%" },
      { label: "Scripts covered", value: "13" },
    ],
    repo: "https://github.com/AurindumBanerjee/Script-Identifier",
    featured: true,
  },
  {
    id: "alpshell",
    name: "AlpShell",
    summary: "Lightweight Unix shell with command parsing, job control, and I/O redirection.",
    period: "March 2025 - April 2025",
    scene: "terminal",
    problem:
      "A shell is the thinnest useful layer over the kernel - writing one means handling process lifecycles and redirection directly, with no runtime to hide behind.",
    approach: [
      "Developed a custom tokenizer, parser, and process manager modules, leveraging Linux system calls for job control and history management.",
      "Focused on modular design and performance optimization for low-overhead, responsive execution.",
    ],
    tech: ["C++", "Linux System Calls", "Shell Scripting", "Data Structures"],
    metrics: [],
    repo: "https://github.com/AurindumBanerjee/AlpShell",
    featured: true,
  },
  {
    id: "segment-tree-dbms",
    name: "Segment Tree DBMS",
    summary: "A database management system in C++ with logarithmic-time aggregate queries.",
    period: "September 2024 - December 2024",
    scene: "datastore",
    problem:
      "Aggregate queries over a table degrade to a full scan unless the storage layer is built to answer ranges directly.",
    approach: [
      "Defined CRUD operations and aggregate queries from scratch, along with UI.",
      "Stored structured data in CSV files for persistence.",
      "Loaded CSV data into B-Trees for efficient in-memory CRUD operations.",
      "Utilized Segment Trees to enable logarithmic-time aggregate queries, like SUM, MIN, MAX, COUNT.",
    ],
    tech: ["C++", "GCC Compiler", "Data Structures", "Git/GitHub"],
    metrics: [],
    repo: "https://github.com/AurindumBanerjee/Aggregate-Queries-Optimiser",
    featured: true,
  },
  {
    id: "tinyml-project",
    name: "TinyML on STM32",
    summary: "MobileNetV3 image recognition running on an ARM Cortex-M4 microcontroller.",
    period: "April 2024 - December 2024",
    scene: "workshop",
    problem:
      "A microcontroller has kilobytes of RAM and no operating system - a convolutional network has to be shrunk and compiled down to fit.",
    approach: [
      "Designed and deployed a lightweight image classification model on an STM32 microcontroller.",
      "Implemented MobileNetV3 with TensorFlow Lite for Microcontrollers, for efficient inference.",
      "Optimized deep learning models for low-power, resource-constrained environments.",
      "Converted TensorFlow models into C code using X-Cube-AI, enabling real-time deployment.",
    ],
    tech: [
      "Python",
      "C",
      "TensorFlow Lite for Microcontrollers",
      "STM32Cube IDE",
      "X-Cube-AI",
      "Jupyter Notebooks",
    ],
    metrics: [{ label: "Target board", value: "STM32 Nucleo F412ZG" }],
    featured: false,
  },
  {
    id: "ann-in-c",
    name: "Artificial Neural Network in C",
    summary: "Forward propagation, backpropagation, and gradient descent, written from scratch.",
    period: "March 2024 - April 2024",
    scene: "workshop",
    problem:
      "Autograd frameworks hide the arithmetic - implementing a network in C means deriving and allocating every step yourself.",
    approach: [
      "Created a fully functional Artificial Neural Network from scratch in C, implementing forward propagation, backward propagation, and gradient descent algorithms.",
      "Tested the ANN with the MNIST dataset, achieving 88–94% accuracy, achieved by optimising memory and algorithmic efficiency.",
    ],
    tech: [
      "C",
      "GCC Compiler",
      "Data Structures",
      "Neural Networks",
      "Matrix Math",
      "Git/GitHub",
    ],
    metrics: [{ label: "MNIST accuracy", value: "88–94%" }],
    repo: "https://github.com/AurindumBanerjee/ANN-in-C",
    featured: false,
  },
  {
    id: "smart-surveillance",
    name: "Smart Surveillance & Anomaly Detection",
    summary: "Self-supervised anomaly detection for surveillance video.",
    period: "April 2024 - December 2024",
    scene: "observatory",
    problem:
      "Anomalies in surveillance footage are rare and weakly labelled, so supervision has to come from the video's own temporal structure.",
    approach: [
      "Applied self-supervised learning techniques for motion irregularity and object prediction.",
      "Implemented Robust Temporal Feature Magnitude (RTFM) Learning to enhance anomaly classification for subtle anomalies.",
      "Utilized a combination of multi-instance learning (MIL) and RTFM learning to improve detection accuracy.",
    ],
    tech: ["Python", "PyTorch", "Matplotlib", "OpenCV", "SSH", "Linux", "Git/GitHub"],
    metrics: [],
    repo: "https://github.com/AurindumBanerjee/Smart-Surveillance-Model",
    featured: false,
  },
];

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    icon: "code",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    id: "ml-ai",
    label: "ML & AI",
    icon: "brain",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Hugging Face",
      "NumPy",
      "Pandas",
      "vLLM",
      "LangChain",
    ],
  },
  {
    id: "vision",
    label: "Computer Vision",
    icon: "eye",
    items: ["OpenCV", "CLIP", "ViT", "ResNet", "VGG", "HOG", "SIFT"],
  },
  {
    id: "backend",
    label: "Web & Backend",
    icon: "server",
    items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Streamlit", "Gradio", "Next.js"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    items: ["MySQL", "ChromaDB"],
  },
  {
    id: "devops",
    label: "Tools & DevOps",
    icon: "wrench",
    items: [
      "Git",
      "Docker",
      "Linux",
      "Jupyter",
      "Google Colab",
      "Hugging Face Spaces",
      "Modal",
      "Trello",
      "Jira",
      "Verilog",
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: "shield",
    items: [
      "Web Security",
      "XSS",
      "CSP",
      "Secure Cookies",
      "Input Sanitization",
      "Output Encoding",
    ],
  },
];

export const courseGroups: readonly CourseGroup[] = [
  {
    label: "AI & Machine Learning",
    courses: [
      { name: "Deep Learning", grade: "A-" },
      { name: "Advanced ML" },
      { name: "Computer Vision" },
      { name: "Artificial Intelligence" },
      { name: "Pattern Recognition and Machine Learning", grade: "A" },
      { name: "Probability, Statistics and Stochastic Processes" },
    ],
  },
  {
    label: "Systems",
    courses: [
      { name: "Software Engineering", grade: "A-" },
      { name: "Digital Design", grade: "A*" },
      { name: "Cybersecurity", grade: "A" },
      { name: "Human-Machine Interaction", grade: "A" },
      { name: "Operating Systems", grade: "A" },
      { name: "Computer Networks", grade: "A" },
      { name: "Embedded Systems" },
      { name: "DBMS", grade: "A" },
    ],
  },
  {
    label: "Programming & Theory",
    courses: [
      { name: "Data Structures and Algorithms" },
      { name: "Introduction to Computer Science", grade: "A" },
      { name: "Maths for Computing" },
    ],
  },
  {
    label: "Other",
    courses: [
      { name: "Corporate Finance" },
      { name: "Microeconomics" },
      { name: "Business Management" },
    ],
  },
];

/* Ordered newest first. Detail comes from the LinkedIn record and the
   soft-skills resume; where the two disagree on a title, the LinkedIn
   record wins, since it is the one kept current. */
export const leadership: readonly LeadershipEntry[] = [
  {
    role: "Undergraduate Teaching Assistant",
    organisation: "Dept. of Computer Science & Engineering, IIT Jodhpur",
    period: "Aug 2026 - Present",
    location: "Jodhpur, Rajasthan",
    detail: ["Teaching assistant for Introduction to Machine Learning (CSL 2010)."],
  },
  {
    role: "Head - Content Writing & Transportation",
    organisation: "Sandstone Summit 5.0, IIT Jodhpur",
    period: "Aug 2025 - Sep 2025",
    location: "Jodhpur, Rajasthan",
    detail: [
      "Led all professional and creative communication for Sandstone Summit 5.0, drafting mailers, event descriptions and social media content with a consistent voice aligned to the summit's theme.",
      "Coordinated across teams to maintain the narrative of the conclave.",
      "As Head of Transportation, managed guest, performer and resource movement end to end, keeping mobility timely and reliable throughout the event.",
    ],
  },
  {
    role: "Assistant Head - Exhibition",
    organisation: "Prometeo '25, Technical Fest, IIT Jodhpur",
    period: "Nov 2024 - Jan 2025",
    location: "Jodhpur, Rajasthan",
    detail: [
      "Invited exhibitors and managed setup and running of the exhibition stalls.",
      "Point of contact for the Border Security Force exhibit, coordinating logistics and ensuring a seamless display.",
      "Hosted multiple speaker sessions and led the closing and award ceremony.",
    ],
  },
  {
    role: "Core Team Member",
    organisation: "Society for Alumni Affairs, IIT Jodhpur",
    period: "Nov 2023 - Apr 2025",
    location: "Jodhpur, Rajasthan",
    tracks: [
      { name: "Core Team", period: "May 2024 - Apr 2025" },
      { name: "Support Team", period: "Nov 2023 - May 2024" },
    ],
    detail: [
      "Collaborated with alumni and team members on engagement initiatives across an eighteen-month tenure.",
      "Addressed challenges in alumni engagement and resolved team issues as they arose.",
    ],
  },
  {
    role: "Project Member",
    organisation: "Summer RAID, AI Society, IIT Jodhpur",
    period: "Jun 2024 - Dec 2024",
    location: "Jodhpur, Rajasthan",
    detail: [
      "Contributed to project goals in a collaborative research team.",
      "Worked through technical challenges in anomaly detection, picking up new techniques as the project required.",
    ],
  },
];

/** Convenience accessors used across the site. */
export const githubUrl = "https://github.com/AurindumBanerjee";
export const linkedinUrl = "https://www.linkedin.com/in/aurindum-banerjee/";
/* Public contact address, which differs from the one printed on the resumes. */
export const primaryEmail = "banerjeeaurindum@gmail.com";
