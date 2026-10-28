import fs from 'node:fs/promises';
import path from 'node:path';
import {marked} from 'marked';
export const root=path.resolve(import.meta.dirname,'..');
export const reportDirectory=mode=>process.platform==='win32'?'E:/CodexData/JianzhouSite/'+(mode==='production'?'formal-release-20261028':'formal-build-20261028'):path.join(root,'.local-reports',mode);
export function parseArticle(text){
  const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!match)throw new Error('文章需要 frontmatter');
  const meta={};for(const line of match[1].split(/\r?\n/)){if(!line.trim())continue;const field=line.match(/^([\w-]+):\s*(.*)$/);if(!field)throw new Error('无法读取文章字段：'+line);try{meta[field[1]]=JSON.parse(field[2])}catch{meta[field[1]]=field[2]}}
  const sections=[];let title='',body=[];const flush=()=>{if(title||body.length)sections.push({title:title||'正文',bodyHtml:marked.parse(body.join('\n')),exercise:(meta.exerciseTitles||[]).includes(title)})};
  for(const line of match[2].trim().split(/\r?\n/)){if(line.startsWith('## ')){flush();title=line.slice(3).trim();body=[]}else body.push(line)}flush();
  return {...meta,sections};
}
export async function loadContent(){
  const json=async name=>JSON.parse(await fs.readFile(path.join(root,'content',name+'.json'),'utf8'));
  const D={};for(const [key,name] of Object.entries({brand:'brand',media:'media',products:'products',tools:'tools',paths:'learning-paths',evidence:'evidence',offer:'learning-offer'}))D[key]=await json(name);
  D.articles=[];for(const file of (await fs.readdir(path.join(root,'content/articles'))).filter(f=>f.endsWith('.md')).sort()){D.articles.push(parseArticle(await fs.readFile(path.join(root,'content/articles',file),'utf8')))}
  D.articles.sort((a,b)=>(a.order??100)-(b.order??100));
  const absolute=value=>typeof value==='string'&&value.startsWith('assets/')?'/'+value:value;
  for(const key of Object.keys(D.media))D.media[key]=absolute(D.media[key]);
  for(const e of Object.values(D.evidence))for(const item of e.items)item.src=absolute(item.src);
  return D;
}
export function routesFor(D){return ['/','/start','/writing','/learn','/products','/about','/contact',...D.articles.map(x=>'/writing/'+x.id),...D.products.map(x=>'/products/'+x.id),...D.tools.map(x=>'/tools/'+x.id),...D.paths.map(x=>'/learn/paths/'+x.id),'/learn/programs/workflow-lab','/practice/guanbiao']}
export function validateContent(D){
  const issues=[],ids=new Set();for(const collection of ['articles','products','tools','paths'])for(const item of D[collection]){const key=collection+':'+item.id;if(ids.has(key))issues.push('重复 ID '+key);ids.add(key)}
  const articleIds=new Set(D.articles.map(x=>x.id)),productIds=new Set(D.products.map(x=>x.id)),pathIds=new Set(D.paths.map(x=>x.id));
  if(productIds.has('zhimou'))issues.push('用户已排除的产品仍在公开内容中');
  for(const p of D.products){for(const id of p.articles||[])if(!articleIds.has(id))issues.push(p.id+' 文章关联不存在 '+id);if(p.path&&!pathIds.has(p.path))issues.push(p.id+' 路线不存在')}
  for(const p of D.paths){if(p.product&&!productIds.has(p.product))issues.push(p.id+' 路线产品不存在');for(const s of p.steps){if(s.article&&!articleIds.has(s.article))issues.push(p.id+' 文章不存在 '+s.article);if(s.product&&!productIds.has(s.product))issues.push(p.id+' 产品不存在 '+s.product);if(Number(Boolean(s.article))+Number(Boolean(s.product))+Number(Boolean(s.guide?.length))!==1)issues.push(p.id+' 每一步应有一个明确的阅读或练习入口')}}
  for(const t of D.tools)if(!articleIds.has(t.related))issues.push(t.id+' 工具关联文章不存在');
  for(const a of D.articles){if(a.path&&!pathIds.has(a.path))issues.push(a.id+' 文章路线不存在');if(a.product&&!productIds.has(a.product))issues.push(a.id+' 文章产品不存在')}
  for(const [id,e]of Object.entries(D.evidence)){if(!productIds.has(id))issues.push('素材无对应产品 '+id);if(!e.items.some(item=>item.id===e.cover))issues.push('产品封面不存在 '+id);for(const item of e.items){if(!item.src.startsWith('/assets/'+id+'-'))issues.push('素材前缀与产品不对应 '+id);if(!item.id.startsWith(id+'-'))issues.push('素材 ID 与产品不对应 '+id)}}
  for(const a of D.articles){if(!a.title||!a.summary||!a.sections.length)issues.push('文章内容不完整 '+a.id);if(a.draft===false&&!a.source&&a.state==='source-guide')issues.push('导读缺原文 '+a.id)}
  return issues;
}
