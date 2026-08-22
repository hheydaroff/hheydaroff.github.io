import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert';

const dist = (p) => new URL(`../dist/${p}`, import.meta.url).pathname;
const read = (p) => readFileSync(dist(p), 'utf8');

// 1. Machine-readable: OpenAPI spec
const openapi = JSON.parse(read('openapi.json'));
assert(openapi.openapi.startsWith('3.'), 'openapi.json must be valid OpenAPI 3.x');
assert(Object.keys(openapi.paths).length >= 6, 'openapi.json must describe >= 6 endpoints');
assert(openapi.components.schemas.Error, 'openapi.json must define an Error schema');
assert(openapi.components.schemas.Post, 'openapi.json must define a Post schema');

// 2. Machine-readable: post index
const index = JSON.parse(read('content/index.json'));
assert(index.count > 0, 'content/index.json must list posts');
assert(index.posts[0].url && index.posts[0].slug, 'posts must expose url and slug');

// 3. Content without JS: server-rendered post links + H1 in raw HTML
const home = read('index.html');
assert((home.match(/<h1/g) || []).length === 1, 'homepage must have exactly one H1');
assert((home.match(/href="\/posts\//g) || []).length >= 3, 'homepage must server-render >= 3 post links');

// 4. Agent-friendly 404: recovery links in raw HTML
const notFound = read('404.html');
for (const f of ['/llms.txt', '/sitemap-index.xml', '/content/index.json']) {
  assert(notFound.includes(f), `404 page must link ${f}`);
}

// 5. Agent guidance: when-to-use in llms.txt
const llms = read('llms.txt');
assert(/when to use/i.test(llms), 'llms.txt must contain a when-to-use section');

// 6. Trust anchors
for (const p of ['contact', 'privacy']) {
  assert(existsSync(dist(`${p}/index.html`)), `${p} page must exist`);
}

// 7. JSON-LD Person with url + sameAs
assert(home.includes('"@type":"Person"'), 'homepage JSON-LD must include a Person');
assert(home.includes('"sameAs"'), 'homepage JSON-LD must include sameAs');
assert(home.includes('"jobTitle"'), 'homepage JSON-LD must include jobTitle');

// 8. /blog alias redirects agents to /posts
const blog = read('blog/index.html');
assert(/http-equiv="refresh".*\/posts\//.test(blog), '/blog must meta-refresh to /posts');
assert(blog.includes('rel="canonical"'), '/blog must declare a canonical URL');

console.log('✓ agent-readiness checks passed');