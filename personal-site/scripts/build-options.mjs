export function buildOptions(args,env={}){
  const production=args.includes('--production');
  const i=args.indexOf('--site-url');const input=i>=0?args[i+1]:env.SITE_URL;
  const siteUrl=input||'http://127.0.0.1:4200';const url=new URL(siteUrl);
  if(production&&(!input||url.protocol!=='https:'||url.hostname==='localhost'||url.hostname==='127.0.0.1'||url.pathname!=='/'||url.search||url.hash))throw new Error('正式构建需要明确的 HTTPS 站点根地址：--site-url https://实际域名');
  return {production,siteUrl:url.origin,outputName:production?'dist-release':'dist',mode:production?'production':'review'};
}
export function checkReleaseContent(D){
  const drafts=D.articles.filter(a=>a.draft);
  if(drafts.length)throw new Error('正式构建前需本人确认文章定稿：'+drafts.map(a=>a.title).join('；'));
}
