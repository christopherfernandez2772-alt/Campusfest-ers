const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_PDF = path.join(ROOT, 'Project-Structure.pdf');

function listDir(dir, depth = 0, maxDepth = 4) {
  let lines = [];
  const indent = '  '.repeat(depth);
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.name.startsWith('.git')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        lines.push(`${indent}- ${entry.name}/`);
        if (depth + 1 < maxDepth) {
          lines = lines.concat(listDir(full, depth + 1, maxDepth));
        }
      } else {
        lines.push(`${indent}- ${entry.name}`);
      }
    }
  } catch (e) {
    // ignore
  }
  return lines;
}

function safeReadDir(dir) {
  try { return fs.readdirSync(dir).filter(n=>!n.startsWith('.')); } catch(e) { return []; }
}

function gatherSummary() {
  const summary = {};

  // Server models
  const serverDir = path.join(ROOT, 'server');
  summary.server = {};
  summary.server.models = safeReadDir(path.join(serverDir, 'models'));
  summary.server.controllers = safeReadDir(path.join(serverDir, 'controllers'));
  summary.server.routes = safeReadDir(path.join(serverDir, 'routes'));
  summary.server.middleware = safeReadDir(path.join(serverDir, 'middleware'));
  summary.server.services = safeReadDir(path.join(serverDir, 'services'));

  // Client
  const clientDir = path.join(ROOT, 'client');
  summary.client = {};
  summary.client.pages = safeReadDir(path.join(clientDir, 'pages'));
  summary.client.js = safeReadDir(path.join(clientDir, 'js'));
  summary.client.components = safeReadDir(path.join(clientDir, 'components'));
  summary.client.css = safeReadDir(path.join(clientDir, 'css'));

  // Design
  const designDir = path.join(ROOT, 'design');
  summary.design = safeReadDir(designDir);

  // Root files
  summary.rootFiles = fs.readdirSync(ROOT).filter(f => fs.lstatSync(path.join(ROOT, f)).isFile());

  return summary;
}

function generatePDF() {
  const doc = new PDFDocument({ autoFirstPage: false });
  const stream = fs.createWriteStream(OUT_PDF);
  doc.pipe(stream);

  doc.addPage({ margin: 50, size: 'A4' });
  doc.fontSize(18).font('Helvetica-Bold').text('CampusFest - Project Structure', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text(`Generated: ${new Date().toLocaleString()}`);
  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text('Repository tree (top levels):');
  doc.moveDown(0.5);
  doc.fontSize(10).font('Courier');
  const treeLines = listDir(ROOT, 0, 3);
  treeLines.forEach(line => doc.text(line));

  doc.addPage({ margin: 50, size: 'A4' });
  doc.fontSize(12).font('Helvetica-Bold').text('Server summary');
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica');

  const summary = gatherSummary();

  doc.font('Helvetica-Bold').text('Models:');
  doc.font('Helvetica').list(summary.server.models || []);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Controllers:');
  doc.font('Helvetica').list(summary.server.controllers || []);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Routes:');
  doc.font('Helvetica').list(summary.server.routes || []);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Middleware:');
  doc.font('Helvetica').list(summary.server.middleware || []);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Services:');
  doc.font('Helvetica').list(summary.server.services || []);
  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text('Client summary');
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text('Pages:'); doc.moveDown(0.1);
  doc.font('Helvetica').list(summary.client.pages || []);
  doc.moveDown(0.3);
  doc.text('JS modules:'); doc.moveDown(0.1);
  doc.list(summary.client.js || []);
  doc.moveDown(0.3);
  doc.text('Components:'); doc.moveDown(0.1);
  doc.list(summary.client.components || []);
  doc.moveDown(0.3);
  doc.text('CSS files:'); doc.moveDown(0.1);
  doc.list(summary.client.css || []);

  doc.addPage({ margin: 50, size: 'A4' });
  doc.fontSize(12).font('Helvetica-Bold').text('Design artifacts and notes');
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica');
  (summary.design || []).forEach(item => doc.text(`- ${item}`));

  doc.moveDown(1);
  doc.fontSize(10).font('Helvetica-Bold').text('Root files');
  doc.font('Helvetica').list(summary.rootFiles || []);

  doc.end();

  stream.on('finish', () => {
    console.log('PDF generated at', OUT_PDF);
  });
}

generatePDF();
