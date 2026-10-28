import {loadContent,validateContent} from './content.mjs';
const D=await loadContent();const issues=validateContent(D);if(issues.length){console.error(issues.join('\n'));process.exitCode=1}else console.log(`Content references valid: ${D.products.length} products, ${D.articles.length} articles, ${D.paths.length} learning paths.`);
