#!/bin/bash
set -e

echo "=========================================================="
echo "   CITIUSCOMM.COM - MASTER 100x TEST AUTOMATION RUNNER    "
echo "=========================================================="

echo ""
echo "=== Phase 1: Unit Stress (100 Iterations per Page) ==="
npm run test:unit:100

echo ""
echo "=== Phase 2: Lint & Build Validation ==="
npm run lint
npm run build

echo ""
echo "=== Phase 3: One-by-One Page Testing in Playwright (100x Iterations) ==="
PAGES=(
  "Page 1: Home"
  "Page 2: Company Profile"
  "Page 3: Leadership"
  "Page 4: Why Us"
  "Page 5: Partners"
  "Page 6: Products"
  "Page 7: Digital Services"
  "Page 8: Networking"
  "Page 9: FTTX"
  "Page 10: Server & Storage"
  "Page 11: Data Center & Cloud"
  "Page 12: Industry Applications"
  "Page 13: Security Solutions"
  "Page 14: Case Studies"
  "Page 15: Rakuten Mobile"
  "Page 16: Nepal Telecom"
  "Page 17: Net\\+ Broadband"
  "Page 18: Careers"
  "Page 19: Contact"
)

for route in "${PAGES[@]}"; do
  echo ">>> Deep Testing: $route (100x Iterations) <<<"
  npx playwright test -g "$route" --repeat-each=100
done

echo ""
echo "=== Phase 4: Full Multi-Page Repetition Stress Suite ==="
npm run test:pages:stress

echo ""
echo "=== Phase 5: Final 100x Unit Stress ==="
npm run test:unit:stress

echo ""
echo "=========================================================="
echo "   ALL 19 PAGES PASSED 100x VERIFICATION WITH 0 ERRORS!   "
echo "=========================================================="
