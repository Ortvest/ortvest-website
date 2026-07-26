import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { legalPages } from './legal-pages-content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'messages');

for (const locale of ['en', 'pl', 'ua']) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.legalPages = legalPages;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated legalPages in messages/${locale}.json`);
}
