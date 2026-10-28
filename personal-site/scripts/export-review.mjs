import fs from 'node:fs/promises';
import path from 'node:path';
import {root,reportDirectory} from './content.mjs';
export async function exportReview(D,shell,source){
  let data=JSON.stringify(D).replace(/</g,'\\u003c');
  for(const asset of new Set(data.match(/\/assets\/[a-z0-9-]+\.(?:png|jpg)/g)||[])){
    const bytes=await fs.readFile(path.join(root,'public',asset));const type=asset.endsWith('.jpg')?'image/jpeg':'image/png';data=data.split(asset).join(`data:${type};base64,${bytes.toString('base64')}`);
  }
  const app=source.replaceAll('href="${path}"','href="#${path}"').replaceAll('href="${parent[0]}"','href="#${parent[0]}"').replaceAll('href="${x.url}"','href="#${x.url}"').replaceAll('href="/','href="#/').replace("const route=location.pathname.replace(/\\/$/,'')||'/';const search=location.search.slice(1);", "const [route,search='']=(location.hash.slice(1)||'/').split('?');").replace("window.addEventListener('popstate',render)","window.addEventListener('hashchange',render)");
  let html=shell.replace('  <link rel="stylesheet" href="/site.css">',()=>'<style>'+''+'</style>').replace('  <script defer src="/site-data.js"></script>','').replace('  <script defer src="/app.js"></script>','');
  const css=await fs.readFile(path.join(root,'src/site.css'),'utf8');html=html.replace('<style></style>',()=>'<style>'+css+'</style>');
  html=html.replace('</body>',()=>'<script>globalThis.SiteData='+data+';</script><script>'+app+'</script></body>');
  const dir=reportDirectory('review');await fs.mkdir(dir,{recursive:true});const target=path.join(dir,'见舟个人站-本地校对版.html');await fs.writeFile(target,html,'utf8');return target;
}
