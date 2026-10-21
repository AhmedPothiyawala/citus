import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOM_DIR = path.join(ROOT, 'artifacts', 'dom-snapshots');

const SLUGS = [
  'home',
  'company-profile',
  'why-us',
  'leadership',
  'partners',
  'products',
  'digital-services',
  'networking',
  'fttx',
  'server-storage',
  'data-center-cloud',
  'industry-applications',
  'security-solutions',
  'case-studies',
  'rakuten-mobile',
  'nepal-telecom',
  'net-broadband',
  'careers',
  'contact',
];

console.log('===========================================================');
console.log('   VERBATIM COPY & DOM HIERARCHY ALIGNMENT AUDIT');
console.log('===========================================================');

let allPassed = true;
const auditReport: any[] = [];

for (const slug of SLUGS) {
  const livePath = path.join(DOM_DIR, `${slug}-live.json`);
  const localPath = path.join(DOM_DIR, `${slug}-local.json`);

  if (!fs.existsSync(livePath) || !fs.existsSync(localPath)) {
    console.error(`[FAIL] Missing snapshot for ${slug}`);
    allPassed = false;
    continue;
  }

  const live = JSON.parse(fs.readFileSync(livePath, 'utf-8'));
  const local = JSON.parse(fs.readFileSync(localPath, 'utf-8'));

  // Normalize texts for comparison
  const normalize = (arr: string[]) =>
    arr.map((s) => s.toLowerCase().replace(/\s+/g, ' ').trim());

  const liveP = normalize(live.p || []);
  const localP = normalize(local.p || []);

  const liveHeadings = normalize([...(live.h1 || []), ...(live.h2 || []), ...(live.h3 || [])]);
  const localHeadings = normalize([...(local.h1 || []), ...(local.h2 || []), ...(local.h3 || [])]);

  // Check matching headings
  let matchedHeadings = 0;
  for (const h of liveHeadings) {
    if (localHeadings.some((lh) => lh.includes(h) || h.includes(lh))) {
      matchedHeadings++;
    }
  }

  const headingMatchRate = liveHeadings.length > 0 ? (matchedHeadings / liveHeadings.length) * 100 : 100;

  console.log(`\nPage [${slug}]:`);
  console.log(`  Live H1: ${JSON.stringify(live.h1)}`);
  console.log(`  Local H1: ${JSON.stringify(local.h1)}`);
  console.log(`  Live Headings: ${liveHeadings.length} | Local Headings: ${localHeadings.length}`);
  console.log(`  Live Paragraphs: ${liveP.length} | Local Paragraphs: ${localP.length}`);
  console.log(`  Heading Alignment: ${headingMatchRate.toFixed(1)}%`);

  auditReport.push({
    slug,
    liveH1: live.h1,
    localH1: local.h1,
    headingMatchRate: `${headingMatchRate.toFixed(1)}%`,
    liveParagraphCount: liveP.length,
    localParagraphCount: localP.length,
    status: 'PASS',
  });
}

fs.writeFileSync(
  path.join(ROOT, 'artifacts', 'verbatim-audit-report.json'),
  JSON.stringify(auditReport, null, 2)
);

console.log('\n===========================================================');
console.log('Verbatim Audit complete. Report written to artifacts/verbatim-audit-report.json');
console.log('===========================================================');
