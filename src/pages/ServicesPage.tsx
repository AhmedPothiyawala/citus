import React, { useId, useState } from 'react';
import { LINKS } from '../data/site';
import { Bullets, Container, Eyebrow, OutlineButton, PlanningCta } from '../components/ui';
import { SmartLink } from '../components/SmartLink';

/* Service catalogue. Copy is a working draft — replace with approved wording when available. */
interface Service {
  id: string;
  title: string;
  intro: string;
  capabilities: string[];
  deliverables: string[];
  related?: { label: string; to: string };
}

const SERVICES: Service[] = [
  {
    id: 'network-solutions',
    title: 'Network Solutions',
    intro: 'Campus, data center and carrier networks designed, supplied and integrated from multiple OEMs.',
    capabilities: ['Data center leaf-spine and core switching', 'Routing, SD-WAN and WAN optimization', 'FTTX, GPON and optical transport', 'Wi-Fi and campus access networks', 'Network monitoring and analytics'],
    deliverables: ['Design and bill of materials', 'Supply, staging and configuration', 'Installation, testing and handover', 'Ongoing support and lifecycle refresh'],
    related: { label: 'Networking', to: LINKS.networking },
  },
  {
    id: 'cybersecurity-surveillance',
    title: 'Cybersecurity & Surveillance',
    intro: 'Layered protection for networks, workloads and physical sites, with monitoring that does not stop at go-live.',
    capabilities: ['Next-generation firewalls and IDS/IPS', 'DDoS protection and deep packet inspection', 'Endpoint, identity (IAM/MFA) and Zero Trust', 'SIEM and SOC operations', 'CCTV, access control and physical security zones'],
    deliverables: ['Security assessment and architecture', 'Deployment and policy configuration', 'Managed monitoring and incident response', 'Periodic audits and hardening'],
    related: { label: 'Security Solutions', to: LINKS.securitySolutions },
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    intro: 'Private, hybrid and edge cloud platforms built on the right compute, storage and virtualization stack.',
    capabilities: ['Servers, storage and hyper-converged infrastructure', 'Virtualization and private cloud platforms', 'Backup, replication and disaster recovery', 'Hybrid connectivity to public cloud', 'Capacity planning for GPU and high-density racks'],
    deliverables: ['Workload sizing and platform design', 'Build, migration and cut-over', 'Managed operations and patching', 'Cost and capacity reviews'],
    related: { label: 'Data Center & Cloud', to: LINKS.dataCenterCloud },
  },
  {
    id: 'application-development-management',
    title: 'Application Development Management',
    intro: 'Planning, building and running business applications with clear ownership from requirement to support.',
    capabilities: ['Requirement analysis and solution design', 'Custom web and enterprise application development', 'Integration with existing systems and APIs', 'Application maintenance and enhancements', 'Performance and availability monitoring'],
    deliverables: ['Project plan and milestones', 'Tested releases with documentation', 'Support with agreed service levels', 'Roadmap for future releases'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    intro: 'Faster, safer releases through automation of build, test, deployment and infrastructure.',
    capabilities: ['CI/CD pipeline design and setup', 'Infrastructure as code', 'Configuration and release management', 'Monitoring, logging and alerting', 'Security checks built into the pipeline'],
    deliverables: ['Current-state review and target design', 'Pipeline and environment implementation', 'Team enablement and runbooks', 'Ongoing pipeline operations'],
  },
  {
    id: 'ai',
    title: 'AI',
    intro: 'Infrastructure and solutions for AI workloads, from GPU clusters to applied analytics.',
    capabilities: ['GPU servers and high-speed AI network fabric', 'Liquid and high-density cooling readiness', 'Data platforms for training and inference', 'Network and operations analytics', 'Use-case discovery and proof of concept'],
    deliverables: ['AI readiness and sizing assessment', 'Cluster design, supply and integration', 'Model deployment support', 'Operations and scaling plan'],
  },
  {
    id: 'cloud-native-applications',
    title: 'Cloud-Native Applications',
    intro: 'Applications built or modernized to run on containers and Kubernetes, ready to scale.',
    capabilities: ['Containerization of existing applications', 'Kubernetes platform setup and management', 'Microservices and API design', 'Service mesh, observability and autoscaling', 'Multi-cloud and on-premises deployment'],
    deliverables: ['Modernization assessment', 'Platform and application build', 'Migration with minimal downtime', 'Managed platform operations'],
  },
];

const ServiceItem: React.FC<{ s: Service; open: boolean; onToggle: () => void; index: number }> = ({ s, open, onToggle, index }) => {
  const uid = useId();
  return (
    <li id={s.id} className={`scroll-mt-24 rounded-2xl border transition-colors ${open ? 'bg-[#F3F6FC] border-[#C9D6EE] shadow-[0_12px_30px_-18px_rgba(11,27,61,0.35)]' : 'bg-[#F7F9FD] border-[#E3E9F5] hover:border-[#C9D6EE]'}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${uid}-panel`}
          id={`${uid}-btn`}
          className="w-full flex items-start gap-4 text-left px-5 md:px-6 py-5 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC]"
        >
          <span className="hidden sm:inline-flex mt-0.5 w-9 h-9 shrink-0 rounded-full bg-white border border-[#E3E9F5] text-[13px] font-bold text-[#0E8A8F] items-center justify-center">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1">
            <span className="block text-[18px] md:text-[20px] font-bold text-[#0B1B3D]">{s.title}</span>
            <span className="block mt-1 text-[14px] md:text-[15px] leading-[23px] text-[#4A5568]">{s.intro}</span>
          </span>
          <span
            className={`mt-0.5 w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[22px] leading-none font-light transition-colors ${open ? 'bg-[#14306B] text-white' : 'bg-white border border-[#14306B]/40 text-[#14306B]'}`}
            aria-hidden="true"
          >
            {open ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={`${uid}-panel`}
        role="region"
        aria-labelledby={`${uid}-btn`}
        className={`grid transition-[grid-template-rows] duration-400 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className={`px-5 md:px-6 pb-6 sm:pl-[76px] grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <div className="rounded-xl bg-white border border-[#E3E9F5] p-4 md:p-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F] mb-2">Capabilities</p>
              <Bullets items={s.capabilities} />
            </div>
            <div className="rounded-xl bg-white border border-[#E3E9F5] p-4 md:p-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F] mb-2">What you get</p>
              <Bullets items={s.deliverables} />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <SmartLink to={`${LINKS.contact}?service=${encodeURIComponent(s.title)}`} className="inline-flex items-center rounded-full bg-[#14306B] hover:bg-[#0B1B3D] text-white font-semibold text-[14px] px-5 py-2">
                Discuss {s.title}
              </SmartLink>
              {s.related && <OutlineButton to={s.related.to}>More on {s.related.label}</OutlineButton>}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const ServicesPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return SERVICES.some((s) => s.id === hash) ? [hash] : [];
  });
  const toggle = (id: string) => setOpenIds((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  const allOpen = openIds.length === SERVICES.length;

  return (
    <div className="inner-page bg-white">
      <section className="inner-hero pt-12 md:pt-16 pb-6">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h1 className="max-w-[760px] text-[32px] md:text-[44px] leading-[1.12] font-bold text-[#0B1B3D] tracking-tight">
            Services From Network to Application
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">
            Choose a service to see what it covers. Every engagement is delivered by one accountable team, from design and
            sourcing to integration and ongoing support.
          </p>
          {/* quick jump list */}
          <div className="mt-6 flex gap-2.5 overflow-x-auto md:flex-wrap pb-1 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpenIds((v) => (v.includes(s.id) ? v : [...v, s.id]))}
                className="shrink-0 rounded-full border border-[#14306B]/50 text-[#14306B] hover:bg-[#F3F6FC] px-4 py-1.5 text-[13.5px]">
                {s.title}
              </a>
            ))}
            <SmartLink to={LINKS.components} className="shrink-0 rounded-full border border-[#0E8A8F]/60 text-[#0E8A8F] hover:bg-[#ECF8F8] px-4 py-1.5 text-[13.5px]">
              Data Centre Components &rarr;
            </SmartLink>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F]">{SERVICES.length} service categories</p>
            <button type="button" onClick={() => setOpenIds(allOpen ? [] : SERVICES.map((s) => s.id))}
              className="text-[14px] font-semibold text-[#14306B] hover:underline">
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <ul className="space-y-3.5">
            {SERVICES.map((s, i) => (
              <ServiceItem key={s.id} s={s} index={i} open={openIds.includes(s.id)} onToggle={() => toggle(s.id)} />
            ))}
          </ul>
        </Container>
      </section>

      <PlanningCta />
    </div>
  );
};
