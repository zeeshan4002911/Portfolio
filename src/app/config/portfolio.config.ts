/**
 * SINGLE SOURCE OF TRUTH for the portfolio.
 *
 * Update anything here - name, role, projects, skills, experience -
 * and every section of the site updates automatically.
 *
 * To add a new project: append an object to `projects`.
 * To add a new skill group: append an object to `skills`.
 * To swap the avatar: drop your photo at `public/profile.jpg`
 * (or change `profile.avatarUrl` below to any image URL).
 */

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'mail' | 'twitter' | 'phone';
  url: string;
  label: string;
}

export interface SkillChip {
  label: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/**
 * One layer of a project's full-stack architecture (left card in Featured Projects).
 * `icon` picks the SVG drawn next to the layer name; defaults to a generic box.
 */
export interface StackLayer {
  layer: string;    // e.g. 'Client', 'API', 'Database', 'Engine', 'Integration', 'Infrastructure'
  tech: string;     // e.g. 'Angular + Kendo UI'
  icon?: 'client' | 'api' | 'database' | 'engine' | 'integration' | 'infra';
}

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  impact: string[];
  stack: string[];
  architecture: StackLayer[];
  github?: string;
  liveUrl?: string;
  /** Extra resource links - e.g. backend repo, API URL, design file, blog post. */
  links?: { label: string; url: string }[];
  /** Co-developers / collaborators rendered next to the role line. */
  collaborators?: { name: string; url?: string }[];
  /**
   * When true the project renders in the always-visible Featured block.
   * When false (or omitted) the project sits behind the "show more" toggle.
   */
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
  highlights: { title: string; detail: string }[];
  technologies: string[];
}

/**
 * Floating tech-stack badges around the hero avatar.
 *
 * `devicon` follows the path `<folder>/<file>` from the devicon CDN - e.g.
 *   'angular/angular-original', 'kubernetes/kubernetes-plain'.
 * The full URL becomes:
 *   https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{devicon}.svg
 *
 * Browse the catalog at https://devicon.dev - most icons have `-original`
 * (full color), `-plain` (mono), and `-plain-wordmark` variants.
 *
 * `color` is the brand hex used for the hover ring + glow.
 * `position` is any Tailwind position class string applied to the badge.
 */
export interface OrbitBadge {
  name: string;
  devicon: string;    // e.g. 'angular/angular-original'
  url: string;
  color: string;      // brand hex used on hover, e.g. '#DD0031'
  position: string;   // Tailwind position classes, e.g. 'left-2 top-10'
}

export interface PortfolioConfig {
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    summary: string;
    about: string[];
    avatarUrl: string;
    focus: string;
    expertise: string;
    industries: string[];
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
  };
  nav: { label: string; href: string }[];
  socials: SocialLink[];
  heroSkills: SkillChip[];
  specializations: string[];
  skills: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  orbitBadges: OrbitBadge[];
  certifications: string[];
  interests: string[];
}

export const PORTFOLIO: PortfolioConfig = {
  // ─── BASIC PROFILE ────────────────────────────────────────────────
  profile: {
    name: 'Md Zeeshan',
    role: 'Full Stack LLM Analyst',
    tagline: 'Full Stack Developer · LLM Analyst',
    location: 'Kolkata, India',
    summary:
      'Versatile Full Stack Developer delivering high-performance applications in Oil & Gas and Pharmaceutical sectors.',
    about: [
      'Architecting calculation-intensive backends and optimizing complex data hierarchies in PostgreSQL.',
      'Building sophisticated UIs by extending enterprise frameworks like Kendo UI.'
    ],
    avatarUrl: 'profile.jpg', // drop your photo at public/profile.jpg - falls back gracefully
    focus: 'Calculation-Intensive Full Stack',
    expertise: 'Data Pipelines & Enterprise UIs',
    industries: ['Software & Platform', 'Oil & Gas', 'Pharmaceutical Manufacturing'],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────
  contact: {
    email: 'zeeshan4002911@gmail.com',
    phone: '+91 9903342626',
    linkedin: 'https://linkedin.com/in/zeeshan4002911',
    github: 'https://github.com/zeeshan4002911/',
  },

  // ─── NAVIGATION (header links) ────────────────────────────────────
  nav: [
    { label: 'about', href: '#about' },
    { label: 'skills', href: '#skills' },
    { label: 'projects', href: '#projects' },
    { label: 'experience', href: '#experience' },
    { label: 'contact', href: '#contact' },
  ],

  // ─── SOCIAL LINKS (rendered in hero & footer) ─────────────────────
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/zeeshan4002911', label: 'LinkedIn' },
    { platform: 'mail', url: 'mailto:zeeshan4002911@gmail.com', label: 'Email' },
    { platform: 'phone', url: 'tel:+919903342626', label: 'Phone' },
    { platform: 'github', url: 'https://github.com/zeeshan4002911/', label: 'GitHub' },
  ],

  // ─── HERO QUICK-SKILL CHIPS ───────────────────────────────────────
  heroSkills: [
    { label: 'Python · Django' },
    { label: 'Angular · React' },
    { label: 'Node.js · Express' },
    { label: 'PostgreSQL · PL/pgSQL' },
    { label: 'Airflow · Kubernetes' },
  ],

  // ─── SPECIALIZATIONS (resume "Specializations" block) ─────────────
  specializations: [
    'JavaScript',
    'Python',
    'Frontend - Angular, React',
    'Backend - Django, Express.js',
    'Database - MySQL, Postgres, MongoDB',
  ],

  // ─── DETAILED SKILL MATRIX ────────────────────────────────────────
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'PL/pgSQL', 'HTML', 'CSS'],
    },
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'Kendo UI', 'Tailwind CSS', 'RxJS'],
    },
    {
      category: 'Backend',
      items: ['Django', 'Node.js', 'Express.js', 'REST APIs', 'MEAN stack'],
    },
    {
      category: 'Data Engineering',
      items: ['PostgreSQL', 'PySpark', 'Apache Airflow', 'Data Warehouse', 'ETL Pipelines'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['Kubernetes', 'Docker', 'CI/CD'],
    },
    {
      category: 'AI / LLM',
      items: ['Prompt Engineering', 'LLM Integration', 'Generative AI'],
    },
  ],

  // ─── PROFESSIONAL EXPERIENCE ──────────────────────────────────────
  // Listed most-recent first.
  // ⚠ The `period` strings below are placeholders - replace with your actual
  // LinkedIn months (e.g. 'Aug 2023 - Present', 'Jul 2022 - Jul 2023').
  experiences: [
    {
      id: 'accenture-commercial',
      company: 'Accenture',
      role: 'Full Stack LLM Analyst - Commercial & Transport',
      period: 'Sept 2024 - Present',
      location: 'Kolkata, India',
      current: true,
      summary:
        'Full-stack and calculation-intensive work for a Commercial & Transport (Oil & Gas) client - owning a vessel & outage tracking application and a refinery supply/demand engine driven by live operational data.',
      highlights: [
        {
          title: 'Vessel & Outage Tracking (Commercial)',
          detail:
            'Owned a commercial vessel & outage tracking application - voyage creation, updates, duplicate-check workflows, and integration with external source systems.',
        },
        {
          title: 'Refinery Supply & Demand',
          detail:
            'Built heavy-calculation supply/demand logic for refinery runs, driven by live outage events.',
        },
        {
          title: 'Advanced Database Architecture',
          detail:
            'Designed optimized PostgreSQL functions handling hierarchical industrial data structures with strong integrity guarantees.',
        },
        {
          title: 'Enterprise UI Customization',
          detail:
            'Extended Kendo UI with virtualization and dynamic detail expansion for large-scale operational data management.',
        },
        {
          title: 'Scalable Backend Logic',
          detail:
            'Built REST APIs serving as the backbone for responsive, data-rich dashboards under heavy computational load.',
        },
        {
          title: 'Performance & Security',
          detail:
            'Resolved performance bottlenecks and implemented rigorous security controls for proprietary industrial data.',
        },
      ],
      technologies: [
        'Angular', 'Django', 'Python', 'PostgreSQL', 'PL/pgSQL',
        'Node.js', 'Express.js', 'Kendo UI'
      ],
    },
    {
      id: 'accenture-pharma',
      company: 'Accenture',
      role: 'Data Engineering & Management Analyst - Pharma Client',
      period: 'Nov 2023 - Sept 2024',
      location: 'Bengaluru, India',
      summary:
        'Data engineering and DevOps for the same pharmaceutical client whose investigation application I worked on at Flutura - building ETL pipelines for the datamart and data warehouse, and managing containerized deployments.',
      highlights: [
        {
          title: 'ETL Pipelines - Datamart & Data Warehouse',
          detail:
            'Built and operated ETL pipelines feeding the datamart and data warehouse, including data flows powering the pharma investigation application.',
        },
        {
          title: 'Investigation App Data Flows',
          detail:
            'Engineered the upstream pipelines that delivered cleansed, RCA-ready data into the defect investigation application.',
        },
        {
          title: 'DevOps & Container Orchestration',
          detail:
            'Managed Docker / Kubernetes deployments and CI workflows to keep pipeline jobs and supporting services running reliably 24/7.',
        },
        {
          title: 'Compliance & Data Governance',
          detail:
            'Applied access controls, audit logging, and data-quality checks suited to sensitive pharmaceutical data.',
        },
      ],
      technologies: [
        'Python', 'PySpark', 'Apache Airflow', 'PostgreSQL', 'Data Warehouse',
        'Kubernetes', 'Docker', 'CI/CD',
      ],
    },
    {
      id: 'flutura',
      company: 'Flutura Decision Sciences & Analytics',
      role: 'Full Stack Programmer',
      period: 'Feb 2023 - Nov 2023',
      location: 'Bangalore, India',
      summary:
        'Built analytics platforms and root-cause-analysis tooling for pharmaceutical manufacturing - operational dashboards, a defect investigation application, and a rule engine driving automatic fishbone diagram generation.',
      highlights: [
        {
          title: 'Operational Dashboards',
          detail:
            'Developed interactive dashboards surfacing real-time manufacturing analytics and defect trends for plant operations teams.',
        },
        {
          title: 'Defect Investigation Application',
          detail:
            'Built an investigation application for pharma defect analysis - using Root Cause Analysis (RCA) workflows and fishbone diagrams to visualize and explore causal chains.',
        },
        {
          title: 'Fishbone Rule Engine',
          detail:
            'Designed a rule engine that automatically generates fishbone diagrams from input data and highlights the most relevant causal branches based on configurable rules.',
        },
        {
          title: 'Cross-functional Delivery',
          detail:
            'Worked closely with data scientists and domain experts to translate manufacturing-process knowledge into shipping product features.',
        },
      ],
      technologies: [
        'JavaScript', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'Highcharts'
      ],
    },
  ],

  // ─── FEATURED PROJECTS ────────────────────────────────────────────
  // `featured: true` → always visible.
  // `featured: false` (or omitted) → tucked behind the "show more" toggle.
  // Add a new project by copying one of the blocks below.
  projects: [
    // ── Featured: personal / open-source projects with live demos ──
    {
      id: 'codecrack',
      title: 'CodeCrack - Web IDE',
      role: 'Creator · Solo Project',
      description:
        'A lightweight, web-based mini IDE built on top of Monaco Editor - multi-language code editing, formatting, diff checking, and shareable code snippets persisted on a global edge backend.',
      impact: [
        'Monaco-powered editor with syntax highlighting across many languages',
        'Code formatting, diff comparison, and share-via-link workflows',
        'Shared snippets persisted via Cloudflare Workers + D1 at the edge',
      ],
      stack: ['Angular', 'TypeScript', 'Monaco Editor', 'Vite', 'Cloudflare Workers', 'D1'],
      architecture: [
        { layer: 'Client',         tech: 'Angular + Monaco Editor',     icon: 'client' },
        { layer: 'Edge API',       tech: 'Cloudflare Workers',          icon: 'api' },
        { layer: 'Database',       tech: 'Cloudflare D1 (SQLite)',      icon: 'database' },
        { layer: 'Infrastructure', tech: 'Cloudflare Pages (Edge)',     icon: 'infra' },
      ],
      github: 'https://github.com/zeeshan4002911/codecrack',
      liveUrl: 'https://codecrack.pages.dev',
      featured: true,
    },
    {
      id: 'chat-app-realtime',
      title: 'Real-time Chat App',
      role: 'Creator · Solo Project',
      description:
        'Real-time chat application for both desktop and mobile, with Firebase authentication and Firestore-backed live message sync between rooms.',
      impact: [
        'Live messaging powered by Firestore real-time listeners',
        'Firebase Auth with protected routes for signed-in users',
        'Responsive UI tuned for both desktop and mobile breakpoints',
      ],
      stack: ['React', 'React Router', 'Firebase Auth', 'Firestore', 'JavaScript'],
      architecture: [
        { layer: 'Client',         tech: 'React + React Router',        icon: 'client' },
        { layer: 'Auth',           tech: 'Firebase Auth',               icon: 'integration' },
        { layer: 'Realtime DB',    tech: 'Firestore',                   icon: 'database' },
        { layer: 'Infrastructure', tech: 'Cloudflare Pages',            icon: 'infra' },
      ],
      github: 'https://github.com/zeeshan4002911/Chat-App-realtime',
      liveUrl: 'https://chat-app-f1e93.pages.dev/',
      featured: true,
    },
    {
      id: 'laundry-cart',
      title: 'Laundry Cart - MERN Stack',
      role: 'Co-developer · MERN Stack',
      collaborators: [
        { name: 'NoorMohammed789', url: 'https://github.com/NOORMOHAMMED789' },
      ],
      description:
        'Full-stack laundry cart service built in collaboration with a fellow developer - responsive React frontend on Cloudflare Pages, plus a Node/Express/MongoDB backend with JWT auth deployed on Render.',
      impact: [
        'Mobile-first, fully responsive frontend across breakpoints',
        'Secure REST API with JWT authentication and bcrypt password hashing',
        'Mongoose-modeled MongoDB schemas covering users, products, and orders',
        'Frontend on Cloudflare Pages, backend on Render - both publicly live',
      ],
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt'],
      architecture: [
        { layer: 'Client',         tech: 'React (responsive)',                icon: 'client' },
        { layer: 'API',            tech: 'Node.js + Express + JWT',           icon: 'api' },
        { layer: 'Database',       tech: 'MongoDB + Mongoose',                icon: 'database' },
        { layer: 'Infrastructure', tech: 'Cloudflare Pages · Render',         icon: 'infra' },
      ],
      github: 'https://github.com/zeeshan4002911/Laundry-Cart-FrontEnd',
      liveUrl: 'https://laundry-cart-frontend.pages.dev/',
      links: [
        { label: 'backend repo', url: 'https://github.com/zeeshan4002911/Laundry-Cart-BackEnd' }
      ],
      featured: true,
    },

    // ── Behind "show more": professional / enterprise projects ──
    {
      id: 'refinery-supply-demand',
      title: 'Refinery Supply & Demand Engine',
      role: 'Full Stack Developer · Accenture',
      description:
        'Calculation-intensive supply & demand engine for refinery runs - modeling nameplate capacity and adjusting projections live against outage events.',
      impact: [
        'Modeled heavy supply/demand calculations driven by nameplate capacity and outages',
        'Reacted in near real-time to outage signals affecting refinery throughput',
        'Optimized PostgreSQL functions to keep calc latency low for large datasets',
      ],
      stack: ['Angular', 'Django', 'PostgreSQL', 'PL/pgSQL', 'Python', 'Kubernetes'],
      architecture: [
        { layer: 'Client',         tech: 'Angular Dashboards',              icon: 'client' },
        { layer: 'API',            tech: 'Django REST',                     icon: 'api' },
        { layer: 'Engine',         tech: 'Supply / Demand Calculation',     icon: 'engine' },
        { layer: 'Database',       tech: 'PostgreSQL + PL/pgSQL',     icon: 'database' },
        { layer: 'Integrations',   tech: 'Outage Event Feed',        icon: 'integration' },
        { layer: 'Infrastructure', tech: 'Kubernetes',                      icon: 'infra' },
      ],
      featured: false,
    },
    {
      id: 'vessel-outage-tracking',
      title: 'Vessel & Outage Tracking (Commercial)',
      role: 'Full Stack Developer · Accenture',
      description:
        'Commercial application for tracking vessels and refinery outages - voyage creation, updates, duplicate-check workflows, and integration with external source systems feeding live operational data.',
      impact: [
        'Owned end-to-end voyage and outage lifecycle workflows',
        'Built duplicate-detection logic preventing data inconsistency at scale',
        'Integrated with external source systems for live operational visibility',
      ],
      stack: ['Angular', 'Kendo UI', 'Django', 'PostgreSQL', 'PL/pgSQL', 'Kubernetes'],
      architecture: [
        { layer: 'Client',         tech: 'Angular + Kendo UI',        icon: 'client' },
        { layer: 'API',            tech: 'Django REST Framework',     icon: 'api' },
        { layer: 'Database',       tech: 'PostgreSQL + Materialized Views', icon: 'database' },
        { layer: 'Integrations',   tech: 'External Source Systems',   icon: 'integration' },
        { layer: 'Infrastructure', tech: 'Kubernetes + Docker',       icon: 'infra' },
      ],
      featured: false,
    },
    {
      id: 'pharma-fishbone',
      title: 'Pharma Defect Investigation & Fishbone Rule Engine',
      role: 'Software Engineer · Flutura',
      description:
        'Investigation application for root-cause analysis of pharmaceutical defects, with a rule engine that automatically generates and highlights fishbone diagrams based on defect data.',
      impact: [
        'Automated fishbone diagram generation from raw defect signals',
        'Highlighted most-likely causal branches via configurable rule sets',
        'Cut defect investigation time for plant teams through guided RCA flows',
      ],
      stack: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'D3.js', 'Rule Engines'],
      architecture: [
        { layer: 'Client',   tech: 'Angular + D3.js',          icon: 'client' },
        { layer: 'API',      tech: 'Node.js + Express',        icon: 'api' },
        { layer: 'Engine',   tech: 'Fishbone Rule Engine',     icon: 'engine' },
        { layer: 'Database', tech: 'MongoDB',                  icon: 'database' },
      ],
      featured: false,
    },
  ],

  // ─── HERO ORBIT BADGES (floating tech logos around avatar) ───────
  // Logos pulled from cdn.simpleicons.org. Look up slugs at https://simpleicons.org.
  orbitBadges: [
    { name: 'Angular',    devicon: 'angular/angular-original',       url: 'https://angular.dev',            color: '#DD0031', position: 'right-2 top-6' },
    { name: 'TypeScript', devicon: 'typescript/typescript-original', url: 'https://www.typescriptlang.org', color: '#3178C6', position: 'left-2 top-10' },
    { name: 'Python',     devicon: 'python/python-original',         url: 'https://www.python.org',         color: '#3776AB', position: 'right-12 -top-2' },
    { name: 'Node.js',    devicon: 'nodejs/nodejs-original',         url: 'https://nodejs.org',             color: '#5FA04E', position: 'left-0 bottom-20' },
    { name: 'PostgreSQL', devicon: 'postgresql/postgresql-original', url: 'https://www.postgresql.org',     color: '#4169E1', position: 'right-0 bottom-10' },
    { name: 'Kubernetes', devicon: 'kubernetes/kubernetes-plain',    url: 'https://kubernetes.io',          color: '#326CE5', position: 'left-12 -bottom-2' },
  ],

  // ─── CERTIFICATIONS ───────────────────────────────────────────────
  certifications: [
    'CS50 - Harvard University',
    'CS101 Introduction to Computer Science',
    'Legacy Full Stack - freeCodeCamp',
  ],

  // ─── PERSONAL INTERESTS ───────────────────────────────────────────
  interests: [
    'Distributed systems & solution architecture journals',
    'Following advancements in AI / LLMs',
  ],
};
