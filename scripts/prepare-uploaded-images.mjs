import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
const assets = [
 ['f1010c7d4dcbf2024ec02e1abfa90cd8_940x626_fit.png', 'hero/kaers-black-seed-red-onion.webp', 1200],
 ['69a306df-1167-4b78-915f-0c0ea3b24f59.jfif', 'products/kaers-black-seed-red-onion-shampoo.webp', 900],
 ['65eecac1532eab7c22b4bf45c195f9c3_940x626_fit.png', 'products/kaers-black-seed-soap.webp', 1000],
 ['f488735ff261cfdec7814547dc8ffe0e_360x360_fill.jpg', 'products/kristaveda-mineral-deodorant.webp', 500],
 ['21797e5a89172aa3dec3e01a408a3b97_360x360_fill.jpg', 'products/kristaveda-aloe-vera-deodorant.webp', 500],
 ['4e153be03c6aad97a8dfa1edd5dd2577_940x626_fit.jpg', 'brands/kristaveda-black-seed-deodorant.webp', 1000],
 ['b35b04f6c7ff10fae9f2dc13cc0e541a_fit.png', 'ingredients/botanical-landscape.webp', 1920],
 ['39e32579-5466-4794-9d7f-dc7cf38218d4.jfif', 'products/kaers-black-seed-shampoo.webp', 900],
 ['66cd6b70-513f-452b-830c-69f79a57f52f.jfif', 'products/kaers-black-seed-ashwagandha-shampoo.webp', 900],
 ['b88dfa9c-db0d-428f-b827-68b03dd89999.jfif', 'products/kaers-black-seed-charcoal-shampoo.webp', 900],
 ['1bdd361d6569155a2fb73e62649c3a35_360x360_fill.jpg', 'products/kristaveda-turmeric-deodorant.webp', 360],
 ['1ab2f7445ecb3c5a45f37b4398fd3004_360x360_fill.jpg', 'products/kristaveda-chamomile-deodorant.webp', 360],
 ['41b77dc180b68f1b949446e1a4922c7d_360x360_fill.jpg', 'products/kristaveda-mangosteen-deodorant.webp', 360],
 ['778f6943d76550fa7e8416dec0cae7dd_360x360_fill.jpg', 'products/kristaveda-black-seed-deodorant.webp', 360],
];
const manifest=[];
for(const [source,target,width] of assets){
 const destination=`public/images/${target}`;
 mkdirSync(destination.slice(0,destination.lastIndexOf('/')),{recursive:true});
 const info=await sharp(`public/images/${source}`).rotate().resize({width,withoutEnlargement:true}).webp({quality:88}).toFile(destination);
 manifest.push({source,output:target,width:info.width,height:info.height,bytes:info.size});
}
writeFileSync('qa/image-assets.json',JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest));
