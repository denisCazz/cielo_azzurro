import fs from 'node:fs';
const dirs = [
  'c:\\Users\\U1795\\Desktop\\bitora_clienti\\angelo_azzurro\\src\\layouts',
  'c:\\Users\\U1795\\Desktop\\bitora_clienti\\angelo_azzurro\\src\\components',
  'c:\\Users\\U1795\\Desktop\\bitora_clienti\\angelo_azzurro\\src\\pages',
  'c:\\Users\\U1795\\Desktop\\bitora_clienti\\angelo_azzurro\\public',
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));
console.log('Done');
