export const fallbackProfile = {
  name: 'Krishna Kumar',
  role: 'Backend / Full-Stack Developer',
  eyebrow: 'AVAILABLE FOR OPPORTUNITIES',
  initEnv: 'production',
  node: 'us-west-2',

  bio: 'I build secure, scalable, and production-ready applications using React.js, FastAPI, and modern cloud backend architectures.',

  about: [
    'I am a full-stack engineer driven by an obsession with performance, resilience, and architectural precision. Over the past five years, my focus has remained on the intersection of reactive client applications and low-latency distributed microservices.',

    'Specializing in the Python (FastAPI) and TypeScript (React/Next) ecosystems, I design databases with strict relational constraints and indexing strategies using PostgreSQL and cache layers using Redis. My code is guided by domain-driven design, zero-trust security postures, and comprehensive telemetry.',

    'Beyond feature delivery, I focus heavily on operational health: minimizing p99 latencies, automating horizontal auto-scalers in Kubernetes, and establishing reproducible CI/CD pipelines that give teams total confidence in deployment cycles.'
  ],

  stats: [
    ['45+', 'Projects Delivered', 'Production instances', 'primary'],
    ['120+', 'APIs Built', 'FastAPI & GraphQL', 'secondary'],
    ['18+', 'Core Technologies', 'Active ecosystem', 'tertiary'],
    ['5+', 'Years Experience', 'Enterprise scale', 'surface']
  ],

  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:pandiraman131@gmail.com'
  },

  contact: {
    email: 'pandiraman131@gmail.com',
    location: 'Sivakasi, Tamil Nadu, India',
    pgp: '9B82 31FA 0498 C821 54D2',
    sla: 'Initial technical triage provided within 1 business day. NDA execution available upon initial review.'
  }
};

export const fallbackSkills = [
  ['React.js', 'frontend', 95, 'Custom hooks, Server Components, concurrent render tuning, React Query state sync.'],
  ['TypeScript', 'frontend', 92, 'Strict type safety, generic utility structures, API response validation schemas.'],
  ['Next.js', 'frontend', 88, 'App router, hybrid rendering, edge middleware, edge CDN asset pipelines.'],
  ['Tailwind CSS', 'frontend', 96, 'Design token mapping, bespoke themes, responsive layout architecture, micro-animations.'],
  ['FastAPI', 'backend', 98, 'Async ASGI, Pydantic v2 validation, dependency injection, high-concurrency event loops.'],
  ['Celery & Redis', 'backend', 90, 'Distributed queue orchestrations, dead-letter routing, rate-limiting, and task telemetry.'],
  ['REST & GraphQL', 'backend', 94, 'OpenAPI contract specifications, Apollo/Strawberry schemas, JWT bearer authorization.'],
  ['Java & Spring', 'backend', 82, 'Microservices patterns, Spring Security, Hibernate ORM, and enterprise message brokers.'],
  ['PostgreSQL', 'database', 95, 'Complex CTEs, EXPLAIN query optimization, partition schemas, replication clusters.'],
  ['pgvector & Redis', 'database', 89, 'Vector embeddings storage, HNSW indexing, PubSub channels, distributed locking.'],
  ['Docker & K8s', 'infra', 91, 'Multi-stage Alpine builds, Helm charts, ingress controllers, pod topology scaling.'],
  ['AWS & CI/CD', 'infra', 87, 'ECS Fargate, RDS Aurora, S3 triggers, GitHub Actions automated integration workflows.']
].map(([name, category, level, description]) => ({
  name,
  category,
  level,
  description
}));

export const fallbackFeatured = {
  version: 'v2.1.4',
  uptime: '99.98% System Uptime',
  product: 'LifePulse Network',
  title: 'BLOOD DONATION PLATFORM',
  description:
    'An enterprise-level hospital-centered blood donation platform connecting verified medical facilities with compatible donors through a secure event-driven workflow. Handles urgent dispatch with millisecond-precision routing and strict HIPAA compliance.',
  highlights: [
    'Hospital Geofencing API',
    'Smart Blood Type Matcher',
    'Donation PIN Audit Trail',
    'Real-Time SSE Alert Broker'
  ],
  technologies: [
    'React.js',
    'FastAPI',
    'PostgreSQL',
    'Redis Cache',
    'Docker'
  ],
  terminal: [
    ['INFO', 'POST /api/v1/blood-requests'],
    ['GEO', 'Hospital #38 radius (15km): 84 eligible'],
    ['AUTH', 'JWT Token: verified_hospital_tier1'],
    ['MATCH', 'ABO matched: O-Negative priority'],
    ['SSE', '14 push alerts sent (p99: 12ms)']
  ],
  metrics: 'Active Donors: 2,419 · Node: us-central1'
};

export const fallbackProjects = [
  {
    title: 'Distributed Task & Queue Broker',
    category: 'backend api',
    label: 'Backend / Infra',
    accent: 'primary',
    metric: 'p99: 8ms',
    description:
      'High-throughput distributed task execution worker pool. Supports asynchronous job scheduling, priority queuing, and exponential retry strategies.',
    tech: ['FastAPI', 'Redis', 'Docker', 'Celery'],
    github: 'https://github.com'
  },
  {
    title: 'Autonomous Cloud Cost Optimizer',
    category: 'fullstack',
    label: 'Full Stack',
    accent: 'secondary',
    metric: 'Cost: -42%',
    description:
      'AWS resource auditor identifying unattached EBS volumes, oversized RDS instances, and stale IPs with automated downsizing scripts.',
    tech: ['React', 'Python', 'PostgreSQL', 'Boto3'],
    github: 'https://github.com'
  },
  {
    title: 'Real-Time Telemetry & Log Analytics',
    category: 'fullstack api',
    label: 'Telemetry',
    accent: 'tertiary',
    metric: '50k evt/s',
    description:
      'Centralized distributed telemetry platform ingesting structured logs and computing anomaly alerts across multi-node clusters in real-time.',
    tech: ['Go', 'React.js', 'TimescaleDB', 'WebSockets'],
    github: 'https://github.com'
  },
  {
    title: 'Secure Auth & Token Vault API',
    category: 'backend api',
    label: 'Security / IAM',
    accent: 'primary',
    metric: 'Zero Trust',
    description:
      'Lightweight identity and token exchange server. Features asymmetric RSA key rotation, OAuth2 grant delegations, and encrypted cookie sessions.',
    tech: ['FastAPI', 'OAuth2', 'JWT', 'Argon2id'],
    github: 'https://github.com'
  }
];

export const fallbackExperience = [
  {
    title: 'Senior Full-Stack Engineer',
    company: 'Horizon Cloud Systems',
    period: '2023 — Present · Full Time',
    accent: 'primary',
    description:
      'Leading the architectural design of high-throughput FastAPI microservices serving over 2.5M daily requests. Spearheaded frontend state management migration to React 18, cutting client-side re-renders by 35%. Tuned PostgreSQL query pipelines to reduce tail latency by 45ms across core API endpoints.',
    tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Docker', 'AWS ECS']
  },
  {
    title: 'Backend Systems Engineer',
    company: 'Nexus Fintech',
    period: '2021 — 2023 · 2 yrs',
    accent: 'secondary',
    description:
      'Constructed PCI-DSS compliant payment orchestrations with idempotency token controls and Redis distributed locking. Engineered asynchronous webhook delivery clusters handling 15,000 requests per minute with strict failure retry queues.',
    tech: ['Python', 'Redis', 'OAuth2 / JWT', 'SQLAlchemy']
  },
  {
    title: 'Software Engineer',
    company: 'ByteForge Labs',
    period: '2019 — 2021 · 2 yrs',
    accent: 'outline',
    description:
      'Developed shared UI component library modules in React and built micro-service endpoints using Python REST frameworks. Maintained automated end-to-end testing pipelines achieving 92% code coverage.',
    tech: ['React', 'TypeScript', 'REST API', 'Jest / Pytest']
  }
];

export const fallbackAchievements = [
  {
    icon: 'verified',
    color: 'primary',
    title: 'AWS Certified Solutions Architect',
    description:
      'Validated domain expertise in scalable multi-tier cloud architectures & zero-downtime deployments.',
    meta: 'Issued 2023 · Credential ID: AWS-782194'
  },
  {
    icon: 'code_blocks',
    color: 'secondary',
    title: 'FastAPI Core Contributor Recognition',
    description:
      'Contributions addressing async connection teardowns and background task parameter parsing fixes.',
    meta: 'GitHub OSS Commits: 14 accepted PRs'
  },
  {
    icon: 'emoji_events',
    color: 'primary',
    title: '1st Place FinTech Hackathon 2023',
    description:
      'Built autonomous fraud mitigation microservice inspecting transactional vectors via pgvector in real time.',
    meta: 'San Francisco HackFest · Over 40 Teams'
  },
  {
    icon: 'menu_book',
    color: 'tertiary',
    title: 'Published Technical Author',
    description:
      'Authored "Event-Driven Microservices with Python and FastAPI", read by over 12,000 backend developers.',
    meta: "O'Dev Technical Press · 2023"
  }
];