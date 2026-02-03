#!/usr/bin/env bun
import path from 'node:path';
import { Glob } from 'bun';

// 1. Parse Arguments (Simple CLI handling)
// Usage: doc-gen <target-dir> [output-file]
const args = Bun.argv.slice(2);
const SOURCE_DIR = args[0] || './src';
const OUTPUT_FILE = args[1] || './REFERENCE.md';

console.log(`\n🔍 Field Logic Docs: Scanning ${SOURCE_DIR}...`);

async function getFiles() {
  const glob = new Glob('**/*.{ts,tsx}');
  const files = [];
  for await (const file of glob.scan(SOURCE_DIR)) {
    files.push(path.join(SOURCE_DIR, file));
  }
  return files;
}

function formatComment(rawComment: string) {
  const lines = rawComment
    .replace(/\/\*\*/, '')
    .replace(/\*\//, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter((line) => line !== '');

  let output: string[] = [];
  let listStarted = false;

  lines.forEach((line) => {
    if (line.startsWith('@module') || line.startsWith('@description')) return;
    if (line.startsWith('TODO:')) {
      output.push(`> 🚧 **Pending:** ${line.replace('TODO:', '').trim()}`);
      return;
    }
    if (line.startsWith('@param')) {
      if (!listStarted) {
        output.push('\n**Parameters:**');
        listStarted = true;
      }
      const match = line.match(/@param\s+([a-zA-Z0-9_]+)\s*-?\s*(.*)/);
      if (match) output.push(`* \`${match[1]}\`: ${match[2]}`);
      else output.push(`* ${line.replace('@param', '').trim()}`);
    } else if (line.startsWith('@property')) {
      if (!listStarted) {
        output.push('\n**Properties:**');
        listStarted = true;
      }
      const match = line.match(/@property\s+([a-zA-Z0-9_]+)\s*-?\s*(.*)/);
      if (match) output.push(`* \`${match[1]}\` - ${match[2]}`);
      else output.push(`* ${line.replace('@property', '').trim()}`);
    } else if (line.startsWith('@returns') || line.startsWith('@return')) {
      listStarted = false;
      output.push(`\n**Returns:** ${line.replace(/@returns?/, '').trim()}`);
    } else {
      listStarted = false;
      output.push(line);
    }
  });
  return output.join('\n');
}

function extractDocs(content: string) {
  const items = [];
  let fileDescription = null;
  let remainingContent = content;

  const fileHeaderRegex = /^\s*\/\*\*([\s\S]*?)\*\//;
  const headerMatch = content.match(fileHeaderRegex);

  if (headerMatch) {
    const raw = headerMatch[1] || '';
    if (
      raw.includes('@module') ||
      raw.includes('@description') ||
      !content.match(/^\s*\/\*\*[\s\S]*?\*\/\s*export/)
    ) {
      fileDescription = formatComment(raw);
      remainingContent = content.replace(headerMatch[0], '');
    }
  }

  // Added (?:default\s+)? to capture "export default function"
  const exportRegex =
    /((?:\/\*\*[\s\S]*?\*\/[\s\n]*)?)export\s+(?:default\s+)?(?:async\s+)?(function|const|type|interface|class|enum)\s+([a-zA-Z0-9_]+)?([\s\S]*?)(?:\{|;)/g;

  let match;
  while ((match = exportRegex.exec(remainingContent)) !== null) {
    const commentBlock = match[1];
    const typeKeyword = match[2];
    const name = match[3];
    const rawSignature = match[4] || '';

    const cleanSignature = rawSignature.replace(/\s+/g, ' ').trim();
    const fullSignature = `export ${typeKeyword} ${name}${cleanSignature}`;

    if (commentBlock && commentBlock.trim().length > 0) {
      items.push({
        name,
        signature: fullSignature,
        comment: formatComment(commentBlock),
        status: 'ok',
      });
    } else {
      items.push({
        name,
        signature: fullSignature,
        comment: '_No documentation provided._',
        status: 'missing',
      });
    }
  }
  return { fileDescription, items };
}

async function generateMarkdown() {
  const files = await getFiles();
  let totalItems = 0;
  let documentedItems = 0;
  let outputBody = '';

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    if (relativePath.endsWith('index.ts') || relativePath.includes('.test.'))
      continue;

    const content = await Bun.file(filePath).text();
    const { fileDescription, items } = extractDocs(content);

    if (items.length > 0 || fileDescription) {
      if (items.length > 0) {
        totalItems += items.length;
        documentedItems += items.filter((i) => i.status === 'ok').length;
      }

      outputBody += `## 📂 \`${relativePath}\`\n\n`;
      if (fileDescription) outputBody += `${fileDescription}\n\n`;

      items.sort((a, b) => (a.status === 'missing' ? -1 : 1));
      items.forEach((doc) => {
        const icon = doc.status === 'missing' ? '🔴' : '';
        outputBody += `### ${icon} **${doc.name}**\n`;
        outputBody += `${doc.comment}\n\n`;
        outputBody += '```typescript\n' + doc.signature + '\n```\n\n';
      });
      outputBody += '---\n\n';
    }
  }

  const coverage =
    totalItems === 0 ? 100 : Math.round((documentedItems / totalItems) * 100);
  const color = coverage > 80 ? 'green' : coverage > 50 ? 'orange' : 'red';

  let header = `# Reference\n\n`;
  header += `![Coverage](https://img.shields.io/badge/Coverage-${coverage}%25-${color})\n`;
  header += `\n**Total Exports:** ${totalItems} | **Documented:** ${documentedItems}\n\n---\n\n`;

  await Bun.write(OUTPUT_FILE, header + outputBody);
  console.log(
    `\x1b[32m✔ Docs generated in ${OUTPUT_FILE} (${coverage}% coverage)\x1b[0m`
  );
}

generateMarkdown();
