import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'CITIUSCOMM';
const HOME_TITLE = `${SITE} – Keeping You One Step Ahead!`;

// Route slug → page name shown in the browser tab
const PAGE_NAMES: Record<string, string> = {
  'about-us': 'About Us',
  services: 'Services',
  components: 'Components',
  'data-centre-services': 'Components',
  'company-profile': 'Company Profile',
  'why-us': 'Why Us',
  leadership: 'Leadership',
  partners: 'Partners',
  products: 'Products',
  'digital-services': 'Digital Services',
  networking: 'Networking',
  fttx: 'FTTX',
  'server-storage': 'Server & Storage',
  'data-center-cloud': 'Data Center & Cloud',
  'industry-applications': 'Industry Applications',
  'security-solutions': 'Security Solutions',
  'case-studies': 'Case Studies',
  'category/case-studies': 'Case Studies',
  'rakuten-mobile': 'Rakuten Mobile',
  'nepal-telecom': 'Nepal Telecom',
  'net-broadband': 'Net+ Broadband',
  careers: 'Careers',
  contact: 'Contact',
};

export const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const slug = pathname.replace(/^\/+|\/+$/g, '');
    const name = PAGE_NAMES[slug];
    document.title = name ? `${name} – ${SITE}` : HOME_TITLE;
  }, [pathname]);

  return null;
};
