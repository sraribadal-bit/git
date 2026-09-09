import { FreelancerProfile, GigProject, KanbanTask, PSDMCertification } from '@/types';

export const INITIAL_FREELANCER: FreelancerProfile = {
  id: 'freelancer-psdm-101',
  name: 'Badal Srari',
  handle: '@badal_builds',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  title: 'Full-Stack & Generative AI Builder',
  bio: 'PSDM NSQF-5 Certified Developer specializing in Next.js, FastAPI, Vector Embeddings & automated MSME workflow systems. Graduated top of batch from MSDC Mohali.',
  location: 'Mohali / Chandigarh Capital Region, PB',
  hourlyRate: 1500,
  jobSuccessScore: 100,
  completedJobs: 14,
  totalEarnings: 384000,
  psdmAccredited: true,
  psdmLevel: 5,
  skills: ['Next.js', 'Python', 'Gemini API', 'FastAPI', 'PostgreSQL', 'TailwindCSS', 'Docker', 'UPI Gateway'],
  featuredProject: {
    title: 'Real-Time Logistics Analytics Engine',
    description: 'High-throughput telemetry & route optimization portal built for Ludhiana industrial freight carriers with live map clustering and automated consignment invoicing.',
    metrics: 'Processed 45,000+ daily waybills with 99.98% uptime',
    clientReview: 5.0,
    tags: ['Next.js 14', 'PostgreSQL', 'Mapbox', 'Gemini 1.5'],
    liveUrl: 'https://logistics-demo.techpunjab.in',
    githubUrl: 'https://github.com/badal-dev/punjab-freight-tracker',
  },
  certifications: [
    {
      certificateId: 'PB-PSDM-2024-AI-89421',
      candidateName: 'Badal Srari',
      courseName: 'Full Stack Web & Applied Generative AI Engineering',
      nsqfLevel: 5,
      batchYear: '2024',
      trainingCenter: 'Multi Skill Development Centre (MSDC), Mohali Sector 66',
      sha256Proof: '0x8f4c2e91b63a074129df87b32c510fae6e34279b9087c53641b9e078cd5b7194',
      verifiedAt: '12 Aug 2024, 11:32 AM IST',
      badgeTitle: 'Punjab Skill Development Mission (Level 5 Certified)',
      status: 'VERIFIED',
    },
    {
      certificateId: 'PB-PSDM-2023-PY-55102',
      candidateName: 'Badal Srari',
      courseName: 'Advanced Python, Cloud Microservices & API Architecture',
      nsqfLevel: 4,
      batchYear: '2023',
      trainingCenter: 'Govt. ITI Ludhiana & PSDM Incubation Centre',
      sha256Proof: '0x3a7e112d8f990bc571b04ef9281a6c4293f01c8bb2549a0d81ef3901bca28e14',
      verifiedAt: '18 Nov 2023, 04:15 PM IST',
      badgeTitle: 'PSDM Cloud & Data Micro-Credentials',
      status: 'VERIFIED',
    }
  ],
};

export const INITIAL_GIGS: GigProject[] = [
  {
    id: 'gig-techpb-001',
    title: 'Automated Inventory & Supply Chain Tracker for Retail MSME',
    clientName: 'Harjit Chawla',
    clientCompany: 'Amritsar AgroFoods & Retail Corp',
    clientLocation: 'Amritsar Industrial Focal Point',
    budget: 20000,
    escrowLockedAmount: 15000,
    deadline: '14 Days',
    category: 'Web & AI',
    skillsRequired: ['Next.js', 'FastAPI', 'Gemini API', 'PostgreSQL', 'UPI Escrow'],
    description: 'We need an automated inventory forecasting dashboard for our multi-warehouse FMCG distribution. Must include real-time stock alert notifications, automated supplier reorder prompts via WhatsApp/SMS, and an executive revenue dashboard.',
    matchScore: 98,
    matchRationale: 'Semantic match 98% with Badal’s PSDM Full-Stack credential and proven experience building logistics telemetry and inventory platforms.',
    status: 'IN_PROGRESS',
    milestones: [
      {
        id: 'm-1',
        title: 'Milestone 1: Database Schema & Core Warehouse APIs',
        description: 'PostgreSQL schema design with Prisma ORM and FastAPI CRUD endpoints for SKUs, inventory bins, and transaction ledgers.',
        amount: 5000,
        dueDate: '3 Days',
        status: 'COMPLETED',
        deliverables: ['Database ERD', 'FastAPI Swagger Docs', 'Docker Compose'],
        submissionNote: 'Database schema deployed to Supabase and API test suite passed with 100% coverage.',
        submissionFile: 'api-spec-v1.json',
        submissionDate: 'Yesterday at 5:20 PM',
        transactionHash: '0x99a2c3...f401',
        upiRefNumber: 'UPI/240981928371/SUCCESS',
      },
      {
        id: 'm-2',
        title: 'Milestone 2: Real-Time Stock Telemetry & AI Forecasting Model',
        description: 'Implement predictive low-stock warning engine using statistical Holt-Winters & Gemini prompt summarization.',
        amount: 10000,
        dueDate: 'Release in 48 hours',
        status: 'LOCKED',
        deliverables: ['Telemetry service', 'Predictive dashboard UI', 'Alert cron daemon'],
        submissionNote: 'Deliverable ready for client validation. Integrated Gemini API for natural language replenishment suggestions.',
        submissionFile: 'inventory-forecasting-pr-preview.zip',
        submissionDate: 'Today at 10:14 AM',
      },
      {
        id: 'm-3',
        title: 'Milestone 3: End-to-End Testing, Role Auth & Production Handover',
        description: 'Multi-tenant authentication for warehouse managers and automated WhatsApp dispatch notification hooks.',
        amount: 5000,
        dueDate: '8 Days',
        status: 'PENDING',
        deliverables: ['Production deployment build', 'User guide PDF', 'Admin video walkthrough'],
      }
    ],
  },
  {
    id: 'gig-techpb-002',
    title: 'IoT Sensor Dashboard for Verka Cooperative Milk Chillers',
    clientName: 'Dr. Paramjit Dhillon',
    clientCompany: 'Punjab Cooperative Dairy Federation',
    clientLocation: 'Mohali Industrial Area, Phase 8',
    budget: 35000,
    escrowLockedAmount: 9500,
    deadline: '21 Days',
    category: 'IoT & Automation',
    skillsRequired: ['Python', 'MQTT', 'Next.js', 'TimescaleDB', 'TailwindCSS'],
    description: 'Cloud dashboard capturing temperature, turbidity, and volume sensor telemetry from 120 rural milk chilling centers across Punjab. Alerting system when cooling thresholds breach 4°C.',
    matchScore: 94,
    matchRationale: 'High alignment with candidate’s IoT telemetry coursework at MSDC Mohali and Python microservices credential.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-201',
        title: 'MQTT Broker Integration & Hardware Gateway Handshake',
        description: 'Secure TLS MQTT ingestion endpoint for ESP32 hardware units.',
        amount: 9500,
        dueDate: '5 Days',
        status: 'LOCKED',
      },
      {
        id: 'm-202',
        title: 'Time-Series Data Pipelines & Anomaly Detection',
        description: 'TimescaleDB retention policies and real-time threshold alert webhooks.',
        amount: 15500,
        dueDate: '12 Days',
        status: 'PENDING',
      },
      {
        id: 'm-203',
        title: 'Mobile PWA for Field Technicians',
        description: 'Offline-first PWA for field maintenance officers with GPS geo-fencing.',
        amount: 10000,
        dueDate: '20 Days',
        status: 'PENDING',
      }
    ]
  },
  {
    id: 'gig-techpb-003',
    title: 'Export Compliance & Customs EDI Invoicing for Jalandhar Sports Cluster',
    clientName: 'Raman Sood',
    clientCompany: 'Vanguard Sports & Leatherworks',
    clientLocation: 'Jalandhar Sports Market Hub',
    budget: 28000,
    escrowLockedAmount: 0,
    deadline: '18 Days',
    category: 'Cloud & Data',
    skillsRequired: ['Next.js', 'PostgreSQL', 'PDF Engine', 'FastAPI'],
    description: 'Custom ERP module generating ICEGATE compliant shipping bills, HS code validation, and currency exchange conversion for European sports apparel buyers.',
    matchScore: 89,
    matchRationale: 'Strong fit for candidate’s invoice automation and PostgreSQL schema design proficiency.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-301',
        title: 'HS Code Validation & Tax Rules Engine',
        description: 'Automate tariff classification and customs duty calculations.',
        amount: 8000,
        dueDate: '4 Days',
        status: 'PENDING',
      },
      {
        id: 'm-302',
        title: 'Dynamic PDF Generator with Digital Signature (e-Sign)',
        description: 'High fidelity printable invoices with Aadhaar / DSC token verification.',
        amount: 12000,
        dueDate: '10 Days',
        status: 'PENDING',
      },
      {
        id: 'm-303',
        title: 'ICEGATE Customs EDI Integration API Handshake',
        description: 'Direct XML transmission to Indian customs portal.',
        amount: 8000,
        dueDate: '18 Days',
        status: 'PENDING',
      }
    ]
  },
  {
    id: 'gig-techpb-004',
    title: 'Gemini Vision Quality Inspection System for Textile Weaving MSME',
    clientName: 'Sardar Baldev Singh',
    clientCompany: 'Amritsar Silk & Woolen Mills',
    clientLocation: 'Amritsar Textile Focal Point',
    budget: 45000,
    escrowLockedAmount: 22000,
    deadline: '15 Days',
    category: 'AI Services',
    skillsRequired: ['Gemini API', 'Computer Vision', 'Python', 'FastAPI', 'PyTorch'],
    description: 'Automated fabric defect detection system using Gemini 1.5 Pro multimodal vision. Captures live industrial camera feeds to flag yarn misweaves, stains, and density imperfections in real-time.',
    matchScore: 97,
    matchRationale: 'Direct match for applied Generative AI and Python computer vision capabilities.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-401',
        title: 'Camera Ingestion & Gemini Vision Prompt Pipeline',
        description: 'Frame extraction daemon and structured JSON defect classification output.',
        amount: 12000,
        dueDate: '5 Days',
        status: 'PENDING'
      },
      {
        id: 'm-402',
        title: 'Factory Floor Real-Time Alert Screen & Escrow Handshake',
        description: 'Low-latency dashboard with audio alert and shift yield metrics.',
        amount: 10000,
        dueDate: '10 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-005',
    title: 'Brand Identity, Packaging Design & Modern UI for Kinnow Juice Export MSME',
    clientName: 'Manpreet Sandhu',
    clientCompany: 'Abohar Citrus Organics Pvt Ltd',
    clientLocation: 'Abohar Agro Park, Fazilka',
    budget: 28000,
    escrowLockedAmount: 14000,
    deadline: '10 Days',
    category: 'Design & Creative',
    skillsRequired: ['Figma', 'Packaging Design', 'Brand Identity', 'UI/UX', 'TailwindCSS'],
    description: 'Complete export branding package including retail bottle label designs, export carton box typography, and a modern DTC storefront landing page in Figma.',
    matchScore: 92,
    matchRationale: 'Matches UI/UX and product design competencies for agricultural MSMEs.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-501',
        title: 'Packaging & Vector Print Artwork Deliverables',
        description: 'Print-ready CMYK files with barcodes and nutritional compliance labels.',
        amount: 8000,
        dueDate: '4 Days',
        status: 'PENDING'
      },
      {
        id: 'm-502',
        title: 'Figma UI Component System & Storefront Mockups',
        description: 'Interactive high-fidelity prototype with mobile-responsive design.',
        amount: 6000,
        dueDate: '6 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-006',
    title: 'B2B Export Lead Generation & Regional SEO for Bicycle Components Manufacturer',
    clientName: 'Vikramjit Ahluwalia',
    clientCompany: 'Hero Allied Gears & Engineering',
    clientLocation: 'Ludhiana Industrial Focal Point',
    budget: 32000,
    escrowLockedAmount: 16000,
    deadline: '20 Days',
    category: 'Sales & Marketing',
    skillsRequired: ['B2B Sales', 'SEO', 'Email Marketing', 'LinkedIn Outreach', 'HubSpot'],
    description: 'Drive high-ticket European and ASEAN distributor inquiries for cycle hubs and gear brackets through targeted LinkedIn ABM campaigns and technical SEO optimization.',
    matchScore: 90,
    matchRationale: 'Ideal for digital growth specialists targeting industrial supply chains.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-601',
        title: 'Technical B2B SEO Audit & Buyer Persona Mapping',
        description: 'Keyword research and structured data implementation for global distributor search.',
        amount: 8000,
        dueDate: '7 Days',
        status: 'PENDING'
      },
      {
        id: 'm-602',
        title: 'Outreach Campaign & Verified Distributor Pipeline',
        description: 'Delivery of 50+ vetted overseas buyer meetings and qualified RFQs.',
        amount: 8000,
        dueDate: '13 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-007',
    title: 'Multilingual Technical Handbooks & Operator Manuals (Punjabi, English, Hindi)',
    clientName: 'Sukhdev Brar',
    clientCompany: 'Preet Harvester Combine Works',
    clientLocation: 'Nabha - Patiala Road',
    budget: 20000,
    escrowLockedAmount: 10000,
    deadline: '12 Days',
    category: 'Writing & Translation',
    skillsRequired: ['Technical Writing', 'Gurmukhi Localization', 'Proofreading', 'User Guides'],
    description: 'Author step-by-step illustrated safety guides and hydraulic maintenance manuals in English, with authentic Punjabi (Gurmukhi) translation for rural agricultural operators.',
    matchScore: 93,
    matchRationale: 'Strong fit for regional bilingual technical writers and localization specialists.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-701',
        title: 'English Technical Safety & Maintenance Standard Draft',
        description: 'Comprehensive 40-page equipment maintenance procedures draft.',
        amount: 5000,
        dueDate: '5 Days',
        status: 'PENDING'
      },
      {
        id: 'm-702',
        title: 'Punjabi Gurmukhi & Hindi Certified Translation Delivery',
        description: 'Accurate terminology verified by agricultural engineering specialists.',
        amount: 5000,
        dueDate: '7 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-008',
    title: 'Virtual MSME Operations Support & Customer CRM Processing',
    clientName: 'Simran Jolly',
    clientCompany: 'Doaba Sports Garments & Tracksuits',
    clientLocation: 'Jalandhar Leather Complex',
    budget: 18000,
    escrowLockedAmount: 8000,
    deadline: '30 Days',
    category: 'Admin & Support',
    skillsRequired: ['Virtual Assistant', 'Zoho CRM', 'Excel / Sheets', 'Order Management'],
    description: 'Manage daily wholesale order entries, inventory sync across Amazon/Flipkart/B2B channels, and dispatch coordination with Blue Dart logistics.',
    matchScore: 88,
    matchRationale: 'Fits administrative specialists with e-commerce operations experience.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-801',
        title: 'First Fortnight Operations & Dispatch Reconciliations',
        description: '100% on-time dispatch dispatch logs and CRM updates.',
        amount: 4000,
        dueDate: '15 Days',
        status: 'PENDING'
      },
      {
        id: 'm-802',
        title: 'Month-End Multi-Channel Audit & Inventory Reconciliation',
        description: 'Final reconciliation statement matching bank receipts and courier dockets.',
        amount: 4000,
        dueDate: '30 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-009',
    title: 'GST Reconciliations, E-Way Bill Automations & Tally Prime Cloud Migration',
    clientName: 'Ashok Garg',
    clientCompany: 'Malwa Cotton Ginning & Pressing Industries',
    clientLocation: 'Bathinda Industrial Growth Centre',
    budget: 30000,
    escrowLockedAmount: 15000,
    deadline: '14 Days',
    category: 'Finance & Accounting',
    skillsRequired: ['Tally Prime', 'GST Filing', 'E-Way Bills', 'Financial Modeling', 'Audit'],
    description: 'Migrate on-premise Tally 9 data to AWS Tally Prime cloud, automate GSTR-2B input tax credit reconciliation, and streamline automated e-Way bill JSON generation.',
    matchScore: 94,
    matchRationale: 'Designed for accounting professionals with cloud ERP and tax automation expertise.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-901',
        title: 'Cloud Tally Migration & Historical Ledger Cleansing',
        description: 'Zero data discrepancy verification across 5 fiscal years.',
        amount: 7000,
        dueDate: '5 Days',
        status: 'PENDING'
      },
      {
        id: 'm-902',
        title: 'Automated GSTR-2B ITC Matching & e-Way Bill Webhooks',
        description: 'Automated discrepancy detector reducing audit cycle by 80%.',
        amount: 8000,
        dueDate: '9 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-010',
    title: 'MSME Vendor Master Agreement, Non-Disclosure Contracts & Samadhaan Filing',
    clientName: 'Advocate Rajesh Thapar',
    clientCompany: 'Punjab Steel Re-Rolling Mills Association',
    clientLocation: 'Mandi Gobindgarh Steel Town',
    budget: 26000,
    escrowLockedAmount: 12000,
    deadline: '10 Days',
    category: 'Legal',
    skillsRequired: ['Contract Law', 'MSME Samadhaan', 'NDA', 'Commercial Drafting', 'IP Protection'],
    description: 'Draft standardized bilingual supplier procurement agreements, ironclad Non-Disclosure Agreements for proprietary alloy formulas, and advisory on MSME Samadhaan payment recovery petitions.',
    matchScore: 91,
    matchRationale: 'Tailored for legal researchers and corporate contract specialists.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-1001',
        title: 'Master Supplier Contract & Mutual NDA Templates',
        description: 'Vetted draft compliant with Indian Contract Act and MSMED Act 2006.',
        amount: 6000,
        dueDate: '4 Days',
        status: 'PENDING'
      },
      {
        id: 'm-1002',
        title: 'Delayed Payment Interest Claim Dossier & Samadhaan Formats',
        description: 'Complete claim documentation with statutory interest calculations.',
        amount: 6000,
        dueDate: '6 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-011',
    title: 'PSDM Vocational Trainee Hiring Drive & Skill Assessment Platform Setup',
    clientName: 'Ravinder Cheema',
    clientCompany: 'Mohali Technology Incubation Hub',
    clientLocation: 'Mohali Quark City IT SEZ',
    budget: 24000,
    escrowLockedAmount: 12000,
    deadline: '15 Days',
    category: 'HR & Training',
    skillsRequired: ['Technical Recruitment', 'PSDM Alignment', 'LMS Setup', 'Staffing', 'Evaluation'],
    description: 'Coordinate recruitment drive for 25 junior full-stack developers graduating from MSDC Mohali and ITI Patiala, establishing automated coding test evaluations and onboarding LMS.',
    matchScore: 95,
    matchRationale: 'Direct match for HR recruiters specializing in Punjab Government skill initiatives.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-1101',
        title: 'Candidate Screening & Technical Assessment Sandbox',
        description: 'Shortlisting of top 50 PSDM candidates with verified badge validation.',
        amount: 6000,
        dueDate: '7 Days',
        status: 'PENDING'
      },
      {
        id: 'm-1102',
        title: 'Offer Letter Execution & 30-Day Onboarding Curriculum',
        description: 'Successful placement confirmation and digital credential record.',
        amount: 6000,
        dueDate: '8 Days',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'gig-techpb-012',
    title: 'SolidWorks 3D CAD Modeling & CNC Machining Blueprints for Tractor Transmission',
    clientName: 'Er. Hardeep Toor',
    clientCompany: 'Swaraj Tractor Ancillary Forge',
    clientLocation: 'Ludhiana Auto Cluster',
    budget: 48000,
    escrowLockedAmount: 24000,
    deadline: '18 Days',
    category: 'Engineering & Architecture',
    skillsRequired: ['SolidWorks', 'CAD / CAM', 'CNC G-Code', 'Industrial Design', 'Mechanical Engineering'],
    description: 'Precision 3D CAD modeling and finite element stress analysis for heavy tractor differential bevel gears, delivering production-ready GD&T blueprints and CNC milling G-code.',
    matchScore: 96,
    matchRationale: 'Designed for certified mechanical CAD engineers and industrial toolmakers.',
    status: 'OPEN',
    milestones: [
      {
        id: 'm-1201',
        title: '3D Parasolid Models & FEA Stress Simulation Report',
        description: 'Torsional stress validation under 2000 Nm torque loading.',
        amount: 12000,
        dueDate: '8 Days',
        status: 'PENDING'
      },
      {
        id: 'm-1202',
        title: 'Production 2D Drawings & 5-Axis CNC Toolpath G-Code',
        description: 'Complete machining package tested on Haas CNC simulator.',
        amount: 12000,
        dueDate: '10 Days',
        status: 'PENDING'
      }
    ]
  }
];

export const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  {
    id: 'task-101',
    gigId: 'gig-techpb-001',
    title: 'Prisma DB Migration & Seed Initial Bins',
    milestoneTitle: 'Milestone 1: DB & APIs',
    payoutAmount: 5000,
    column: 'COMPLETED',
    priority: 'HIGH',
    assignee: 'Badal Srari',
    githubUrl: 'https://github.com/badal-dev/punjab-freight-tracker/pull/1',
    dueDate: 'Completed',
  },
  {
    id: 'task-102',
    gigId: 'gig-techpb-001',
    title: 'Gemini 1.5 Prompt Engine for Stock Forecasting',
    milestoneTitle: 'Milestone 2: AI Forecasting',
    payoutAmount: 6000,
    column: 'IN_REVIEW',
    priority: 'HIGH',
    assignee: 'Badal Srari',
    githubUrl: 'https://github.com/badal-dev/punjab-freight-tracker/pull/4',
    figmaUrl: 'https://figma.com/@techpunjab/inventory-preview',
    dueDate: 'Today, 6:00 PM',
  },
  {
    id: 'task-103',
    gigId: 'gig-techpb-001',
    title: 'Low-Stock Realtime Webhook & Push Notifications',
    milestoneTitle: 'Milestone 2: AI Forecasting',
    payoutAmount: 4000,
    column: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assignee: 'Badal Srari',
    githubUrl: 'https://github.com/badal-dev/punjab-freight-tracker/tree/feature/webhooks',
    dueDate: 'Tomorrow',
  },
  {
    id: 'task-104',
    gigId: 'gig-techpb-001',
    title: 'Role-Based Access Control (RBAC) & OAuth2 Flow',
    milestoneTitle: 'Milestone 3: Auth & Handover',
    payoutAmount: 2500,
    column: 'TODO',
    priority: 'MEDIUM',
    assignee: 'Badal Srari',
    dueDate: 'In 5 days',
  },
  {
    id: 'task-105',
    gigId: 'gig-techpb-001',
    title: 'Docker Production Orchestration & SSL Deployment',
    milestoneTitle: 'Milestone 3: Auth & Handover',
    payoutAmount: 2500,
    column: 'TODO',
    priority: 'LOW',
    assignee: 'Badal Srari',
    dueDate: 'In 7 days',
  }
];

export const PSDM_VERIFIED_LEDGER: PSDMCertification[] = [
  INITIAL_FREELANCER.certifications[0],
  INITIAL_FREELANCER.certifications[1],
  {
    certificateId: 'PB-PSDM-2024-IOT-31298',
    candidateName: 'Simranjeet Kaur',
    courseName: 'Industrial IoT & Smart Sensors Automation',
    nsqfLevel: 5,
    batchYear: '2024',
    trainingCenter: 'Govt. Polytechnic College, Jalandhar',
    sha256Proof: '0x1c98e3b56a421f98d7210e4a65b983ef1803dc5428a1c3e4187f5a0194821cde',
    verifiedAt: '03 Sep 2024, 09:12 AM IST',
    badgeTitle: 'Punjab Skill Development Mission (Level 5 Certified)',
    status: 'VERIFIED',
  },
  {
    certificateId: 'PB-PSDM-2024-UI-44810',
    candidateName: 'Amanjot Virdi',
    courseName: 'Product Design, UI/UX & Human Centered Engineering',
    nsqfLevel: 5,
    batchYear: '2024',
    trainingCenter: 'MSDC Jalandhar (Leather Complex Road)',
    sha256Proof: '0x7e221c90a41d8e5f1b204918e6c7104a390b1c5520847b2c9184fae38902ca8b',
    verifiedAt: '28 Aug 2024, 03:40 PM IST',
    badgeTitle: 'Punjab Skill Development Mission (Level 5 Certified)',
    status: 'VERIFIED',
  },
  {
    certificateId: 'PB-PSDM-2024-CY-99014',
    candidateName: 'Jasmeet Bains',
    courseName: 'Cybersecurity Analyst & Penetration Testing',
    nsqfLevel: 6,
    batchYear: '2024',
    trainingCenter: 'MSDC Bathinda (Near Thermal Colony)',
    sha256Proof: '0x99ef4a1082c471a823b490f2381dc6a29e1029c48b112948ca92e887410fc014',
    verifiedAt: '15 Jul 2024, 02:22 PM IST',
    badgeTitle: 'Punjab Skill Development Mission (Level 6 Certified)',
    status: 'VERIFIED',
  }
];

export function deriveNameFromEmail(rawEmail: string): string {
  if (!rawEmail || !rawEmail.includes('@')) return 'Badal Srari';
  const prefix = rawEmail.split('@')[0];
  let cleaned = prefix.replace(/([a-z])([A-Z])/g, '$1 $2');
  cleaned = cleaned.replace(/[._\-+]/g, ' ').replace(/\d+/g, ' ').trim();
  if (/^badalsrari$/i.test(cleaned)) {
    return 'Badal Srari';
  }
  const nameToUse = cleaned || prefix.replace(/[._\-+]/g, ' ').trim();
  if (!nameToUse) return 'Badal Srari';
  return nameToUse
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

