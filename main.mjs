import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function incidentReport(data) {
  if (!Array.isArray(data.incidents)) throw new Error('incidents doit être une liste');
  const entries = data.incidents.map(incident => {
    if (!Number.isFinite(incident.atSeconds) || incident.atSeconds < 0) throw new Error('instant invalide');
    if (!['info', 'attention', 'alerte'].includes(incident.level)) throw new Error('niveau attendu : info, attention ou alerte');
    if (typeof incident.note !== 'string' || !incident.note.trim()) throw new Error('note requise');
    return incident;
  }).sort((a, b) => a.atSeconds - b.atSeconds);
  const rows = entries.map(entry => `| ${entry.atSeconds.toFixed(3)} | ${entry.level} | ${cell(entry.note)} |`);
  return ['# Relevé d’incidents', '', '| Secondes | Niveau | Observation |', '| ---: | --- | --- |', ...rows, ''].join('\n');
}

function cell(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage : node main.mjs entree.json releve.md');
  const report = incidentReport(JSON.parse(await readFile(input, 'utf8')));
  await writeFile(output, report, 'utf8');
  console.log('Relevé écrit.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(`Erreur : ${error.message}`); process.exitCode = 1; });
}
