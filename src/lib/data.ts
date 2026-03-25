import { 
  BarChart3, 
  MessageSquare, 
  Megaphone, 
  Laptop, 
  Globe, 
  Building2,
  Zap,
  Landmark,
  FileText,
  CreditCard,
  Package,
  ShoppingBag,
  Phone
} from 'lucide-react'

// ─── Benefits ────────────────────────────────────────────────────────────────
export const BENEFITS = [
  {
    idx: '01 / 06',
    icon: BarChart3,
    value: 'AED 16,528',
    prefix: 'AED ',
    title: 'Free Zoho Credits',
    desc: 'AED 1,836 in Zoho credits across 45+ modules — accounting, HR, CRM & payroll — plus a free training session worth AED 14,692.',
  },
  {
    idx: '02 / 06',
    icon: MessageSquare,
    value: 'AED 3,922',
    prefix: 'AED ',
    title: 'WhatsApp Marketing',
    desc: 'GallaBox free plan for 12 months: 30+ integrations, 500+ templates, unlimited incoming conversations and broadcast automation.',
  },
  {
    idx: '03 / 06',
    icon: Megaphone,
    value: 'AED 5,100',
    prefix: 'AED ',
    title: 'Social Media AI Platform',
    desc: "Someli's annual AI-powered plan — create, schedule, post and optimise content across all your social platforms automatically.",
  },
  {
    idx: '04 / 06',
    icon: Laptop,
    value: 'AED 3,800',
    prefix: 'AED ',
    title: 'Office Device Savings',
    desc: "Save at least AED 3,800 with Revent's 12-month refurbished tech device rental — UAE's leading device rental company.",
  },
  {
    idx: '05 / 06',
    icon: Globe,
    value: 'AED 1,250',
    prefix: 'AED ',
    title: 'Free Website & Hosting',
    desc: 'AI-generated website design, lead gen integration, and 3 months of free hosting via RetailTechFusion.',
  },
  {
    idx: '06 / 06',
    icon: Building2,
    value: '60% OFF',
    prefix: '',
    title: 'Coworking Access',
    desc: 'Free trial with LetsWork (15 credits, 3 workspaces) plus up to 60% off your first credit package with Deskimo UAE.',
  },
]

// ─── Features ────────────────────────────────────────────────────────────────
export const FEATURES = [
  { icon: Zap,          name: 'Instant Business License',       sub: 'Fastest issuance in UAE — from AED 5,750' },
  { icon: Landmark,     name: 'Guaranteed Bank Account',        sub: 'Corporate account in as little as 3 working days' },
  { icon: FileText,     name: 'Corporate Tax Registration',     sub: 'Stay compliant and penalty-free from day one' },
  { icon: Globe,        name: 'Import / Export Codes',          sub: 'Customs code valid across every UAE port' },
  { icon: CreditCard,   name: 'Multi-Currency Payments',        sub: 'USD, EUR, AED, GBP, YEN via PayCaps & TotalPay' },
  { icon: Package,      name: 'Last Mile Logistics',            sub: 'Aramex, FedEx, CSS and eLogix partnerships' },
  { icon: ShoppingBag,  name: 'Online Marketplace Access',     sub: 'List on Noon, Amazon & more — hassle-free' },
  { icon: Phone,        name: 'Free Phone Answering Service',   sub: 'UAE landline + virtual receptionist' },
]

// ─── Steps ───────────────────────────────────────────────────────────────────
export const STEPS = [
  {
    num: '01',
    title: 'Fill Out the Form',
    desc: 'Share your details in under 60 seconds. No documents required at this stage.',
  },
  {
    num: '02',
    title: 'Free Consultation',
    desc: 'A specialist calls you within 30 minutes. We match your business to the right license type and activities.',
  },
  {
    num: '03',
    title: 'License Issued',
    desc: 'Submit documents, pay the fee, and receive your official SPC Free Zone license — same day in most cases.',
  },
  {
    num: '04',
    title: 'Start Trading',
    desc: 'Bank account opens in 3 working days. Activate your partner benefits and begin operating your business.',
  },
]

// ─── Partners ────────────────────────────────────────────────────────────────
export const PARTNERS = [
  'Zoho', 'Revent', 'GallaBox', 'LetsWork', 'Deskimo', 'Bayzat',
  'Someli', 'RetailTechFusion', 'Rakbank', 'Mashreq NEO', 'Wio Bank',
  'Commercial Bank of Dubai', 'Aramex', 'FedEx', 'Al Ansari Exchange',
  'Telr', 'HyperPay', 'Network', 'GrowthAmazon', 'tasjeel.ae',
]

// ─── Chips ───────────────────────────────────────────────────────────────────
export interface ChipItem {
  label: string
  icon: string // SVG path d attribute (24x24 viewBox)
}

export const CHIPS: ChipItem[] = [
  {
    label: '5 Business Activities',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z', // grid-plus
  },
  {
    label: '100% Foreign Ownership',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', // globe
  },
  {
    label: 'Free Website + Hosting',
    icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-6-1h4v-2h-2v-1h2v-2h-4v2h2v1h-2v2zm-3-3c.55 0 1-.45 1-1s-.45-1-1-1-.99.45-.99 1 .44 1 .99 1zm-4 0c.55 0 1-.45 1-1s-.45-1-1-1-.99.45-.99 1 .44 1 .99 1z', // monitor-web
  },
  {
    label: 'Free WhatsApp Marketing',
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM11 5h2v5h-2zm0 7h2v2h-2z', // chat-bubble
  },
  {
    label: 'Free Zoho Suite',
    icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z', // apps-list
  },
  {
    label: 'Bank Account in 3 Days',
    icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z', // dollar-sign
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
export const STATS = [
  { num: '40', sup: '+', label: 'Years of Expertise' },
  { num: '5.4', sup: '×', label: 'Return on Investment' },
  { num: '3',   sup: '',  label: 'Days to Bank Account' },
  { num: '20',  sup: '+', label: 'Strategic Partners' },
]

// ─── Business activities for form dropdown ───────────────────────────────────
export const ACTIVITIES = [
  'Consulting / Professional Services',
  'General Trading',
  'E-Commerce',
  'Technology / IT Services',
  'Freelance / Creative Services',
  'Food & Beverage',
  'Real Estate',
  'Import / Export',
  'Healthcare / Wellness',
  'Education / Training',
  'Other',
]

// ─── Deadline ────────────────────────────────────────────────────────────────
export const DEADLINE = new Date('2026-03-31T23:59:59')
