import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {root,loadContent,routesFor} from './content.mjs';
const D=await loadContent();const publication=JSON.parse(await fs.readFile(path.join(root,'content/publication.json'),'utf8'));const routes=routesFor(D);const directory=path.join(root,'dist-release');
for(const route of routes){
  const raw=await fs.readFile(path.join(directory,route==='/'?'index.html':route.slice(1)+'/index.html'),'utf8');const {document}=parseHTML(raw);
  assert.equal(document.documentElement.dataset.siteMode,'production',route);
  assert.equal(document.querySelector('meta[name="robots"]').getAttribute('content'),'index,follow',route);
  assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'),publication.siteUrl+(route==='/'?'/':route+'/'),route);
  assert.equal(document.querySelectorAll('main h1').length,1,route);
  assert.ok(!document.querySelector('main').textContent.includes('待定稿'),route);
  for(const img of document.querySelectorAll('img[src]')){const src=img.getAttribute('src');if(src.startsWith('/assets/'))assert.ok((await fs.stat(path.join(directory,src))).size>0,route+' '+src)}
}
const robots=await fs.readFile(path.join(directory,'robots.txt'),'utf8');assert.ok(robots.includes('Allow: /'));assert.ok(robots.includes(publication.siteUrl+'/sitemap.xml'));
assert.ok(!(await fs.readFile(path.join(directory,'site-data.js'),'utf8')).includes('"draft":true'));
console.log(`Production output verified: ${routes.length} pages, approved articles, canonical URLs, images and indexing.`);
