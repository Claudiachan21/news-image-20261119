// news-image-20261119 — "THE WORLD", Thursday 19 November 2026.
//
// The entry is one pre-rendered front page (entry.png): a 1024x1024
// newspaper infographic summing up the day's world news — the
// Trump–Xi–Putin trilateral in Shenzhen, the ICJ's Myanmar genocide
// ruling, the Crimean Bridge struck again, a Houthi missile over
// Riyadh, Denmark's Greenland pact, COP31's final hours, and the
// Anthropic IPO debut. The program runs with no network, so it
// simply places that image at the output path.
//
// The shipped entry.png is the quantized loopdesign final (iter5):
// 1024x1024, 86.656 bytes, sha256
// f29c105fbc907705183d576b99f68a100ec67e8f85bd4f561dcd6274f0aef18d.
//
// Run it:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function loadEntryPng() {
  const here = dirname(fileURLToPath(import.meta.url));
  const bytes = readFileSync(join(here, 'entry.png'));
  const looksLikePng =
    bytes.length >= PNG_MAGIC.length &&
    PNG_MAGIC.every((byte, i) => bytes[i] === byte);
  if (!looksLikePng) {
    throw new Error('entry.png does not start with the PNG signature');
  }
  return bytes;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), loadEntryPng());
