#!/usr/bin/env node
/**
 * Migration script to convert Hugo posts (TOML frontmatter) to Astro format (YAML frontmatter)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SOURCE_DIR = path.resolve(__dirname, '../../content/posts');
const DEST_DIR = path.resolve(__dirname, '../src/content/posts');
const IMAGES_SOURCE = path.resolve(__dirname, '../../content/posts/images');
const IMAGES_DEST = path.resolve(__dirname, '../public/images/posts');

// Improved TOML frontmatter parser that handles multi-line arrays
function parseTOML(tomlString) {
  const result = {};
  let currentKey = null;
  let arrayBuffer = [];
  let inArray = false;

  const lines = tomlString.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check if we're starting a new key-value pair
    const keyMatch = trimmed.match(/^(\w+)\s*=\s*(.*)$/);

    if (keyMatch && !inArray) {
      const [, key, value] = keyMatch;
      let parsedValue = value.trim();

      // Handle single-line string
      if (parsedValue.startsWith('"') && parsedValue.endsWith('"')) {
        result[key] = parsedValue.slice(1, -1);
      }
      // Handle single-line array
      else if (parsedValue.startsWith('[') && parsedValue.endsWith(']')) {
        try {
          // Replace single quotes with double quotes for JSON parsing
          const jsonArray = parsedValue.replace(/'/g, '"');
          result[key] = JSON.parse(jsonArray);
        } catch {
          result[key] = [];
        }
      }
      // Handle multi-line array start
      else if (parsedValue.startsWith('[') && !parsedValue.endsWith(']')) {
        currentKey = key;
        inArray = true;
        arrayBuffer = [];
        // Check if there are items on the same line
        const itemsOnLine = parsedValue.slice(1).trim();
        if (itemsOnLine) {
          const items = parseArrayItems(itemsOnLine);
          arrayBuffer.push(...items);
        }
      }
      // Handle booleans
      else if (parsedValue === 'true') {
        result[key] = true;
      }
      else if (parsedValue === 'false') {
        result[key] = false;
      }
      // Handle other values (numbers, etc.)
      else {
        result[key] = parsedValue;
      }
    }
    // Handle multi-line array content
    else if (inArray) {
      if (trimmed === ']') {
        // End of array
        result[currentKey] = arrayBuffer;
        inArray = false;
        currentKey = null;
        arrayBuffer = [];
      } else if (trimmed.endsWith(']')) {
        // Last line of array with content
        const items = parseArrayItems(trimmed.slice(0, -1));
        arrayBuffer.push(...items);
        result[currentKey] = arrayBuffer;
        inArray = false;
        currentKey = null;
        arrayBuffer = [];
      } else {
        // Middle of array
        const items = parseArrayItems(trimmed);
        arrayBuffer.push(...items);
      }
    }
  }

  return result;
}

// Parse array items from a line
function parseArrayItems(line) {
  const items = [];
  // Match quoted strings
  const matches = line.matchAll(/"([^"]+)"/g);
  for (const match of matches) {
    items.push(match[1]);
  }
  return items;
}

// YAML frontmatter generator
function toYAML(obj) {
  const lines = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
      }
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === 'string') {
      // Check if the value needs quoting
      if (value.includes(':') || value.includes('#') || value.includes('\n') || value.includes('"') || value.includes("'")) {
        // Use single quotes if double quotes are in the value
        if (value.includes('"')) {
          lines.push(`${key}: '${value.replace(/'/g, "''")}'`);
        } else {
          lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
        }
      } else {
        lines.push(`${key}: "${value}"`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  return lines.join('\n');
}

// Extract TOML frontmatter from Hugo post
function extractFrontmatter(content) {
  const tomlMatch = content.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+/);
  const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (tomlMatch) {
    const frontmatter = parseTOML(tomlMatch[1]);
    const body = content.slice(tomlMatch[0].length).trim();
    return { frontmatter, body, type: 'toml' };
  }

  if (yamlMatch) {
    // Already YAML, parse it properly
    const yamlContent = yamlMatch[1];
    const frontmatter = {};
    let currentKey = null;
    let arrayBuffer = [];
    let inArray = false;

    const lines = yamlContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const match = trimmed.match(/^(\w+):\s*(.*)$/);

      if (match && !inArray) {
        let [, key, value] = match;
        value = value.trim();

        // Handle quoted strings
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          frontmatter[key] = value.slice(1, -1);
        }
        // Handle inline arrays
        else if (value.startsWith('[') && value.endsWith(']')) {
          try {
            frontmatter[key] = JSON.parse(value.replace(/'/g, '"'));
          } catch {
            frontmatter[key] = [];
          }
        }
        // Handle multi-line array start
        else if (value.startsWith('[') && !value.endsWith(']')) {
          currentKey = key;
          inArray = true;
          arrayBuffer = [];
        }
        // Handle booleans
        else if (value === 'true') {
          frontmatter[key] = true;
        }
        else if (value === 'false') {
          frontmatter[key] = false;
        }
        // Handle other values
        else if (value) {
          frontmatter[key] = value;
        }
      }
      // Handle array items
      else if (inArray) {
        if (trimmed === ']') {
          frontmatter[currentKey] = arrayBuffer;
          inArray = false;
          currentKey = null;
          arrayBuffer = [];
        } else if (trimmed.startsWith('-')) {
          // YAML array item
          let item = trimmed.slice(1).trim();
          if ((item.startsWith('"') && item.endsWith('"')) ||
              (item.startsWith("'") && item.endsWith("'"))) {
            item = item.slice(1, -1);
          }
          arrayBuffer.push(item);
        } else {
          // Check for array end
          const itemMatches = trimmed.matchAll(/"([^"]+)"/g);
          for (const itemMatch of itemMatches) {
            arrayBuffer.push(itemMatch[1]);
          }
          if (trimmed.endsWith(']')) {
            frontmatter[currentKey] = arrayBuffer;
            inArray = false;
            currentKey = null;
            arrayBuffer = [];
          }
        }
      }
    }

    const body = content.slice(yamlMatch[0].length).trim();
    return { frontmatter, body, type: 'yaml' };
  }

  // No frontmatter
  return { frontmatter: {}, body: content, type: 'none' };
}

// Process a single post
function processPost(filename, content) {
  const { frontmatter, body } = extractFrontmatter(content);

  // Ensure required fields
  const processed = {
    title: frontmatter.title || filename.replace('.md', '').replace(/-/g, ' '),
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    author: frontmatter.author || 'Hido',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    draft: frontmatter.draft === true || frontmatter.draft === 'true',
  };

  // Add description if present
  if (frontmatter.description) {
    processed.description = frontmatter.description;
  }

  // Process body - fix image paths
  let processedBody = body;

  // Fix relative image paths like images/foo.png to /images/posts/foo.png
  processedBody = processedBody.replace(
    /!\[(.*?)\]\(images\/(.*?)\)/g,
    '![$1](/images/posts/$2)'
  );

  // Fix other relative image paths
  processedBody = processedBody.replace(
    /!\[(.*?)\]\(\.\/images\/(.*?)\)/g,
    '![$1](/images/posts/$2)'
  );

  // Generate new content
  const newContent = `---
${toYAML(processed)}
---

${processedBody}`;

  return newContent;
}

// Main migration function
async function migrate() {
  console.log('Starting migration...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  // Create destination directories
  fs.mkdirSync(DEST_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DEST, { recursive: true });

  // Get all markdown files
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} posts to migrate`);

  let migrated = 0;
  let skipped = 0;

  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const destPath = path.join(DEST_DIR, file);

    try {
      const content = fs.readFileSync(sourcePath, 'utf-8');
      const processed = processPost(file, content);
      fs.writeFileSync(destPath, processed);
      migrated++;
      console.log(`✓ ${file}`);
    } catch (error) {
      console.error(`✗ ${file}: ${error.message}`);
      skipped++;
    }
  }

  // Copy images
  if (fs.existsSync(IMAGES_SOURCE)) {
    const images = fs.readdirSync(IMAGES_SOURCE);
    console.log(`\nCopying ${images.length} images...`);

    for (const image of images) {
      const srcPath = path.join(IMAGES_SOURCE, image);
      const destPath = path.join(IMAGES_DEST, image);

      // Only copy files, not directories
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ ${image}`);
      }
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`  Migrated: ${migrated}`);
  console.log(`  Skipped: ${skipped}`);
}

migrate().catch(console.error);
