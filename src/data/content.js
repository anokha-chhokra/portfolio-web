// Content sourced from Arbaj Ali's resume (uploaded Sept 2026).
// Kept as plain data so the components stay purely presentational.

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'system', label: 'System' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'completed-projects', label: 'Projects' },
  { id: 'current-projects', label: 'Current' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const contact = {
  name: 'Arbaj Ali',
  title: 'Java Developer · Spring Boot Developer · Backend Engineer',
  email: 'arbajali.dev@gmail.com',
  phone: '+91 7278781198',
  location: 'Kolkata, India',
  linkedin: 'https://linkedin.com/in/arbajali',
};

export const metrics = [
  { value: '~4 yrs', label: 'experience stated in resume' },
  { value: '35%', label: 'validation-time reduction' },
  { value: '30%', label: 'fewer build failures after refactor' },
  { value: '8.72', label: 'B.Tech DGPA' },
];

export const stackJson = {
  core: ['Java', 'Python', 'Spring Boot', 'Spring MVC', 'Spring Security'],
  api: ['REST', 'Apigee', 'webMethods'],
  data: ['SQL', 'JDBC', 'Hibernate', 'Redis', 'H2'],
  messaging: ['Apache Kafka'],
  cloud: ['AWS', 'GCP', 'Azure'],
  ai: ['RAG', 'Ollama', 'Claude Code', 'GitHub Copilot'],
  delivery: ['Git', 'Docker', 'Jenkins', 'GitHub Actions', 'CI/CD'],
};

export const aboutParagraphs = [
  "Arbaj Ali is a backend-focused software engineer with about four years of experience across Java, Spring Boot, RESTful APIs, GenAI and microservices — including enterprise delivery at Cognizant Technology Solutions and independent freelance work since mid-2024.",
  'The work centers on performance optimization, API management, and cloud-integrated backend solutions: taking a system apart, finding where it slows down or breaks under real traffic, and shipping something faster, safer or easier to maintain — with a growing interest in bringing GenAI tooling into that same backend toolbox.',
];

export const aboutFacts = [
  { label: 'Location', value: 'Kolkata, India' },
  { label: 'Focus', value: 'Java · Spring Boot · REST APIs' },
  { label: 'Currently', value: 'Freelance Java Developer' },
];

export const archNodes = [
  { id: 'Client', x: 25, y: 112, w: 105, h: 46, tx: 77, ty: 140, lines: ['CLIENT'] },
  { id: 'Apigee', x: 190, y: 47, w: 105, h: 46, tx: 242, ty: 75, lines: ['APIGEE'] },
  { id: 'Spring Boot', x: 315, y: 112, w: 115, h: 46, tx: 372, ty: 140, lines: ['SPRING BOOT'] },
  { id: 'Kafka', x: 185, y: 181, w: 105, h: 46, tx: 237, ty: 209, lines: ['KAFKA'] },
  { id: 'SQL / JDBC', x: 465, y: 112, w: 105, h: 46, tx: 517, ty: 140, lines: ['SQL / JDBC'] },
  { id: 'Jenkins + GCP', x: 465, y: 181, w: 105, h: 46, tx: 517, ty: 201, lines: ['JENKINS', '+ GCP'] },
];

export const archCopy = {
  Client: 'Request origin shown here as the entry point into the API flow.',
  Apigee: 'API management and traffic-policy layer called out in the featured project.',
  'Spring Boot': 'Application/service layer used to modernize the legacy Spring system.',
  Kafka: 'Asynchronous messaging layer implemented for communication across microservices.',
  'SQL / JDBC':
    'Persistence and query layer; query optimization produced the 35% validation-time reduction.',
  'Jenkins + GCP': 'Delivery layer reflecting the Jenkins CI/CD pipeline executed on GCP.',
};

export const capabilityTags = [
  'Performance Optimization',
  'API Development',
  'Microservices Architecture',
  'Application Integration',
  'Cloud Integration (AWS / GCP / Azure)',
  'GenAI & LLM Integration',
  'Database Management',
  'Software Testing',
  'Problem Solving',
];

export const jobs = [
  {
    title: 'Java Developer · Freelancing',
    meta: 'Jun 2024 – Jun 2026 · Kolkata, India (Remote)',
    bullets: [
      'Refactored legacy codebases to enhance maintainability and system stability, reducing build failures by 30% and improving developer productivity.',
      'Helped build an LLM-based chatbot to automate client requirements gathering and queries.',
      'Contributed to building an online skill assessment platform supporting automated technical tests, candidate evaluation, and analytics dashboards.',
      'Designed and developed enterprise backends for marketing and corporate platforms.',
      'Improved system reliability by implementing comprehensive unit tests and automating test workflows, significantly reducing production issues.',
    ],
  },
  {
    title: 'Programmer Analyst · Cognizant Technology Solutions',
    meta: 'Oct 2021 – May 2024 · Kolkata, India',
    bullets: [
      'Developed enterprise applications using Java, Spring Boot, Spring MVC, JDBC and JUnit, improving back-end performance for scalable business systems.',
      'Implemented RESTful APIs enabling secure communication and seamless data exchange across integrated enterprise systems.',
      'Automated business workflows and streamlined system integration using SoftwareAG webMethods.',
      'Configured API management solutions in Apigee to strengthen API security and support enterprise integration requirements.',
      'Optimized SQL database queries and maintained data integrity, ensuring consistent application performance across environments.',
    ],
  },
];

export const credentials = [
  {
    type: 'Education',
    title: 'B.Tech · Mechanical Engineering',
    sub: 'Haldia Institute of Technology · MAKAUT · 2021',
    detail: 'DGPA 8.72',
  },
  {
    type: 'Certification',
    title: 'Redis Certified',
    sub: 'Associate Software Operator',
    detail: null,
  },
  {
    type: 'Achievement',
    title: 'Zonal Winner',
    sub: 'Neural Networks workshop · IIT Kharagpur',
    detail: null,
  },
  {
    type: 'Leadership',
    title: 'Team Vidyut',
    sub: 'Design Head & Captain · 2018–2021',
    detail: "Eastern India's only go-kart team",
  },
];

// The flagship, most fully-documented completed project — gets the rich
// "pipeline diagram" treatment.
export const flagshipProject = {
  label: 'May 2023 – Apr 2024 · Cognizant',
  title: 'Transactions for Credit Card System',
  summary:
    'Migrated a legacy Spring application to Spring Boot and built the surrounding service and integration flow for a credit card transactions platform.',
  stat: '35%',
  statLabel: 'reduction in validation time through database query optimization',
  stack: ['Java', 'Spring Boot', 'REST', 'Apigee', 'Kafka', 'Jenkins', 'GCP'],
  bullets: [
    'Migrated legacy Spring applications to Spring Boot, improving scalability and maintainability.',
    'Developed RESTful APIs for seamless service integration across the application.',
    'Designed object-oriented components to streamline transaction processing and third-party integrations.',
    'Configured Apigee policies to regulate API traffic and prevent abnormal requests.',
    'Optimized database queries, reducing validation time by 35%.',
    'Implemented Apache Kafka for reliable asynchronous communication across microservices.',
    'Executed CI/CD pipelines through Jenkins on GCP, accelerating feature deployment.',
  ],
};

export const pipelineSteps = [
  { title: 'Client', sub: 'request' },
  { title: 'REST', sub: 'API call' },
  { title: 'Apigee', sub: 'policy' },
  { title: 'Spring Boot', sub: 'service' },
  { title: 'Kafka', sub: 'async' },
  { title: 'SQL / JDBC', sub: 'persist' },
];

// The rest of the shipped, resume-documented work — shown as a grid of
// simpler cards beneath the flagship project.
export const completedProjects = [
  {
    title: 'LLM-Based Client Requirements Chatbot',
    context: 'Freelance',
    description:
      'Helped build an LLM-powered chatbot that automates gathering and triaging client requirements and queries.',
    tags: ['GenAI', 'LLM', 'Chatbot'],
  },
  {
    title: 'Online Skill Assessment Platform',
    context: 'Freelance',
    description:
      'Contributed backend work supporting automated technical tests, candidate evaluation, and analytics dashboards.',
    tags: ['REST APIs', 'Analytics', 'Assessment Engine'],
  },
  {
    title: 'Enterprise Backends for Marketing & Corporate Platforms',
    context: 'Freelance',
    description:
      'Designed and developed backend systems powering marketing and corporate-facing platforms.',
    tags: ['Java', 'Spring Boot', 'APIs'],
  },
  {
    title: 'Legacy Codebase Modernization',
    context: 'Freelance',
    description:
      'Refactored legacy codebases for maintainability and stability, cutting build failures by 30% and adding automated test coverage that reduced production issues.',
    tags: ['Refactoring', 'Testing', 'CI/CD'],
  },
];

// Deliberately empty — see CurrentProjectsSection.jsx for the placeholder
// state this renders instead. Add entries here (same shape as
// completedProjects, plus an optional `status` string) once there's real
// in-progress work to show.
export const currentProjects = [];

export const skillCategories = [
  { label: 'Programming Languages', items: ['Core Java', 'Python'] },
  {
    label: 'Architecture & Design',
    items: ['OOP', 'SOLID Principles', 'Data Structures & Algorithms', 'Design Patterns'],
  },
  { label: 'Frameworks', items: ['Spring Framework', 'Spring Boot', 'Spring Security'] },
  { label: 'Database', items: ['SQL', 'JDBC', 'Redis', 'H2'] },
  { label: 'Cloud', items: ['AWS', 'GCP', 'Azure'] },
  {
    label: 'Back-end Technologies',
    items: ['JDBC', 'RESTful APIs', 'Microservices', 'Hibernate', 'Encryption', 'JWT'],
  },
  { label: 'Front-end Technologies', items: ['React.js', 'Bootstrap', 'HTML', 'CSS', 'JavaScript'] },
  { label: 'Testing', items: ['JUnit', 'Selenium'] },
  { label: 'Workflow Methods', items: ['Agile', 'Scrum', 'Waterfall'] },
  { label: 'Integration & API Management', items: ['SoftwareAG webMethods', 'Apigee'] },
  { label: 'AI Agents', items: ['RAG', 'Ollama', 'Claude Code', 'GitHub Copilot'] },
  { label: 'Messaging Platform', items: ['Apache Kafka'] },
  {
    label: 'DevOps & Version Control',
    items: ['Git', 'Docker', 'GitHub Actions', 'Jenkins', 'CI/CD Pipeline'],
  },
];

export const skills = [
  {
    detailTitle: 'Core backend',
    heading: 'Java + Spring',
    sub: 'Core backend',
    copy: 'Core Java, Spring Framework, Spring Boot and Spring Security form the primary application layer.',
  },
  {
    detailTitle: 'API layer',
    heading: 'APIs + Microservices',
    sub: 'Integration',
    copy: 'RESTful APIs, Microservices, Apigee and SoftwareAG webMethods cover service exposure and integration.',
  },
  {
    detailTitle: 'Data',
    heading: 'SQL + Data',
    sub: 'Persistence',
    copy: 'SQL, JDBC, Hibernate, Redis and H2 appear in the technical-skills section; SQL optimization is also highlighted in the featured project.',
  },
  {
    detailTitle: 'Messaging',
    heading: 'Apache Kafka',
    sub: 'Async messaging',
    copy: 'Apache Kafka was implemented for reliable asynchronous communication across microservices in the featured project.',
  },
  {
    detailTitle: 'Cloud',
    heading: 'AWS + GCP + Azure',
    sub: 'Cloud',
    copy: 'The resume lists all three major clouds, with the featured project specifically using Jenkins on GCP for CI/CD.',
  },
  {
    detailTitle: 'DevOps',
    heading: 'Docker + CI/CD',
    sub: 'Delivery',
    copy: 'Git, Docker, GitHub Actions, Jenkins and CI/CD Pipeline are listed in the technical skills section.',
  },
  {
    detailTitle: 'AI agents',
    heading: 'GenAI Tooling',
    sub: 'RAG · Ollama · Copilot',
    copy: 'RAG, Ollama, Claude Code and GitHub Copilot are listed as AI Agent skills, and show up directly in the LLM chatbot project.',
  },
  {
    detailTitle: 'Testing & frontend',
    heading: 'JUnit + React + Fundamentals',
    sub: 'Quality & fundamentals',
    copy: 'JUnit and Selenium cover testing; React.js, Bootstrap, OOP, SOLID principles and data structures round out the fundamentals.',
  },
];

export const services = ['Apigee', 'Spring Boot', 'Kafka', 'SQL'];
export const serviceLabels = {
  Apigee: 'Apigee',
  'Spring Boot': 'Spring Boot',
  Kafka: 'Kafka',
  SQL: 'SQL/JDBC',
};
