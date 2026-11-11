/**
 * Single source of truth for all portfolio content.
 *
 * Project facts, metrics and skills come from the project repositories
 * themselves (source, READMEs, ADRs and committed benchmark results under
 * github.com/AurindumBanerjee). Work with no repository (InfoEdge, IIT Jodhpur
 * research, TinyML) is transcribed from the 08 Nov 2026 resume and earlier
 * resumes.
 *
 * Nothing in this file may be invented. If a link, metric or skill is not in
 * a repository or the resume, it is omitted rather than guessed.
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
  tagline: "LLM adaptation, retrieval, and systems engineering.",
  intro:
    "Final-year CSE undergraduate at IIT Jodhpur. I work on teaching language models domain knowledge they were never trained on, on hybrid retrieval that cites the page an answer came from, and on systems built from the ground up - a collaborative editor, a database engine, and a Unix shell.",
  focusAreas: [
    "LLM domain adaptation",
    "Hybrid retrieval & RAG",
    "Real-time & distributed systems",
    "Database & OS internals",
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
      "Ran controlled data-composition experiments on paraphrasing, replication, and augmentation, raising correctness from 10.3% to 74.0% and reference coverage from 8.2% to 73.2% on held-out company questions.",
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
    id: "inkwell",
    name: "InkWell",
    summary: "Real-time collaborative Markdown editor with CRDT sync across a multi-node server tier.",
    period: "Oct 2026",
    scene: "workshop",
    problem:
      "Several people editing one document at once need to see each other's changes within milliseconds, keep working offline, and stay consistent when a server node fails.",
    approach: [
      "Built real-time editing on the Yjs CRDT over WebSockets, with presence, offline edits stored in the browser and merged on reconnect, version history with restore, and anchored comments.",
      "Scaled the sync tier across several Node.js servers behind nginx, using Redis pub/sub to keep documents consistent during failover and PostgreSQL for storage, sign-in and role-based sharing.",
      "In a simulated test with 1,000 people editing at once, edits reached other users within 4 ms for 95% of updates, down from 15 ms, by keeping everyone on the same document on the same server.",
      "Document search went from 124 ms to 5 ms (median, rare terms, 20,000 documents) using PostgreSQL full-text search.",
      "Covered the main user flows (two editors, offline, viewer role, comments, history, search) with Playwright end-to-end tests.",
    ],
    tech: [
      "TypeScript",
      "Next.js",
      "Fastify",
      "Yjs",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "nginx",
      "Docker",
      "Playwright",
      "k6",
      "GitHub Actions",
    ],
    metrics: [
      { label: "p95 sync (simulated 1,000 editors)", value: "4 ms" },
      { label: "Search", value: "124 → 5 ms" },
    ],
    repo: "https://github.com/AurindumBanerjee/InkWell",
    featured: true,
  },
  {
    id: "delphion",
    name: "Delphion",
    summary: "Hybrid-retrieval RAG over PDFs, with streamed answers that cite the page.",
    period: "May 2025 - Oct 2026",
    scene: "archive",
    problem:
      "Dense embeddings match meaning but blur rare, exact terms such as names, numbers and jargon, so dense-only retrieval often misses the passage that actually answers a question.",
    approach: [
      "Built a single Gradio app that indexes uploaded PDFs with BM25 and local ONNX dense embeddings (fastembed) in ChromaDB, fuses the two rankings with Reciprocal Rank Fusion, and reranks the top 20 with a cross-encoder.",
      "Answers stream token by token with inline citations to the source passage and page.",
      "Wrote a span-based evaluation (42 questions over 3 books): hybrid retrieval with reranking improved hit@1 from 0.45 to 0.88 and MRR@5 from 0.58 to 0.92 over dense-only retrieval.",
      "Added a rate-limit panel that reports whose limit was hit, and lets visitors bring their own API key.",
    ],
    tech: [
      "Python",
      "Gradio",
      "fastembed",
      "ONNX",
      "ChromaDB",
      "BM25",
      "PyMuPDF",
      "pytest",
      "Hugging Face Spaces",
    ],
    metrics: [
      { label: "hit@1", value: "0.45 → 0.88" },
      { label: "MRR@5", value: "0.58 → 0.92" },
      { label: "Eval set", value: "42 questions, 3 books" },
    ],
    repo: "https://github.com/AurindumBanerjee/Delphion",
    featured: true,
  },
  {
    id: "aggregate-queries-optimiser",
    name: "Aggregate Queries Optimiser",
    summary: "A C++ database engine whose aggregate indexes answer range SUM/MIN/MAX/COUNT in logarithmic time.",
    period: "Sep 2024 - Oct 2026",
    scene: "datastore",
    problem:
      "Aggregate queries over a range of rows degrade to reading every matching row unless the storage layer is built to answer ranges directly.",
    approach: [
      "Built a database engine with 4 KB pages, a buffer pool, write-ahead logging with ARIES-style recovery, and a SQL layer, with a single writer and multiple readers.",
      "Added an aggregate-augmented B+ tree that caches count, sum, min and max in every internal node, so range aggregates stay logarithmic.",
      "A range SUM over 1% of 1M rows takes 15 µs, against 1.47 ms for SQLite with a covering index (median of 3 runs).",
      "SQLite is still faster at bulk load, point lookups and full scans, which this project did not set out to beat.",
      "98 tests with 95% line coverage, including crash-recovery tests and a differential fuzz test against SQLite.",
    ],
    tech: ["C++", "CMake", "GoogleTest", "SQLite", "Sanitizers", "GitHub Actions", "Docker"],
    metrics: [
      { label: "Range SUM, 1% of 1M rows", value: "15 µs vs 1.47 ms" },
      { label: "Tests", value: "98" },
      { label: "Line coverage", value: "95%" },
    ],
    repo: "https://github.com/AurindumBanerjee/Aggregate-Queries-Optimiser",
    featured: true,
  },
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
    id: "alpshell",
    name: "AlpShell",
    summary: "A Unix shell in C++ with job control, pipelines, redirection and expansion, tested against bash.",
    period: "Mar 2025 - Oct 2026",
    scene: "terminal",
    problem:
      "A shell is the thinnest useful layer over the kernel - writing one means handling process lifecycles and redirection directly, with no runtime to hide behind.",
    approach: [
      "Implemented job control: every pipeline runs in its own process group, with fg, bg, kill and jobs, and Ctrl+Z stops the foreground job without stopping the shell.",
      "Supports pipelines, redirections including 2>&1, command chaining with ;, && and ||, $?, variable expansion and file-name globbing.",
      "Tested with 65 scripts run under both bash and AlpShell whose output must match (7 documented differences), plus unit and pseudo-terminal tests.",
      "CI runs every test again under AddressSanitizer and UBSan.",
    ],
    tech: ["C++", "Linux System Calls", "termios", "Python", "Sanitizers", "GitHub Actions"],
    metrics: [
      { label: "Script tests vs bash", value: "65" },
      { label: "Documented differences", value: "7" },
    ],
    repo: "https://github.com/AurindumBanerjee/AlpShell",
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
      "Built a real-time classification app with a FastAPI backend and a Next.js frontend.",
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
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "Fastify",
      "WebSockets",
      "Yjs",
      "REST APIs",
      "Streamlit",
      "Gradio",
      "Next.js",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    items: ["PostgreSQL", "Redis", "SQLite", "MySQL", "ChromaDB"],
  },
  {
    id: "devops",
    label: "Tools & DevOps",
    icon: "wrench",
    items: [
      "Git",
      "Docker",
      "Linux",
      "GitHub Actions",
      "nginx",
      "Playwright",
      "pytest",
      "GoogleTest",
      "k6",
      "Sanitizers",
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
