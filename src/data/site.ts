export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  bio: string;
  image?: string;
}

export interface PartnerItem {
  name: string;
  logo: string;
  category?: string;
}

export interface ClientItem {
  name: string;
  logo: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  category: string;
  summary: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  nextSlug?: string;
  nextTitle?: string;
  prevSlug?: string;
  prevTitle?: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  preferred?: string[];
}

export interface OfficeLocation {
  city: string;
  title: string;
  address: string[];
  phone?: string;
  email: string;
}

export const LINKS = {
  home: '/',
  companyProfile: '/company-profile/',
  whyUs: '/why-us/',
  leadership: '/leadership/',
  partners: '/partners/',
  products: '/products/',
  digitalServices: '/digital-services/',
  networking: '/networking/',
  fttx: '/fttx/',
  serverStorage: '/server-storage/',
  dataCenterCloud: '/data-center-cloud/',
  industryApplications: '/industry-applications/',
  securitySolutions: '/security-solutions/',
  caseStudies: '/case-studies/',
  rakutenMobile: '/rakuten-mobile/',
  nepalTelecom: '/nepal-telecom/',
  netBroadband: '/net-broadband/',
  careers: '/careers/',
  contact: '/contact/',
};

export const COMPANY_INFO = {
  name: 'CITIUSCOMM',
  legalName: 'CITIUS COMMUNICATIONS PVT. LTD.',
  tagline: 'Keeping You One Step Ahead!',
  subTagline: 'We are an engineering first company. We engineer and design solutions for your networks.',
  email: 'sales@citiuscomm.com',
  phone: '+91 11 4010 7947',
  phoneFormatted: '+91-1140107947',
  linkedin: 'https://www.linkedin.com/company/citiuscommunications/',
  logo: '/images/citiuscomm_logo.png',
  logoRetina: '/images/citiuscomm-retina-logo.png',
  logoWhite: '/images/citiuscomm-white-logo.png',
  logoWhiteRetina: '/images/citiuscomm-white-retina-logo.png',
  favicon: '/images/Favicon.png',
};

export const MAIN_NAV: NavLink[] = [
  { label: 'Home', href: LINKS.home },
  {
    label: 'About Us',
    href: LINKS.companyProfile,
    children: [
      { label: 'Company Profile', href: LINKS.companyProfile, desc: 'Vision, mission & turnkey technology aggregations' },
      { label: 'Leadership', href: LINKS.leadership, desc: 'Meet our executive leadership team' },
      { label: 'Why Us', href: LINKS.whyUs, desc: 'What sets us apart and our core strengths' },
    ],
  },
  {
    label: 'Solutions',
    href: LINKS.products,
    children: [
      { label: 'Solutions Overview', href: LINKS.products, desc: 'End-to-end security, networking & wireless solutions' },
      { label: 'Networking', href: LINKS.networking, desc: 'Switches, routers & SD-WAN solutions' },
      { label: 'FTTX', href: LINKS.fttx, desc: 'Fiber-to-the-x, GPON & OLT/ONT deployments' },
      { label: 'Server & Storage', href: LINKS.serverStorage, desc: 'Enterprise compute & storage infrastructure' },
      { label: 'Data Center & Cloud', href: LINKS.dataCenterCloud, desc: 'Data center setup, cloud migration & hybrid cloud' },
      { label: 'Security Solutions', href: LINKS.securitySolutions, desc: 'DDoS mitigation, DPI & firewall protection' },
      { label: 'Industry Applications', href: LINKS.industryApplications, desc: 'Telecom, cable, broadband & enterprise verticals' },
      { label: 'Digital Services', href: LINKS.digitalServices, desc: 'Cybersecurity, IT optimization, automation & AI' },
    ],
  },
  { label: 'Case Studies', href: LINKS.caseStudies },
  { label: 'Partners', href: LINKS.partners },
  { label: 'Careers', href: LINKS.careers },
  { label: 'Contact', href: LINKS.contact },
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    name: 'SURENDRA SANCHETI',
    role: 'Founder and Managing Director',
    experience: '20 Years Experience',
    bio: 'Visionary telecommunications leader with 20 years of experience driving transformative ICT, broadband, and carrier-grade infrastructure rollouts across India and global markets.',
    image: '/images/3.jpg',
  },
  {
    name: 'PRAMOD YADAV',
    role: 'Senior Executive',
    experience: '19 Years Experience',
    bio: 'Senior roles at Mavenir, Mitel, and Reliance Jio. Alumnus of IIM Lucknow / Harvard Business Publishing with deep expertise in mobile network architecture and digital services.',
    image: '/images/3.jpg',
  },
  {
    name: 'PIYUSH DIKSHIT',
    role: 'Senior Executive',
    experience: '25 Years Experience',
    bio: 'CXO positions at Samvardhana Motherson Group, Amtek Auto, and Corning Inc. Alumnus of IIM Calcutta bringing extensive supply chain, operational excellence, and enterprise leadership.',
    image: '/images/3.jpg',
  },
];

export const WHY_US_STRENGTHS = [
  'Excellent Relationship with all Technology Partners',
  'Strong Supply Chain Management',
  'Executed large projects with Telecom, Cable, and Government Customers',
  'Transparent and Committed Team',
  'Strong Pre-Sales Team with Location Wise Coverage',
];

export const WHY_US_DIFFERENTIATORS = [
  {
    title: 'Great Access to Customers',
    desc: 'Unmatched pan-India access to telecom operators, MSOs, ISPs, enterprises, and government departments.',
  },
  {
    title: 'Multiple Vendor Tie-Ups',
    desc: 'Strategic partnerships with tier-1 global OEMs enable us to deliver best-fit, vendor-agnostic architectures.',
  },
  {
    title: 'System Integration Capabilities',
    desc: 'Full turnkey system integration covering planning, staging, deployment, commissioning, and 24x7 NOC support.',
  },
  {
    title: 'Preferred Partner',
    desc: 'Trusted by leading national and international telcos for mission-critical core and edge infrastructure.',
  },
  {
    title: 'Make in India - India Solutions',
    desc: 'Dedicated initiatives supporting indigenous telecom hardware, software platforms, and domestic supply chains.',
  },
  {
    title: 'Warehousing Across India',
    desc: 'Strategically located warehousing and rapid spare-part replenishment hubs nationwide.',
  },
];

export const PARTNERS_LIST: PartnerItem[] = [
  { name: 'Cisco', logo: '/images/cisco.jpg', category: 'Networking & Security' },
  { name: 'Juniper Networks', logo: '/images/juniper.jpg', category: 'Routing & Cloud' },
  { name: 'Dell Technologies', logo: '/images/dell.jpg', category: 'Servers & Storage' },
  { name: 'HPE', logo: '/images/hp.jpg', category: 'Enterprise Compute' },
  { name: 'Oracle', logo: '/images/oracle-1.jpg', category: 'Database & Cloud' },
  { name: 'Extreme Networks', logo: '/images/extreme.jpg', category: 'Cloud Networking' },
  { name: 'Casa Systems', logo: '/images/casa-systems.jpg', category: 'Broadband & Cable' },
  { name: 'New IT V', logo: '/images/new-it-v.jpg', category: 'Digital Solutions' },
  { name: 'Avanseus', logo: '/images/avanseus.jpg', category: 'AI & Analytics' },
  { name: 'Atrinet', logo: '/images/atrinet-1.jpg', category: 'Network Automation' },
  { name: 'Tibco', logo: '/images/tibco-1.jpg', category: 'Data & Integration' },
  { name: 'ProLabs', logo: '/images/prolabs.jpg', category: 'Optical Connectivity' },
  { name: 'Allot', logo: '/images/allot.jpg', category: 'Network Intelligence & Security' },
  { name: 'EfficientIP', logo: '/images/efficient.jpg', category: 'DDI & DNS Security' },
  { name: 'DIY CAM', logo: '/images/diy-cam.jpg', category: 'Surveillance & IoT' },
];

export const CLIENTS_LIST: ClientItem[] = [
  { name: 'Reliance Jio', logo: '/images/Jio-Logo.jpg' },
  { name: 'Vodafone Idea (Vi)', logo: '/images/Vi-Logo.jpg' },
  { name: 'Rakuten Mobile', logo: '/images/Rakuten-Logo.jpg' },
  { name: 'Nepal Telecom', logo: '/images/Nepal-Telecom-Logo-1.jpg' },
  { name: 'GTPL Hathway', logo: '/images/GTPL-Logo.jpg' },
  { name: 'Hathway', logo: '/images/Hathway-Logo.jpg' },
  { name: 'DEN Networks', logo: '/images/DEN-Logo.jpg' },
  { name: 'Fastway', logo: '/images/Fastway-Logo.jpg' },
  { name: 'Net+ Broadband', logo: '/images/Net-Logo-1.jpg' },
  { name: 'Kerala Vision', logo: '/images/Kerala-Vision-Logo.jpg' },
  { name: 'TCCL', logo: '/images/TCCL-Logo.jpg' },
  { name: 'VK Digital', logo: '/images/VK-Digital-Logo.jpg' },
  { name: 'You Broadband', logo: '/images/You-Logo.jpg' },
  { name: 'Siti Digital', logo: '/images/Siti-Digital.jpg' },
  { name: 'UCN', logo: '/images/UCN-Logo.jpg' },
  { name: 'Metrocast', logo: '/images/Metrocast-Logo.jpg' },
  { name: 'Meghbela Broadband', logo: '/images/Megh-Bela-Logo.jpg' },
  { name: 'WorldLink Nepal', logo: '/images/World-Link-Logo-1.jpg' },
  { name: 'Subisu', logo: '/images/Subisu-Logo.jpg' },
  { name: 'Vianet', logo: '/images/Via-Net-Logo.jpg' },
  { name: 'Discovery', logo: '/images/Discovery-Logo.jpg' },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'rakuten-mobile',
    slug: LINKS.rakutenMobile,
    title: 'Rakuten Mobile',
    client: 'Rakuten Mobile Japan',
    location: 'Tokyo, Japan',
    category: '4G/5G vRAN & Cloud Network Architecture',
    summary:
      'Deployment of 4G/5G antenna accessories, Data Center infrastructure, and vRAN network components for Rakuten Mobile Japan targeting 10-15 million subscribers.',
    image: '/images/rakuten-600x403.jpg',
    challenge:
      'Rakuten, Inc. entered the Japanese mobile telecommunications market aiming to build the world’s first fully virtualized, cloud-native 5G-ready mobile network, targeting 10 to 15 million subscribers within 3 years. They required agile supply chain execution, high-precision RAN antenna accessories, and high-performance data center infrastructure capable of operating under strict latency constraints.',
    solution:
      'CITIUSCOMM partnered with Rakuten to deliver end-to-end RAN site solutions including 4G/5G antennas and precision accessories, robust Data Center server and storage components, and dedicated logistics and staging support ensuring rapid site commissioning.',
    results: [
      'Successfully supported aggressive site rollout across major Japanese prefectures',
      'High-reliability antenna accessory integration meeting stringent NTT-Docomo interop guidelines',
      'Optimized DC server & storage deployment driving low-latency cloud-native vRAN processing',
      'Zero-defect delivery and comprehensive post-deployment engineering support',
    ],
    nextSlug: LINKS.nepalTelecom,
    nextTitle: 'Nepal Telecom',
  },
  {
    id: 'nepal-telecom',
    slug: LINKS.nepalTelecom,
    title: 'Nepal Telecom',
    client: 'Nepal Telecom (NT)',
    location: 'Kathmandu & Nationwide, Nepal',
    category: 'Carrier Core IP Routing & Leased Line Solutions',
    summary:
      'Turnkey win and execution of Mid-Hill Router RFP and Leased Line RFP for Nepal Telecom using world-class Cisco routing and proprietary CITIUSCOMM solutions.',
    image: '/images/nepal-telecom-600x403.jpg',
    challenge:
      'Nepal Telecom needed to upgrade its Mid-Hill highway optical network connecting eastern and western districts through extremely rugged Himalayan terrain. The network required high-availability IP/MPLS carrier routers to support 4G data growth, voice services, and high-bandwidth leased lines for enterprise and government clients.',
    solution:
      'CITIUSCOMM won the Mid-Hill Router competitive RFP by architecting a high-resilience Cisco Carrier Routing solution. Additionally, CITIUSCOMM won the Leased Line RFP, deploying proprietary CITIUSCOMM CPE and aggregation platforms to deliver secure leased lines across Nepal.',
    results: [
      'Successfully deployed Cisco IP/MPLS core and aggregation routers along the Mid-Hill optical spine',
      'Seamless interconnection across mountainous terrain with 99.999% network uptime',
      'Delivered turn-key leased-line customer premises equipment across multiple government & corporate hubs',
      'Comprehensive on-site training and SLA-backed engineering maintenance',
    ],
    prevSlug: LINKS.rakutenMobile,
    prevTitle: 'Rakuten Mobile',
    nextSlug: LINKS.netBroadband,
    nextTitle: 'Net+ Broadband',
  },
  {
    id: 'net-broadband',
    slug: LINKS.netBroadband,
    title: 'Net+ Broadband',
    client: 'Net+ Broadband (Fastway Transmission)',
    location: 'Punjab & North India',
    category: 'FTTH / FTTX GPON High-Speed Broadband Deployment',
    summary:
      'Implementation of carrier-grade Nokia OLT/ONU solutions for Net+ Broadband across Punjab, accelerating gigabit FTTH fiber-to-the-home services.',
    image: '/images/net-broadband-600x403.jpg',
    challenge:
      'Net+ Broadband, the digital arm of Fastway Transmission, is one of the fastest-growing independent ISPs in North India. With massive demand for high-speed fiber broadband across urban and semi-urban townships in Punjab, Net+ needed a robust, high-density GPON/FTTH infrastructure with automated provisioning.',
    solution:
      'CITIUSCOMM architected and implemented Nokia’s carrier-grade OLT (Optical Line Terminal) and ONU (Optical Network Unit) solution across Net+ central offices and customer clusters, complemented by fiber testing, staging, and technical integration.',
    results: [
      'Rapid deployment of high-density Nokia OLT chassis across central switching centers in Punjab',
      'Supported hundreds of thousands of concurrent FTTH subscribers with gigabit speeds',
      'Significantly reduced latency and lowered mean-time-to-install for new broadband customers',
      'Robust on-ground local support and continuous supply of field-tested optical equipment',
    ],
    prevSlug: LINKS.nepalTelecom,
    prevTitle: 'Nepal Telecom',
  },
];

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 'ip-engineers',
    title: 'IP Engineers',
    category: 'Engineering & Operations',
    location: 'New Delhi / Remote / On-Site',
    type: 'Full-time',
    overview:
      'Responsible for IP network deployment including planning, engineering, implementation, L2/L3 operation and maintenance tasks. Support for domestic and global carrier projects.',
    responsibilities: [
      'IP Core network operations covering IP/MPLS, CPN, and Data Center routing',
      'Engineering and implementation of L2/L3 routing policies and protocols (BGP, OSPF, ISIS, MPLS TE)',
      'Office IT and retail shop network deployment and maintenance',
      'VoIP network planning, quality-of-service tuning, and budget planning',
      'Cross-functional collaboration with internal teams, partner OEMs, and client NOCs',
    ],
    qualifications: [
      'MSc, BSc, or B.Tech degree in Telecommunication, Information Technology or Electrical Engineering',
      'Minimum 2 years of hands-on experience in IP networks and protocol troubleshooting',
      'Deep knowledge of TCP/IP, IP routing protocols, switching, and network security',
      'Strong communication skills in spoken and written English',
      'Intermediate to advanced command of network simulation and diagnostics tools',
    ],
    preferred: ['CCNA / CCNP / JNCIA / JNCIP Cisco or Juniper certifications'],
  },
  {
    id: 'linux-support',
    title: 'Linux Enterprise Support Analyst',
    category: 'Systems & Infrastructure',
    location: 'New Delhi / Mumbai',
    type: 'Full-time',
    overview:
      'Deliver mission-critical Linux operating system administration, identity management (IDM/LDAP/AD), baseline hardening, and configuration management for enterprise customers.',
    responsibilities: [
      'Linux/RedHat system operation, kernel tuning, and baseline hardening',
      'IDM / FreeIPA and LDAP services configuration and user lifecycle management',
      'Cross-domain Linux / Active Directory integration and multi-domain operations',
      'PKI, SSL/TLS certificate management (Certmonger, Dogtag) and Kerberos authentication in Unix environments',
      'Core domain services administration including DNS, NTP, and DHCP',
      'Automated provisioning and configuration management using Bash scripting and Ansible',
    ],
    qualifications: [
      'Degree in Computer Science, Information Technology, or equivalent experience',
      '3+ years of experience administering RedHat Enterprise Linux / CentOS / Ubuntu Server',
      'Proven hands-on experience with FreeIPA, LDAP, and Active Directory authentication',
      'Command-line expertise with Bash scripting, Ansible playbooks, and Git',
      'Solid grasp of network storage protocols (NFS, iSCSI, Ceph)',
    ],
  },
  {
    id: 'security-coe',
    title: 'Security CoE Infrastructure Section',
    category: 'Cybersecurity',
    location: 'New Delhi / Bangalore',
    type: 'Full-time',
    overview:
      'Drive next-generation network security engineering, firewall implementation, DDoS mitigation, and compliance frameworks across carrier and cloud infrastructure.',
    responsibilities: [
      'Installation, configuration, testing, and lifecycle management of security appliances (ASA, FTD, WAF, DDoS)',
      'Securing enterprise and carrier network perimeters through strict zero-trust policy enforcement',
      'Collaborating with tier-1 OEM vendors (Cisco, F5, Radware, Fortinet) and customer security response teams',
      'Designing encryption architectures, cryptographic key management, IPsec, and TLS configurations',
      'Monitoring and mitigating DDoS attacks, web application vulnerabilities, and network intrusions',
    ],
    qualifications: [
      'Minimum 2 to 5 years experience with enterprise security products (Cisco ASA/FTD, Radware, F5)',
      'Strong understanding of cloud and virtualization security, mobile network security (SAE/LTE/5G Core)',
      'Solid grounding in cryptography algorithms (RSA, AES) and security protocols (IPsec, TLS)',
      'Excellent analytical, troubleshooting, and documentation skills',
    ],
    preferred: ['Hands-on experience with F5 BIG-IP, Radware DefensePro, or Palo Alto Networks firewalls'],
  },
  {
    id: 'others',
    title: 'Other Opportunities',
    category: 'General Application',
    location: 'Pan-India',
    type: 'Full-time / Contract',
    overview:
      'We are always looking for passionate engineers, optical specialists, pre-sales consultants, and project managers. Let us build the future of telecommunications together!',
    responsibilities: [
      'Bring enthusiasm, new ideas, and customer-first mindset to technology solutions',
      'Work alongside industry veterans on high-impact carrier networks',
    ],
    qualifications: [
      'Passionate about telecommunications, networking, cloud, or cybersecurity',
      'Relevant degree or technical certifications',
    ],
  },
];

export const OFFICES_LIST: OfficeLocation[] = [
  {
    city: 'New Delhi (Head Office)',
    title: 'Delhi Office',
    address: ['B25, Ground Floor,', 'Okhla Industrial Area, Phase-II,', 'New Delhi – 110020, India.'],
    phone: '+91 11 4010 7947',
    email: 'sales@citiuscomm.com',
  },
  {
    city: 'Mumbai',
    title: 'Mumbai Office',
    address: ['503, Filix Tower, LBS Marg,', 'Opp. Asian Paints, Bhandup (West),', 'Mumbai – 400078, India.'],
    phone: '022 62362154',
    email: 'sales@citiuscomm.com',
  },
  {
    city: 'Kolkata',
    title: 'Kolkata Office',
    address: ['2, Canal Street, 1st floor, Flat#1B,', 'Near Entally Police Station,', 'Kolkata – 700014, India.'],
    email: 'sales@citiuscomm.com',
  },
];
