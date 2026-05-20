/**
 * Merges scripts/case-studies/*.json into messages/{locale}.json
 * Run: node scripts/merge-case-studies.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const locales = ['en', 'pl', 'ua'];

for (const locale of locales) {
  const messagesPath = path.join(root, 'messages', `${locale}.json`);
  const studiesPath = path.join(__dirname, 'case-studies', `${locale}.json`);

  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf8'));

  messages.caseStudies = studies;
  fs.writeFileSync(messagesPath, `${JSON.stringify(messages, null, 2)}\n`);
  console.log(`Updated messages/${locale}.json`);
}
