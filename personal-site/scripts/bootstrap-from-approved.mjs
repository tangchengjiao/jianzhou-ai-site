// One-time mechanical migration from the owner-approved prototype.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const source='D:/见舟AI项目产品/jianzhou-personal-prototype-20261027';
if(await fs.stat(path.join(root,'src/app.js')).catch(()=>null))throw new Error('本项目已完成迁移；请编辑 content 与 src，不要再次覆盖已整理内容。');
for(const dir of ['src','public/assets','content/articles','scripts','tests','docs'])await fs.mkdir(path.join(root,dir),{recursive:true});
const sandbox={};vm.runInNewContext(await fs.readFile(path.join(source,'site-data.js'),'utf8'),sandbox);const data=sandbox.SiteData;
data.products=data.products.filter(p=>p.id!=='zhimou');
data.paths.forEach(p=>p.steps.forEach(step=>{if(step.product==='zhimou'){delete step.product;step.article='first-skill';step.title='明确工具输入与人的确认';step.task='说清工具需要哪些输入、哪些判断交给人，以及怎样检查结果。';step.output='一份输入、确认与结果检查清单'}}));
for(const p of data.products){delete p.review}
const writeJson=(name,value)=>fs.writeFile(path.join(root,'content',name),JSON.stringify(value,null,2)+'\n','utf8');
await writeJson('products.json',data.products);await writeJson('learning-paths.json',data.paths);await writeJson('tools.json',data.tools);await writeJson('evidence.json',data.evidence);await writeJson('brand.json',data.brand);await writeJson('media.json',data.media);
for(const a of data.articles){
  const meta={...a};delete meta.sections;meta.state=a.draft?'draft':'source-guide';meta.exerciseTitles=a.sections.filter(s=>s.exercise).map(s=>s.title);
  const front=Object.entries(meta).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n');
  const body=a.sections.map(s=>`## ${s.title}\n\n${s.body}\n${s.list?'\n'+s.list.map(t=>'- '+t).join('\n')+'\n':''}`).join('\n');
  await fs.writeFile(path.join(root,'content/articles',a.id+'.md'),`---\n${front}\n---\n\n${body}`,'utf8');
}
let app=await fs.readFile(path.join(source,'app.js'),'utf8');
app=app.replace('const reviewNote = text =>', 'const unusedReviewNote = text =>');
app=app.replace("  function nav(route){", "  const reviewNote = () => '';\n  function nav(route){");
app=app.replaceAll('href="#${','href="${').replaceAll('href="#/','href="/');
app=app.replace("const hash=location.hash.slice(1)||'/';const [route,search='']=hash.split('?');", "const route=location.pathname.replace(/\\/$/,'')||'/';const search=location.search.slice(1);");
app=app.replace('window.addEventListener(\'hashchange\',render);render();',"window.addEventListener('popstate',render);render();");
const start=app.indexOf('  function blueprint(){');const end=app.indexOf('  function toast(',start);if(start<0||end<0)throw new Error('Prototype function boundaries changed');app=app.slice(0,start)+app.slice(end);
app=app.replace(/^.*else if\(route==='\/blueprint'\).*\n/m,'');
const bp=app.indexOf("    if(route==='/blueprint'){");const bpEnd=app.indexOf("    if(route==='/'){",bp);if(bp>=0&&bpEnd>bp)app=app.slice(0,bp)+app.slice(bpEnd);
app=app.replace("'智眸产品咨询',",'').replaceAll('以及智眸','').replaceAll('，以及智眸','').replaceAll('、智眸','');
app=app.replace('<a href="/blueprint">HTML 原型 · 未上线</a>','<a href="/contact">联系见舟</a>');
app=app.replaceAll('原型样稿','待定稿').replaceAll('本原型','当前版本').replaceAll('原型讨论','内容讨论').replaceAll('用于审阅文字、阅读节奏和后续路径','内容草稿，开放阅读用于审阅').replaceAll('文章详情的','文章详情的');
app=app.replaceAll('<p>${s.body}</p>','${s.bodyHtml||`<p>${s.body}</p>`}');
app=app.replace("['内容研究与经营','业务协作与系统连接'].filter", "['内容研究与经营','业务协作与系统连接'].filter");
// SSR is the first render. The same small script enhances search and local exercises.
await fs.writeFile(path.join(root,'src/app.js'),app,'utf8');
await fs.copyFile(path.join(source,'site.css'),path.join(root,'src/site.css'));
let shell=await fs.readFile(path.join(source,'index.html'),'utf8');
shell=shell.replace(/  <div class="prototype-bar">[\s\S]*?<\/div><\/div>\r?\n/,'');
shell=shell.replaceAll('href="site.css"','href="/site.css"').replaceAll('src="site-data.js"','src="/site-data.js"').replaceAll('src="app.js"','src="/app.js"').replaceAll('交互原型','个人网站').replaceAll('个人站交互原型','个人站');
await fs.writeFile(path.join(root,'src/shell.html'),shell,'utf8');
await fs.cp(path.join(source,'assets'),path.join(root,'public/assets'),{recursive:true});
const mediaSource='E:/CodexData/JianzhouSite/product-media-review-20261027';
for(const [from,to] of [['zhihui-04.png','zhihui-workshop.png'],['zhihui-06.png','zhihui-workflow.png'],['tanliu-profile-schematic.png','tanliu-profile.png'],['tanliu-leads-schematic.png','tanliu-leads.png']])await fs.copyFile(path.join(mediaSource,from),path.join(root,'public/assets',to));
console.log('Approved baseline migrated. Four public products; original prototype preserved.');
