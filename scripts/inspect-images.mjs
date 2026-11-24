import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
const files = readdirSync('public/images').filter(f => /\.(png|jpe?g|jfif)$/i.test(f) && f !== 'og-preview.png');
const tiles = [];
const metadata = [];
for (const [index, file] of files.entries()) {
 const path = `public/images/${file}`;
 const info = await sharp(path).metadata();
 metadata.push({index, file, width:info.width, height:info.height});
 const thumb = await sharp(path).rotate().resize(250,210,{fit:'contain',background:'#ecebe5'}).png().toBuffer();
 const label = Buffer.from(`<svg width="270" height="45"><rect width="270" height="45" fill="white"/><text x="8" y="17" font-size="13" font-family="Arial">${index}: ${file.slice(0,25)}</text><text x="8" y="35" font-size="12" font-family="Arial">${info.width} × ${info.height}</text></svg>`);
 tiles.push({input:thumb,left:(index%4)*270+10,top:Math.floor(index/4)*265});
 tiles.push({input:label,left:(index%4)*270,top:Math.floor(index/4)*265+215});
}
mkdirSync('qa',{recursive:true});
await sharp({create:{width:1080,height:Math.ceil(files.length/4)*265,channels:3,background:'#ecebe5'}}).composite(tiles).jpeg({quality:90}).toFile('qa/uploaded-images.jpg');
writeFileSync('qa/uploaded-images.json',JSON.stringify(metadata,null,2));
console.log(JSON.stringify(metadata));
