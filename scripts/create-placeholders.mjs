import { mkdirSync, writeFileSync } from 'node:fs';
const assets = {
 'hero/botanical-composition': ['#e7e6da', '#657653', 0],
 'products/black-seed-shampoo': ['#e9e9df', '#748264', 1], 'products/black-seed-soap': ['#eee6d8', '#9c825a', 2], 'products/mineral-deodorant': ['#e6e8e0', '#819080', 3],
 'ingredients/botanical-study': ['#d9dfcc', '#405a3b', 4], 'campaigns/kaers-hair-ritual': ['#364b3b', '#b4bd94', 5],
 'categories/hair': ['#dddcca', '#697951', 6], 'categories/body': ['#e8dccd', '#967951', 7], 'categories/mineral': ['#dce2d7', '#74836d', 8], 'categories/beauty': ['#e8d8ce', '#9a7664', 9], 'categories/henna': ['#e0d7c1', '#8b7950', 10],
 'brands/kristaveda': ['#e2e5d9', '#6f7c60', 11], 'brands/kaers': ['#d4d8c5', '#68774f', 12], 'brands/ilashveda': ['#eaddd4', '#997d6c', 13], 'brands/golecha': ['#e3d7bb', '#8e7b4e', 14],
};
for (const [name, [bg, ink, index]] of Object.entries(assets)) {
 let leaves = '';
 for (let branch = 0; branch < 3; branch++) {
  const x = 290 + branch * 90; const tilt = (branch - 1) * 29 + (index % 3) * 5;
  leaves += `<g transform="rotate(${tilt} ${x} 690)"><path d="M${x} 750 Q${x-50} 430 ${x+5} 130" fill="none" stroke="${ink}" stroke-width="3"/>`;
  for (let j = 0; j < 8; j++) { const y = 200+j*62; const side = j % 2 ? 1 : -1;
   leaves += `<path d="M${x-12} ${y+30} Q${x+side*130} ${y-100} ${x+side*151} ${y-30} Q${x+side*112} ${y+44} ${x-12} ${y+30}" fill="${ink}" opacity="${.38 + j*.055}"/><path d="M${x-12} ${y+30} L${x+side*126} ${y-28}" stroke="${bg}" opacity=".5" fill="none"/>`;
  } leaves += '</g>';
 }
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900"><defs><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer></filter></defs><path fill="${bg}" d="M0 0h800v900H0z"/><circle cx="435" cy="362" r="265" fill="#fff" opacity=".19"/><ellipse cx="435" cy="775" rx="245" ry="32" fill="${ink}" opacity=".11"/>${leaves}<path d="M0 0h800v900H0z" filter="url(#paper)" opacity=".8"/><path d="M40 55h40M40 55v40M760 845h-40M760 845v-40" stroke="${ink}" opacity=".35" fill="none"/></svg>`;
 const path = `public/images/${name}.svg`; mkdirSync(path.slice(0,path.lastIndexOf('/')), { recursive: true }); writeFileSync(path, svg);
}
