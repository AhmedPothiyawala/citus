import React, { useId, useState } from 'react';
import { Bullets, Container, Eyebrow, PlanningCta } from '../components/ui';

/* Services page — structure follows the client's reference design. */
interface Pillar { title: string; desc: string; points: string[] }
interface Service {
  id: string;
  group: 'IT Infrastructure' | 'Application Engineering';
  title: string;
  intro: string[];
  panelEyebrow: string;
  panelTitle: string;
  panelDesc: string;
  accent: string; // top-border colour of the cards
  pillars: Pillar[];
}

const SERVICES: Service[] = [
  {
    id: 'network-solutions',
    group: 'IT Infrastructure',
    title: 'Network Solutions',
    intro: [
      'Our networking services help organisations create secure, software-defined network environments in and around the data centre, connecting sites, cloud platforms, remote users, and operational assets. By combining intelligent routing, cloud connectivity, network optimisation, and managed operations, we build networking foundations designed to support modern business operations.',
      'From structured cabling and rack integration to cloud connectivity and edge networks, we deliver end-to-end engineering and managed operations.',
    ],
    panelEyebrow: 'Physical to cloud networking',
    panelTitle: 'Core Capabilities',
    panelDesc: 'Engineered from the physical network to the virtual cloud layer, delivering secure, resilient, and high-availability connectivity.',
    accent: 'border-t-[#7DD3EE]',
    pillars: [
      { title: 'Enterprise WAN & SD-WAN', desc: 'Modernise multi-site connectivity with software-defined networking that improves traffic management, application performance and operational visibility.', points: ['Multi-site network connectivity', 'Application-aware routing', 'Intelligent traffic management', 'MPLS-to-SD-WAN migration', 'Network performance optimisation'] },
      { title: 'Physical Infrastructure & Structured Cabling', desc: 'Lay the physical foundation for reliable networks, from site survey to certified installation.', points: ['Copper and fibre structured cabling', 'Passive network infrastructure', 'Racks, pathways and cabinet integration', 'Testing, certification and documentation', 'Cable upgrades and rationalisation'] },
      { title: 'Cloud Connectivity', desc: 'Establish reliable, high-performance connectivity between enterprise environments and cloud platforms.', points: ['Direct cloud connectivity', 'Private cloud integration', 'Hybrid cloud networking', 'Multi-cloud interconnect', 'Secure cloud access'] },
      { title: 'LAN, Wi-Fi & Campus Networking', desc: 'Design and deploy structured wired and wireless network environments that support users, devices and business-critical applications.', points: ['Enterprise LAN architecture', 'Campus network design', 'Wi-Fi design and deployment', 'Wireless optimisation', 'Access network modernisation'] },
      { title: 'SASE & Zero Trust Network Access', desc: 'Enable secure access for users regardless of location through identity-driven connectivity models.', points: ['Zero Trust Network Access (ZTNA)', 'Identity-based access control', 'Secure remote access', 'Workforce connectivity', 'SASE architecture implementation'] },
      { title: 'IoT & Edge Connectivity', desc: 'Connect distributed assets, operational technologies and edge networks through scalable network architectures.', points: ['Device connectivity', 'Industrial networking', 'Edge infrastructure support', 'Remote asset communication', 'Distributed network environments'] },
      { title: 'Managed Network Services', desc: 'Maintain operational stability through proactive monitoring, maintenance and infrastructure support.', points: ['24/7 NOC monitoring', 'Network analytics and observability', 'Patch and configuration management', 'Incident and capacity management', 'Multi-vendor support and annual maintenance contracts'] },
    ],
  },
  {
    id: 'cybersecurity-surveillance',
    group: 'IT Infrastructure',
    title: 'Cybersecurity & Surveillance',
    intro: [
      'We help you identify what matters, protect it properly, detect threats and respond quickly. From governance and compliance to 24/7 threat monitoring and integrated video surveillance, we secure your digital and physical environments, including the data centre, so you can demonstrate control to regulators, customers and your board.',
    ],
    panelEyebrow: 'Connected pillars',
    panelTitle: 'Security & Surveillance Capabilities',
    panelDesc: 'Defence-in-depth strategies combining automated threat intelligence, strict identity verification, and relentless SOC monitoring.',
    accent: 'border-t-[#7FA8F2]',
    pillars: [
      { title: 'Video Surveillance & Integrated Security', desc: 'Design, deploy, and manage surveillance and physical security systems that give you real-time visibility across sites, assets, and people.', points: ['IP CCTV design and deployment', 'Video analytics and smart alerts', 'Access control and visitor management', 'Command and control centre integration', 'Maintenance and managed monitoring'] },
      { title: 'Identity & Access Management', desc: 'Control and manage access to critical systems, applications, and data through modern identity and privileged access strategies.', points: ['Identity and Access Management (IAM)', 'Privileged access management (PAM)', 'Multi-factor authentication (MFA)', 'Zero Trust access models', 'Identity lifecycle management'] },
      { title: 'Infrastructure & Cloud Security', desc: 'Protect infrastructure, workloads, endpoints, and cloud environments through proactive security controls and continuous monitoring.', points: ['Cloud Security Posture Management (CSPM)', 'Cloud workload protection controls', 'Endpoint detection and response', 'Server and infrastructure hardening', 'Vulnerability and patch governance'] },
      { title: 'Network & Perimeter Security', desc: 'Protect network boundaries and internal traffic with trusted security and expert firewall management.', points: ['Next-generation firewall deployment and management', 'Intrusion detection and prevention', 'Network segmentation', 'DDoS and web application protection', 'Secure remote access and VPN'] },
      { title: 'Application & Data Security', desc: 'Protect business-critical information throughout its lifecycle using security controls designed for enterprise applications and sensitive data.', points: ['Data classification', 'Encryption strategies', 'Data loss prevention (DLP)', 'Key management', 'Application security testing and controls'] },
      { title: 'Offensive Security', desc: 'Identify vulnerabilities and security weaknesses through controlled testing and security assessments.', points: ['Vulnerability assessment and penetration testing', 'Red team exercises', 'Phishing and social engineering simulations', 'Configuration assessments', 'Audit and risk reviews'] },
      { title: 'Managed Detection & Response (SOC)', desc: 'Maintain continuous visibility into threats through proactive monitoring, threat hunting, and incident response services.', points: ['24/7 monitoring', 'Threat detection', 'Threat hunting', 'Incident response', 'Security operations support'] },
      { title: 'OT & IoT Security', desc: 'Protect operational technology and connected environments, including facility systems, power and cooling, through specialised visibility and security controls.', points: ['Industrial environment security', 'OT visibility', 'IoT protection', 'Connected asset security', 'Operational environment monitoring'] },
    ],
  },
  {
    id: 'cloud-infrastructure',
    group: 'IT Infrastructure',
    title: 'Cloud Infrastructure',
    intro: [
      'We architect hybrid multi-cloud foundations that transform enterprise operations. By combining cloud landing zones, container orchestration, and continuous observability, we help organisations build scalable, secure, and resilient environments on data centre infrastructure.',
    ],
    panelEyebrow: 'Connected pillars',
    panelTitle: 'Cloud Infrastructure Capabilities',
    panelDesc: 'Three connected capability pillars for scalable, resilient cloud foundations.',
    accent: 'border-t-[#A78BFA]',
    pillars: [
      { title: 'Cloud Strategy, Readiness & Migration', desc: 'Assess your estate, plan the move, and migrate workloads to the cloud with minimal disruption.', points: ['Cloud readiness assessment and landing zones', 'Workload rehosting, replatforming and migration', 'Application and dependency mapping', 'Migration waves and cut-over planning', 'Post-migration stabilisation'] },
      { title: 'Private Cloud, Virtualisation & HCI', desc: 'Build flexible on-premises and private cloud platforms that give you cloud agility with full control.', points: ['Private cloud design and build', 'Server and storage virtualisation', 'Hyper-converged infrastructure', 'Compute and storage architecture', 'Capacity planning and lifecycle refresh'] },
      { title: 'Backup, Disaster Recovery & Business Continuity', desc: 'Protect data and keep the business running through outages, failures and cyber incidents.', points: ['Backup and recovery solutions', 'Disaster recovery design and testing', 'Data replication', 'Cloud-based DR and archives', 'Business continuity planning'] },
    ],
  },
  {
    id: 'application-development-management',
    group: 'Application Engineering',
    title: 'Application Development Management',
    intro: [
      'We manage applications across their entire lifecycle, from requirements and design through development, testing, release, and long-term support. With one accountable partner at every stage, organisations keep delivery predictable, quality high, and applications aligned to changing business needs.',
    ],
    panelEyebrow: 'Software excellence',
    panelTitle: 'Core Capabilities',
    panelDesc: 'Four connected capability pillars that take software from concept to continuous operation.',
    accent: 'border-t-[#C4A8F5]',
    pillars: [
      { title: 'Custom Application & Product Development', desc: 'Design, develop, and evolve applications and digital products tailored to business and user needs.', points: ['Enterprise application development', 'Web & mobile application development', 'Product and SaaS development', 'Workflow and business process applications', 'Feature enhancement and continuous improvement'] },
      { title: 'Application Modernisation & Cloud-Native Development', desc: 'Modernise existing applications and build scalable architectures designed for cloud and container environments.', points: ['Legacy application modernisation', 'Platform re-architecture and upgrades', 'Microservices & modular architecture', 'Cloud-native application development', 'Application optimisation & scalability'] },
      { title: 'API & Integration Development', desc: 'Connect applications, platforms and business systems for seamless communication and data exchange.', points: ['API development and management', 'Enterprise system integration', 'Data integration and migration', 'Legacy and modern system interoperability', 'Third-party partner integration'] },
      { title: 'Application Managed Services', desc: 'Maintain application stability and continuity, improve operational performance throughout the application lifecycle.', points: ['Application support & maintenance', 'Incident and problem management', 'Performance monitoring and tuning', 'Enhancement and change requests', 'Application portfolio review and continuous improvement'] },
    ],
  },
  {
    id: 'devops',
    group: 'Application Engineering',
    title: 'DevOps',
    intro: [
      'We design, develop, modernise, secure and operate business applications across their end-to-end lifecycle, from custom development and integration to automated delivery, continuous security and 24/7 managed support.',
    ],
    panelEyebrow: 'Software excellence',
    panelTitle: 'Core Capabilities',
    panelDesc: 'Four connected capability pillars that take software from concept to continuous operation.',
    accent: 'border-t-[#D8A6EE]',
    pillars: [
      { title: 'CI/CD & Release Automation', desc: 'Automate software delivery and release processes to improve speed, consistency, quality and reliability.', points: ['Continuous Integration & Delivery', 'Automated build & deployment pipelines', 'Release orchestration & automation', 'Environment management', 'Change management'] },
      { title: 'Infrastructure Automation & Container Platforms', desc: 'Automate infrastructure and application environments using modern platform and container technologies.', points: ['Infrastructure as Code (IaC)', 'Ansible / automated provisioning', 'Configuration management', 'Containerisation & Kubernetes', 'Container & platform operations'] },
      { title: 'Security, Compliance & Governance', desc: 'Embed security and compliance checks into the pipeline, so issues are caught before release, not after.', points: ['Automated security scanning in pipelines', 'Container and dependency scanning', 'Secrets management', 'Compliance checks and audit trails', 'Vulnerability management workflows'] },
      { title: 'Quality Assurance, Observability & SRE', desc: 'Improve application quality, performance and resilience through testing, monitoring and site reliability practices.', points: ['Continuous testing & quality assurance', 'Test automation', 'Application & service monitoring', 'Observability & performance measurement', 'Site reliability & operational visibility'] },
    ],
  },
  {
    id: 'ai',
    group: 'Application Engineering',
    title: 'AI',
    intro: [
      'We help organisations move from AI experiments to systems that run the business. From strategy and data foundations to generative AI assistants, predictive models, and computer vision, we build, deploy, and govern AI that is secure, measurable, and ready for enterprise scale.',
    ],
    panelEyebrow: 'Connected pillars',
    panelTitle: 'AI Capabilities',
    panelDesc: 'Five connected capabilities that take AI from use-case selection to governed, production-grade operation.',
    accent: 'border-t-[#E9A6E6]',
    pillars: [
      { title: 'Generative AI & Enterprise Assistants', desc: 'Leverage foundation models, retrieval-augmented generation, and knowledge assistants integrated into core enterprise systems.', points: ['Large language model (LLM) application development', 'RAG and enterprise knowledge search and answering', 'AI-powered knowledge assistants', 'Prompt design and model fine-tuning', 'AI-enabled business process workflows'] },
      { title: 'Predictive Analytics & Data Engineering', desc: 'Build scalable data pipelines and machine learning models that support forecasting and informed decisions.', points: ['Predictive modelling and forecasting', 'Machine learning solution development', 'Clean data pipelines and feature stores', 'Anomaly detection', 'Trend analysis and business intelligence'] },
      { title: 'Intelligent Process Automation', desc: 'Automate manual, document and repetitive work with AI that understands context.', points: ['Intelligent Document Processing (IDP)', 'RPA and workflow automation', 'Multilingual chatbots and virtual agents', 'AI-assisted customer service', 'Verification and exception handling'] },
      { title: 'Kubernetes, Containers & Edge AI', desc: 'Modernise workloads using Kubernetes and containerised platforms, packaging AI infrastructure for scalable compute and localised model inference.', points: ['Kubernetes platform engineering & lifecycle management', 'Container orchestration & service meshing', 'Compute and shared cluster provisioning', 'Edge AI inference and localised model execution', 'Hybrid and multi-cloud container environments'] },
      { title: 'MLOps, AI Governance & Cloud FinOps', desc: 'Maintain operational stability, continuous reliability, AI safety guardrails, FinOps protection, and cloud cost optimisation across model and cloud resources.', points: ['MLOps pipelines for retraining, versioning & rollback', 'AI governance, risk classification & audit logging', 'Safety guardrails, PII handling & hallucination monitoring', '24/7 SLA-backed managed cloud & AI operations', 'Continuous capacity planning & FinOps cost tuning'] },
    ],
  },
  {
    id: 'cloud-native-applications',
    group: 'Application Engineering',
    title: 'Cloud-Native Applications',
    intro: [
      "We design and build applications that take full advantage of the cloud, and don't force legacy systems to join them. Using microservices, APIs, and managed cloud services, we help organisations deliver scalable, resilient applications that are easier to change and cheaper to run.",
    ],
    panelEyebrow: 'Connected pillars',
    panelTitle: 'Integrated Cloud & AI Engineering Capabilities',
    panelDesc: 'Two connected capability pillars combining scalable cloud foundations with production-grade artificial intelligence.',
    accent: 'border-t-[#F0A0C8]',
    pillars: [
      { title: 'SaaS & Platform Development', desc: 'Design and build multi-tenant products and platforms that grow with your customers.', points: ['SaaS product development', 'Multi-tenant architecture', 'Subscription, billing, and user management', 'Customer and partner portals', 'Product upgrades and ongoing support'] },
      { title: 'MLOps, AI Governance & Cloud FinOps', desc: 'Maintain operational stability, continuous reliability, AI safety guardrails, PII protection, and cloud cost optimisation across model and cloud resources.', points: ['MLOps pipelines for retraining, versioning & rollback', 'AI governance, risk classification & audit logging', 'Safety guardrails, PII handling & hallucination monitoring', '24/7 SLA-backed managed cloud & AI operations', 'Continuous capacity planning & FinOps cost tuning'] },
    ],
  },
];

const PARTNER_WAYS = [
  { title: 'Empanelled Hardware and Integration Partner', desc: 'Multi-OEM sourcing, phase-wise supply planning and one point of accountability.' },
  { title: 'Tenant Enablement Channel', desc: 'You introduce tenants, Citiuscomm supplies and installs, and referral or revenue share is agreed.' },
  { title: 'Managed Services Partner', desc: 'NOC, SOC and remote hands to your standards, white-labelled if you prefer.' },
  { title: 'Co-Sell and Solution Bundles', desc: 'Colocation with managed security and connectivity for enterprise and regulated customers.' },
  { title: 'Technology Partner for AI-Ready Builds', desc: 'GPU-ready compute and high-speed fabric, with scaling coordinated through partners.' },
];

const ServiceBlock: React.FC<{ s: Service; open: boolean; onToggle: () => void; showGroup: boolean; first: boolean }> = ({ s, open, onToggle, showGroup, first }) => {
  const uid = useId();
  return (
    <section id={s.id} className={`scroll-mt-24 py-9 md:py-12 ${first ? '' : 'border-t border-[#EDF1F7]'}`}>
      <Container>
        {showGroup && <Eyebrow>{s.group}</Eyebrow>}
        <h2 className="text-[26px] md:text-[32px] leading-[1.2] font-bold text-[#0B1B3D] tracking-tight">{s.title}</h2>
        <div className="mt-3 max-w-[760px] space-y-3 text-[15px] md:text-[16px] leading-[26px] text-[#4A5568]">
          {s.intro.map((t) => <p key={t}>{t}</p>)}
        </div>

        <div className={`mt-6 rounded-2xl border transition-colors ${open ? 'bg-[#F3F6FC] border-[#E3E9F5]' : 'bg-[#F3F6FC] border-[#E3E9F5] hover:border-[#C9D6EE]'}`}>
          <h3>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={`${uid}-panel`}
              id={`${uid}-btn`}
              className="w-full flex items-start justify-between gap-4 text-left px-5 md:px-6 py-5 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC]"
            >
              <span className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F]">{s.panelEyebrow}</span>
                <span className="block mt-1 text-[18px] md:text-[20px] font-bold text-[#0B1B3D]">{s.panelTitle}</span>
                <span className="block mt-1 max-w-[760px] text-[14px] leading-[22px] font-normal text-[#64748B]">{s.panelDesc}</span>
              </span>
              <span
                className="mt-1 w-9 h-9 shrink-0 rounded-full bg-[#14306B] text-white flex items-center justify-center text-[22px] leading-none font-light"
                aria-hidden="true"
              >
                {open ? '−' : '+'}
              </span>
            </button>
          </h3>
          <div id={`${uid}-panel`} role="region" aria-labelledby={`${uid}-btn`} hidden={!open}>
            <div className="px-5 md:px-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {s.pillars.map((p) => (
                <article key={p.title} className={`rounded-xl bg-white border border-[#E3E9F5] border-t-[3px] ${s.accent} p-4 md:p-5 shadow-[0_1px_2px_rgba(11,27,61,0.04)]`}>
                  <h4 className="text-[15.5px] md:text-[16px] font-bold leading-[22px] text-[#0B1B3D]">{p.title}</h4>
                  <p className="mt-2 text-[13.5px] leading-[21px] text-[#64748B]">{p.desc}</p>
                  <Bullets items={p.points} className="mt-3" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const ServicesPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return SERVICES.some((s) => s.id === hash) ? [hash] : [SERVICES[0].id];
  });
  const toggle = (id: string) => setOpenIds((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  const open = (id: string) => setOpenIds((v) => (v.includes(id) ? v : [...v, id]));

  const groups: Service['group'][] = ['IT Infrastructure', 'Application Engineering'];

  return (
    <div className="inner-page bg-white">
      <section className="inner-hero pt-12 md:pt-16 pb-6">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h1 className="max-w-[760px] text-[32px] md:text-[44px] leading-[1.12] font-bold text-[#0B1B3D] tracking-tight">
            Centralised Team for Storage, Network, Security and Cloud
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">
            Network, security and cloud services, engineered end to end, from the physical network architecture to the cloud.
          </p>
          <div className="mt-6 space-y-3">
            {groups.map((g) => (
              <div key={g} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="md:w-[190px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F]">{g}</span>
                <div className="flex gap-2.5 overflow-x-auto md:flex-wrap pb-1 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {SERVICES.filter((s) => s.group === g).map((s) => (
                    <a key={s.id} href={`#${s.id}`} onClick={() => open(s.id)}
                      className="shrink-0 rounded-full border border-[#14306B]/30 text-[#14306B] hover:bg-[#F3F6FC] px-4 py-1.5 text-[13.5px]">
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {SERVICES.map((s, i) => (
        <ServiceBlock
          key={s.id}
          s={s}
          first={i === 0}
          showGroup={i === 0 || SERVICES[i - 1].group !== s.group}
          open={openIds.includes(s.id)}
          onToggle={() => toggle(s.id)}
        />
      ))}

      <section className="py-9 md:py-12 border-t border-[#EDF1F7]">
        <Container>
          <Eyebrow>Partner with us</Eyebrow>
          <h2 className="text-[26px] md:text-[32px] leading-[1.2] font-bold text-[#0B1B3D] tracking-tight mb-5">Five Ways to Partner</h2>
          <ol className="space-y-3">
            {PARTNER_WAYS.map((w, i) => (
              <li key={w.title} className="flex items-center gap-4 md:gap-6 rounded-xl bg-[#F3F6FC] border border-[#E3E9F5] px-4 md:px-6 py-4">
                <span className="w-6 text-[20px] font-bold text-[#0E8A8F]">{i + 1}</span>
                <span>
                  <span className="block text-[15.5px] font-bold text-[#0B1B3D]">{w.title}</span>
                  <span className="block mt-0.5 text-[14px] text-[#64748B]">{w.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <PlanningCta />
    </div>
  );
};
