export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  overview?: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  architecture: string;
  keyFeatures: string[];
  features?: string[];
  challenges: string;
  solutions: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED';
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    iconName?: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  verificationBadge: string;
  category: 'Cloud & AI' | 'Cloud & Security' | 'Software Engineering' | 'Testing & QA';
  skills: string[];
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  platform: string;
  verificationBadge: string;
  description: string;
  category: 'DSA' | 'Problem Solving' | 'Cloud & AI';
  url?: string;
}

export const DEVELOPER_INFO = {
  name: "Uday Kumar",
  role: "Software Engineer",
  titleKicker: "FULL-STACK DEVELOPER • AI • DSA • SCALABLE SYSTEMS",
  introduction: "Hi, I'm Uday Kumar — a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.",
  headline: "Hi, I'm Uday Kumar — a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.",
  bio: "Hi, I'm Uday Kumar — a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.",
  email: "udaykumar0907200635@gmail.com",
  github: "https://github.com/udaykumar09072006",
  linkedin: "https://www.linkedin.com/in/uday-kumar-08934628b",
  leetcode: "https://leetcode.com/u/udaykumar09072006",
  instagram: "https://www.instagram.com/yadav_udayy001?stkn=a2d1ajV0M3VrOGll",
  statusList: [
    { label: "SYSTEM ONLINE", active: true },
    { label: "AI MODULE ACTIVE", active: true },
    { label: "WEB SERVICES READY", active: true },
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    batch: "2023 – 2027",
    graduationYear: "2027",
    status: "Undergraduate (Batch 2023 – 2027 · Graduating 2027)",
    focus: "Distributed Systems, Algorithms, & Scalable AI",
  }
};

export const PROJECTS: Project[] = [
  {
    id: "scalecheck",
    number: "01",
    title: "ScaleCheck 3D",
    tagline: "Interactive 3D website scalability & system architecture diagnostics",
    description: "Interactive system architecture and scalability diagnostic engine evaluating website load handling, cache hit distributions, rate-limiting boundaries, and bottleneck telemetry in real time.",
    overview: "ScaleCheck 3D is a system architecture inspection suite that models client-to-cloud request lifecycles inside an interactive 3D WebGL viewport. It simulates traffic loads, detects network latency hops, audits CDN cache configurations, and evaluates rate-limiting policies in real time.",
    image: "/images/projects/scalecheck.svg",
    techStack: ["Three.js", "React", "TypeScript", "Node.js", "Express.js", "System Design", "WebSockets"],
    githubUrl: "https://github.com/udaykumar09072006/ScaleCheck-3D",
    liveUrl: "https://scalecheck-3d.onrender.com",
    architecture: "Target URL Prober -> Telemetry Harvester -> 3D Isometric Topology -> Bottleneck Advisor",
    keyFeatures: [
      "Interactive 3D architectural pipeline visualization of client-to-cloud request hops",
      "Analysis of cache hit ratios, CDN efficiency, and search indexing signals",
      "Load balancing distribution simulator and rate-limiting threshold evaluation",
      "Actionable system recommendations and bottleneck telemetry diagnostics"
    ],
    features: [
      "Interactive 3D architectural pipeline visualization of client-to-cloud request hops",
      "Analysis of cache hit ratios, CDN efficiency, and search indexing signals",
      "Load balancing distribution simulator and rate-limiting threshold evaluation",
      "Actionable system recommendations and bottleneck telemetry diagnostics"
    ],
    challenges: "Rendering high-density architectural topologies in 3D without degrading browser framerates.",
    solutions: "Employed instanced Three.js geometries, frustum culling, and throttled state updates to ensure a sustained 60 FPS.",
    status: "DEPLOYED"
  },
  {
    id: "riskora",
    number: "02",
    title: "Riskora AI",
    tagline: "AI-powered transaction fraud detection & financial investigation engine",
    description: "Real-time fraud prevention and financial transaction investigation engine designed to intercept suspicious patterns, compute multi-vector anomaly scores, and orchestrate fraud analyst investigations.",
    overview: "Riskora AI is a fraud detection and financial investigation platform engineered to intercept suspicious transactions before settlement. It computes multi-factor behavioral anomaly scores and provides an interactive graph visualization for compliance officers and fraud analysts.",
    image: "/images/projects/riskora.svg",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Scikit-Learn", "REST APIs"],
    githubUrl: "https://github.com/udaykumar09072006/Riskora",
    liveUrl: "https://riskora-3.onrender.com",
    architecture: "Transaction Stream -> Anomaly Classifier -> Risk Scorer -> Investigation Graph -> Quarantine Dispatch",
    keyFeatures: [
      "Real-time transaction anomaly detection with low-latency classification",
      "Multi-vector risk scoring evaluating velocity and behavioral patterns",
      "Interactive investigation graph visualizer for auditing linked accounts",
      "Automated quarantine webhook dispatch and review workflows"
    ],
    features: [
      "Real-time transaction anomaly detection with low-latency classification",
      "Multi-vector risk scoring evaluating velocity and behavioral patterns",
      "Interactive investigation graph visualizer for auditing linked accounts",
      "Automated quarantine webhook dispatch and review workflows"
    ],
    challenges: "Minimizing false positive classifications without adding latency overhead to high-throughput financial pipelines.",
    solutions: "Engineered a dual-stage pipeline pairing sub-millisecond heuristic filters with deep feature scoring for suspicious bands.",
    status: "DEPLOYED"
  },
  {
    id: "resumebuilder",
    number: "03",
    title: "Resume Builder with ATS Checker",
    tagline: "Rule-based ATS resume optimizer & live vector document generator",
    description: "Client-side document builder and candidate scoring tool that evaluates resumes against deterministic ATS compliance algorithms, analyzes keyword density, previews typography in real time, and exports vector PDFs.",
    overview: "Resume Builder with ATS Checker provides an offline-capable, privacy-centric resume compiler. It analyzes resume content against applicant tracking system (ATS) parser heuristics, audits section structure and keyword density, and renders live vector-perfect PDF exports entirely in-browser.",
    image: "/images/projects/resume-ats.svg",
    techStack: ["React", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "IndexedDB", "Client-Side PDF"],
    githubUrl: "https://github.com/udaykumar09072006/Resume-Builder-ATS",
    liveUrl: "https://ats-resume-builder-fjk7.vercel.app/",
    architecture: "Form Input Engine -> Rule-Based ATS Parser -> Real-Time Canvas Preview -> Vector PDF Export",
    keyFeatures: [
      "Deterministic rule-based ATS compatibility scoring (keyword coverage, section headers, formatting)",
      "Action-verb strength and metric-quantification heuristics analysis",
      "Live dual-pane document preview with pixel-calibrated typography rendering",
      "Zero-server local persistence with full CRUD capabilities and vector PDF generation"
    ],
    features: [
      "Deterministic rule-based ATS compatibility scoring (keyword coverage, section headers, formatting)",
      "Action-verb strength and metric-quantification heuristics analysis",
      "Live dual-pane document preview with pixel-calibrated typography rendering",
      "Zero-server local persistence with full CRUD capabilities and vector PDF generation"
    ],
    challenges: "Achieving exact millimetric correspondence between on-screen CSS preview and downloaded print PDF.",
    solutions: "Engineered strict print media-query stylesheets paired with standard A4 dimension containers.",
    status: "DEPLOYED"
  },
  {
    id: "medicare",
    number: "04",
    title: "Medicare Smart Healthcare Platform",
    tagline: "Role-based healthcare portal for patient records & appointment scheduling",
    description: "Secure, role-based healthcare portal modernizing clinical operations through centralized patient electronic records, appointment dispatching, digitized prescription workflows, and health metric tracking.",
    overview: "Medicare is a multi-tier clinical management platform providing role-based security boundaries for doctors, patients, and healthcare administrators. It centralizes electronic health records, prevents scheduling collisions, and digitizes pharmacy prescription logs.",
    image: "/images/projects/medicare.svg",
    techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT Auth"],
    githubUrl: "https://github.com/udaykumar09072006/MediCare",
    liveUrl: "https://medicare-frontend-tq89.onrender.com",
    architecture: "Multi-Role Client -> Express API Gateway -> RBAC Middleware -> MongoDB Document Store -> Dispatch Service",
    keyFeatures: [
      "Granular role-based access control for Doctors, Patients, and Clinic Staff",
      "Interactive appointment scheduler with conflict prevention and calendar sync",
      "Encrypted patient consultation history and diagnostic record repository",
      "Digital prescription management with structured dosage tracking"
    ],
    features: [
      "Granular role-based access control for Doctors, Patients, and Clinic Staff",
      "Interactive appointment scheduler with conflict prevention and calendar sync",
      "Encrypted patient consultation history and diagnostic record repository",
      "Digital prescription management with structured dosage tracking"
    ],
    challenges: "Strict separation of doctor-patient records and preventing cross-tenant privilege escalation.",
    solutions: "Implemented token-enforced row-level data guards with immutable audit logging on sensitive access attempts.",
    status: "DEPLOYED"
  },
  {
    id: "studyassistant",
    number: "05",
    title: "AI Study Assistant",
    tagline: "Intelligent study companion for automated revision & concept clarification",
    description: "Interactive educational assistant that transforms lecture material into structured study notes, generates self-assessment quizzes, clarifies complex engineering concepts, and tracks study progress.",
    overview: "AI Study Assistant is a learning copilot designed for students and developers. It converts lecture transcripts and textbook excerpts into structured flashcards, generates adaptive practice quizzes with answer justifications, and offers interactive concept tutoring.",
    image: "/images/projects/study-assistant.svg",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Prompt Engineering", "Local Storage"],
    githubUrl: "https://github.com/udaykumar09072006/AI-Study-Assistant",
    liveUrl: "https://study-assistant-rho-six.vercel.app/",
    architecture: "User Material -> Prompt Synthesis Engine -> LLM Inference Pipeline -> Structured Study Notes & Quiz",
    keyFeatures: [
      "Intelligent study summary generation from raw study materials and lecture notes",
      "Automated dynamic quiz generation with answer verification and explanations",
      "Interactive technical concept tutor with step-by-step doubt breakdown",
      "Progressive study session history saved locally in browser storage"
    ],
    features: [
      "Intelligent study summary generation from raw study materials and lecture notes",
      "Automated dynamic quiz generation with answer verification and explanations",
      "Interactive technical concept tutor with step-by-step doubt breakdown",
      "Progressive study session history saved locally in browser storage"
    ],
    challenges: "Structuring unstructured notes into coherent, bite-sized revision flashcards and quizzes.",
    solutions: "Designed strict prompt output schemas with markdown sanitization and local caching.",
    status: "DEPLOYED"
  },
  {
    id: "consultbot",
    number: "06",
    title: "Medical Chat Project",
    tagline: "Conversational healthcare assistant for symptom assessment & triage guidance",
    description: "Specialized conversational health assistant offering initial symptom guidance, preliminary medical information, structured triage recommendations, and healthcare resource routing.",
    overview: "Medical Chat Project is an AI-assisted patient triage tool designed to assist users in understanding medical symptoms. It applies clinical dialogue guidelines and safety boundaries to suggest whether a situation requires emergency care, primary care follow-up, or self-monitoring.",
    image: "/images/projects/consult-bot.svg",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini Flash API", "Conversational AI", "REST APIs"],
    githubUrl: "https://github.com/udaykumar09072006/Consult-Bot",
    liveUrl: "https://consult-bot-flash.vercel.app/",
    architecture: "Symptom Intake -> Safety Prompt Filter -> LLM Reasoning -> Clinical Guidance Output",
    keyFeatures: [
      "Natural conversational symptom intake with medical disclaimer safeguards",
      "Structured triage recommendations categorizing urgency levels",
      "Low-latency response generation powered by Gemini Flash",
      "Clean, empathetic patient-first chat interface with quick symptom prompts"
    ],
    features: [
      "Natural conversational symptom intake with medical disclaimer safeguards",
      "Structured triage recommendations categorizing urgency levels",
      "Low-latency response generation powered by Gemini Flash",
      "Clean, empathetic patient-first chat interface with quick symptom prompts"
    ],
    challenges: "Enforcing clear medical disclaimers and preventing ungrounded diagnostic claims.",
    solutions: "Implemented multi-layered system guardrails ensuring triage guidance is informational and directs to licensed practitioners.",
    status: "DEPLOYED"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C++", level: "Expert" },
      { name: "Java", level: "Proficient" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "HTML", level: "Expert" },
      { name: "CSS", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "FastAPI", level: "Advanced" },
      { name: "REST APIs", level: "Expert" },
      { name: "WebSockets", level: "Advanced" },
    ]
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", level: "Advanced" },
      { name: "MySQL", level: "Proficient" },
      { name: "SQL", level: "Advanced" },
      { name: "NoSQL", level: "Advanced" },
    ]
  },
  {
    name: "AI & Modern Tech",
    skills: [
      { name: "LLMs", level: "Advanced" },
      { name: "Agents", level: "Advanced" },
      { name: "Prompt Engineering", level: "Expert" },
      { name: "RAG", level: "Advanced" },
    ]
  },
  {
    name: "CS Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms", level: "Expert" },
      { name: "OOP", level: "Expert" },
      { name: "Operating Systems", level: "Advanced" },
      { name: "DBMS", level: "Advanced" },
      { name: "Computer Networks", level: "Advanced" },
      { name: "System Design", level: "Advanced" },
    ]
  },
  {
    name: "Developer Tools",
    skills: [
      { name: "Git", level: "Expert" },
      { name: "GitHub", level: "Expert" },
      { name: "Linux", level: "Advanced" },
      { name: "Postman", level: "Expert" },
      { name: "VS Code", level: "Expert" },
      { name: "Vercel", level: "Advanced" },
    ]
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "oci-ai-associate",
    title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle University",
    period: "Sep 2025 – Sep 2027",
    verificationBadge: "OFFICIAL CERTIFICATION",
    category: "Cloud & AI",
    skills: ["Oracle Cloud Infrastructure (OCI)", "Cloud AI Architecture", "Generative AI", "Deep Learning", "Cloud Security"],
    description: "Enterprise validation of core machine learning workflows, large language model deployment strategies, and secure enterprise cloud infrastructure on Oracle Cloud.",
  },
  {
    id: "azure-storage-security",
    title: "Configure Network Security for Azure Storage",
    issuer: "Microsoft Learn, Microsoft Azure",
    period: "Jun 2026",
    verificationBadge: "VERIFIED CREDENTIAL",
    category: "Cloud & Security",
    skills: ["Microsoft Azure", "Virtual Network Service Endpoints", "Private Endpoints", "Storage Firewalls", "Access Control (IAM)"],
    description: "Configuring hardened network security perimeters, private endpoints, access keys, and firewall restrictions to safeguard enterprise cloud object storage on Azure.",
  },
  {
    id: "msft-ai-concepts",
    title: "Introduction to AI Concepts",
    issuer: "Microsoft Learn, Microsoft AI Fundamentals",
    period: "Jun 2026",
    verificationBadge: "VERIFIED CREDENTIAL",
    category: "Cloud & AI",
    skills: ["Azure AI Services", "Computer Vision", "Natural Language Processing (NLP)", "Responsible AI", "Machine Learning"],
    description: "Comprehensive fundamentals covering machine learning algorithms, ethical AI principles, cognitive computer vision services, and NLP model integration.",
  },
  {
    id: "simplilearn-testing",
    title: "Introduction to Software Testing",
    issuer: "Simplilearn SkillUp",
    verificationBadge: "SKILLUP CERTIFICATE",
    category: "Testing & QA",
    skills: ["Software Testing Lifecycle (STLC)", "Unit & Integration Testing", "Black-Box & White-Box Testing", "Defect Lifecycle", "Quality Assurance"],
    description: "Software testing methodologies, quality assurance standards, defect tracking workflows, and verification strategies ensuring high-reliability software releases.",
  },
  {
    id: "scaler-oop-java",
    title: "Object Oriented Programming in Java",
    issuer: "Scaler Topic",
    verificationBadge: "VERIFIED COURSE",
    category: "Software Engineering",
    skills: ["Java", "Inheritance & Polymorphism", "Encapsulation & Abstraction", "SOLID Principles", "Design Patterns"],
    description: "Mastery of object-oriented architecture, class hierarchies, polymorphism, encapsulation boundaries, and enterprise design patterns implemented in Java.",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "leetcode",
    title: "LeetCode Milestone",
    metric: "450+ Problems Solved",
    platform: "LeetCode",
    verificationBadge: "VERIFIED",
    description: "Consistent mastery across Dynamic Programming, Graph Theory, Trees, Binary Search, Sliding Window, and Complex Data Structures.",
    category: "DSA",
    url: "https://leetcode.com/u/udaykumar09072006",
  },
  {
    id: "hackerrank",
    title: "Problem Solving Mastery",
    metric: "5-Star Rating",
    platform: "HackerRank",
    verificationBadge: "GOLD BADGE",
    description: "Attained 5 stars in algorithmic problem solving, assessing algorithmic time complexity, data modeling, and mathematical logic.",
    category: "Problem Solving"
  },
  {
    id: "oracle-cloud",
    title: "Oracle Cloud Infrastructure",
    metric: "AI Foundations Associate",
    platform: "Oracle",
    verificationBadge: "CERTIFIED",
    description: "Validated foundation in enterprise Cloud AI architecture, deep learning paradigms, generative workloads, and scalable AI infrastructure.",
    category: "Cloud & AI"
  }
];

export const SYSTEM_ARCHITECTURE_LAYERS = [
  {
    layer: "01",
    name: "USER & CLIENT",
    role: "Browser, Mobile, Terminal Viewports",
    details: "HTTP/2, WebSocket duplex connection, Responsive Canvas, Client state cache",
    latency: "0.2ms",
    icon: "Monitor"
  },
  {
    layer: "02",
    name: "EDGE & REVERSE PROXY",
    role: "Cloudflare / CDN / TLS Termination",
    details: "DDoS mitigation, Edge asset caching, SSL handshake, Geo-routing",
    latency: "12ms",
    icon: "Shield"
  },
  {
    layer: "03",
    name: "API GATEWAY",
    role: "Route Ingestion & Authentication",
    details: "JWT validation, Rate limiting (Token Bucket), Request schema validation, CORS guard",
    latency: "4ms",
    icon: "Network"
  },
  {
    layer: "04",
    name: "APPLICATION SERVICES",
    role: "Node.js / Express & FastAPI Microservices",
    details: "Business domain logic, transaction pipelines, async worker delegation, gRPC RPCs",
    latency: "28ms",
    icon: "Cpu"
  },
  {
    layer: "05",
    name: "CACHE & EVENT QUEUES",
    role: "Redis & RabbitMQ / Kafka Pipes",
    details: "Sub-millisecond key-value caching, Pub/Sub event bus, Celery background jobs",
    latency: "1.5ms",
    icon: "Zap"
  },
  {
    layer: "06",
    name: "PERSISTENCE & DATABASES",
    role: "MongoDB & Relational SQL",
    details: "Indexed collections, connection pooling, ACID transaction isolation, read replicas",
    latency: "18ms",
    icon: "Database"
  },
  {
    layer: "07",
    name: "AI & INFERENCE ENGINE",
    role: "LLMs, Vector Embeddings & Anomaly Models",
    details: "RAG vector retrieval, Scikit-learn fraud scoring, prompt pipelines, model streaming",
    latency: "65ms",
    icon: "Brain"
  },
  {
    layer: "08",
    name: "CLOUD INFRASTRUCTURE",
    role: "Containerized Orchestration & Telemetry",
    details: "Docker containers, health probe monitors, structured logging, autoscale policies",
    latency: "0.5ms",
    icon: "Cloud"
  }
];
