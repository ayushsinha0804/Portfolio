// All copy below is sourced from Ayush's CV and his previous portfolio.
// Edit freely — every page renders from this file.

export type GlyphName =
  | 'pin' | 'window' | 'chat' | 'eye' | 'shield' | 'heart' | 'key'
  | 'braces' | 'database' | 'terminal' | 'diamond' | 'gear' | 'cloud' | 'branch'

// Each project gets its own silhouette, drawn with border-radius so shadows
// follow the outline. aspect = width / height, scale = width relative to its
// slot, pad = inner padding (% of the shape's width), tilt = resting rotation.
export type Shape = { radius: string; aspect: number; scale: number; pad: string; tilt: number }

export type Project = {
  slug: string
  title: string
  kicker: string
  category: 'Full-stack' | 'ML & Security'
  year?: string
  role: string
  stack: string[]
  glyph: GlyphName
  shape: Shape
  bg: string
  fg: string
  summary: string
  intro: string
  highlights: string[]
  stats: { value: string; label: string }[]
  links?: { label: string; href: string }[]
}

export const person = {
  name: 'Ayush Sinha',
  role: 'Full-stack developer',
  location: 'Delhi, India',
  timezone: 'Asia/Kolkata',
  email: 'ayushsxnha@gmail.com',
  status: 'Open to roles',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ayushsinha0804' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayushsxnha/' },
    { label: 'Instagram', href: 'https://www.instagram.com/ayushsxnha' },
  ],
}

export const projects: Project[] = [
  {
    slug: 'map-track',
    title: 'Map Track',
    kicker: 'Group travel coordination',
    category: 'Full-stack',
    year: '2026',
    role: 'Design, backend, client & testing',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Flutter', 'OSRM'],
    glyph: 'pin',
    shape: { radius: '50% 50% 20px 20px / 36% 36% 20px 20px', aspect: 0.8, scale: 0.92, pad: '20% 14% 14%', tilt: -2 },
    bg: '#2a4bd7',
    fg: '#f2ede3',
    summary: 'A full-stack REST API and cross-platform client for coordinating trips with friends.',
    intro:
      'Map Track keeps a travelling group on the same map: trips, friends and invitations, with live ETAs and location sharing routed through OSRM.',
    highlights: [
      'Designed and built a full-stack REST API and a cross-platform Flutter client on Node.js, Express, TypeScript and PostgreSQL.',
      'Implemented JWT authentication, bcrypt password hashing and server-side authorization across trips, friends and invitations.',
      'Integrated a third-party routing API (OSRM) for live ETAs and location sharing.',
      'Wrote 750 automated tests and verified the API end to end against a running backend, resolving CORS and configuration defects.',
    ],
    stats: [
      { value: '750', label: 'Automated tests' },
      { value: 'JWT', label: 'Auth + bcrypt hashing' },
      { value: 'OSRM', label: 'Live routing & ETAs' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ayushsinha0804' }],
  },
  {
    slug: 'electronic-point',
    title: 'Electronic Point',
    kicker: 'Business website rebuild',
    category: 'Full-stack',
    year: '2026',
    role: 'Web developer intern — content, UI, deployment',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'DNS', 'Claude Code'],
    glyph: 'window',
    shape: { radius: '30px', aspect: 1.18, scale: 1, pad: '12% 12%', tilt: 1.5 },
    bg: '#e3a33b',
    fg: '#1b3226',
    summary: 'An end-to-end rebuild of a business website, from unstructured documents to production.',
    intro:
      'I rebuilt Electronic Point’s website end to end — content, UI and deployment — working from unstructured source documents and using an AI coding agent as a daily tool while independently verifying everything it wrote.',
    highlights: [
      'Caught a security issue (an exposed API key) and dead code introduced by the coding agent before release.',
      'Audited the site for production-readiness unprompted; fixed a non-functional contact form, exposed credentials and missing SEO infrastructure.',
      'Diagnosed a live DNS/hosting misconfiguration from DNS records and HTTP headers, then re-architected the GitHub Pages deployment pipeline.',
      'Owned the release through git: resolved diverged branch history, kept clean commit hygiene and pushed to production.',
    ],
    stats: [
      { value: '0', label: 'Exposed keys shipped' },
      { value: 'E2E', label: 'Content → UI → deploy' },
      { value: 'Live', label: 'In production' },
    ],
    links: [{ label: 'Visit site', href: 'https://www.electronicpointjsr.com' }],
  },
  {
    slug: 'realtime-messaging',
    title: 'Real-Time Messaging',
    kicker: 'Socket-based chat app',
    category: 'Full-stack',
    role: 'Full-stack developer',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    glyph: 'chat',
    shape: { radius: '50% 50% 50% 14px', aspect: 1, scale: 0.9, pad: '15%', tilt: -1 },
    bg: '#1b3226',
    fg: '#f2ede3',
    summary: 'A React front end and Node.js backend talking over Socket.io in real time.',
    intro:
      'A messaging application with a ReactJS front end and a Node.js backend, using Socket.io for real-time communication and MongoDB for storage.',
    highlights: [
      'Designed and built the ReactJS front end and the Node.js backend.',
      'Used Socket.io for real-time, bidirectional messaging.',
      'Stored users and messages in MongoDB.',
    ],
    stats: [
      { value: 'Socket', label: 'Real-time transport' },
      { value: 'MERN', label: 'Stack' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ayushsinha0804' }],
  },
  {
    slug: 'image-captioning',
    title: 'Image Captioning',
    kicker: 'CNN / LSTM encoder–decoder',
    category: 'ML & Security',
    year: '2024',
    role: 'ML & full-stack',
    stack: ['Python', 'TensorFlow', 'CNN', 'LSTM'],
    glyph: 'eye',
    shape: { radius: '50%', aspect: 1.3, scale: 1, pad: '10% 17%', tilt: 2 },
    bg: '#b9c9f0',
    fg: '#1b3226',
    summary: 'A full-stack system that writes a sentence for every picture.',
    intro:
      'A full-stack image captioning system built on a CNN encoder and an LSTM decoder, trained on an 8,000-image dataset.',
    highlights: [
      'Built a CNN/LSTM encoder–decoder model for caption generation.',
      'Processed and trained on an 8,000-image dataset.',
      'Reached a BLEU-1 score of 0.52.',
    ],
    stats: [
      { value: '8,000', label: 'Training images' },
      { value: '0.52', label: 'BLEU-1 score' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ayushsinha0804' }],
  },
  {
    slug: 'ddos-detection',
    title: 'DDoS Detection',
    kicker: 'Traffic classification model',
    category: 'ML & Security',
    year: '2023',
    role: 'ML engineer',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Decision Tree'],
    glyph: 'shield',
    shape: { radius: '26px 26px 50% 50% / 26px 26px 42% 42%', aspect: 0.84, scale: 0.84, pad: '14% 14% 24%', tilt: -2.5 },
    bg: '#c94f2c',
    fg: '#f2ede3',
    summary: 'A decision-tree classifier that separates attack traffic from normal traffic.',
    intro:
      'A machine-learning classification model that detects DDoS attacks, trained over 100,000 network-traffic records.',
    highlights: [
      'Processed a dataset of 100,000 network-traffic records in Python.',
      'Trained a decision-tree classifier to flag DDoS traffic.',
      'Reached 91% accuracy.',
    ],
    stats: [
      { value: '100k', label: 'Traffic records' },
      { value: '91%', label: 'Accuracy' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ayushsinha0804' }],
  },
  {
    slug: 'heart-disease',
    title: 'Heart Disease Predictor',
    kicker: 'Supervised learning',
    category: 'ML & Security',
    role: 'ML engineer',
    stack: ['Python', 'Scikit-Learn', 'Logistic Regression'],
    glyph: 'heart',
    shape: { radius: '58% 42% 47% 53% / 46% 55% 45% 54%', aspect: 1.04, scale: 0.86, pad: '16%', tilt: 3 },
    bg: '#8fae8b',
    fg: '#1b3226',
    summary: 'A logistic-regression model that predicts heart disease from patient data.',
    intro:
      'A supervised learning model using logistic regression to predict heart disease, trained and analysed on a 1,000-entry Kaggle dataset.',
    highlights: [
      'Analysed a Kaggle dataset of 1,000 entries.',
      'Trained a logistic-regression classifier.',
      'Reached 82% accuracy.',
    ],
    stats: [
      { value: '1,000', label: 'Patient records' },
      { value: '82%', label: 'Accuracy' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ayushsinha0804' }],
  },
  {
    slug: 'cipher-kit',
    title: 'Cipher Kit',
    kicker: '12 encryption algorithms',
    category: 'ML & Security',
    year: '2023',
    role: 'Cyber security trainee, EY',
    stack: ['Python', 'Cryptography'],
    glyph: 'key',
    shape: { radius: '16px 50% 16px 50%', aspect: 1, scale: 0.8, pad: '15%', tilt: -3 },
    bg: '#6d4c7d',
    fg: '#f2ede3',
    summary: 'A Python package of twelve encryption and decryption algorithms.',
    intro:
      'Built during my cyber security traineeship at Ernst & Young: a Python package implementing twelve encryption and decryption algorithms from core cryptographic principles.',
    highlights: [
      'Implemented 12 encryption/decryption algorithms as a single Python package.',
      'Applied core cryptographic principles rather than wrapping existing libraries.',
    ],
    stats: [{ value: '12', label: 'Algorithms' }],
  },
]

export const experience = [
  {
    company: 'Electronic Point',
    role: 'Web Developer Intern',
    period: 'Feb 2026 — Present',
    location: 'Jamshedpur, India',
    focus: 'Full-stack web, deployment, AI-assisted development',
    points: [
      'Rebuilt a business website end to end from unstructured source documents, verifying and correcting AI-agent output — including an exposed API key and dead code.',
      'Audited for production-readiness unprompted: fixed a broken contact form, exposed credentials and missing SEO.',
      'Diagnosed a live DNS/hosting misconfiguration and re-architected the GitHub Pages deployment pipeline.',
      'Owned the release through git, from diverged history to production.',
    ],
    bg: '#2a4bd7',
    fg: '#f2ede3',
  },
  {
    company: 'Ernst & Young',
    role: 'Cyber Security Trainee',
    period: 'Jul 2023 — Aug 2023',
    location: 'Bhubaneswar, India',
    focus: 'Machine learning for security, cryptography',
    points: [
      'Built a supervised ML anomaly-detection model for web services, reaching 91% detection accuracy.',
      'Implemented a Python package of 12 encryption/decryption algorithms applying core cryptographic principles.',
    ],
    bg: '#e3a33b',
    fg: '#1b3226',
  },
  {
    company: 'HighRadius',
    role: 'Intern',
    period: 'Jun 2023 — Jul 2023',
    location: 'Bhubaneswar, India',
    focus: 'Product engineering',
    points: ['Contributed to 2 major initiatives.'],
    bg: '#1b3226',
    fg: '#f2ede3',
  },
]

export const skills = [
  { label: 'Languages', value: 'JavaScript, TypeScript, Python, Java, SQL' },
  { label: 'Backend & APIs', value: 'Node.js, Express, REST API design, JWT authentication, bcrypt' },
  { label: 'Databases', value: 'PostgreSQL, MongoDB, Microsoft SQL Server, MySQL' },
  { label: 'Frontend', value: 'React, Flutter, HTML, CSS' },
  { label: 'Infrastructure', value: 'Git, GitHub Pages & Actions, DNS & deployment, automated testing, Socket.io' },
  { label: 'AI-assisted', value: 'Claude Code, GitHub Copilot' },
  { label: 'ML & Data', value: 'TensorFlow, Scikit-Learn, OpenCV, Pandas, Matplotlib' },
]

export const education = [
  {
    label: 'B.Tech, Computer Science & Engineering',
    value: 'Siksha ‘O’ Anusandhan University, Bhubaneswar · 2020 — 2024 · CGPA 7.9',
  },
  { label: 'Certification', value: 'Supervised Machine Learning — Stanford University' },
  { label: 'Certification', value: 'Problem Solving — HackerRank' },
  { label: 'Achievement', value: 'AlgoRush by IIT-BHU — solved 5/5' },
  { label: 'Practice', value: '200+ problems on LeetCode, GeeksforGeeks and HackerRank' },
]
