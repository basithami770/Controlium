const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function respond(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { 'Allow': 'GET, HEAD' });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '.');
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache'
    });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(file).pipe(response);
  });
}

const configuredPort = process.env.PORT ? Number(process.env.PORT) : 3000;
if (!Number.isInteger(configuredPort) || configuredPort < 1 || configuredPort > 65535) {
  console.error('PORT must be a number between 1 and 65535.');
  process.exit(1);
}

function start(port) {
  const server = http.createServer(respond);
  server.once('error', error => {
    if (!process.env.PORT && error.code === 'EADDRINUSE' && port < 3010) {
      start(port + 1);
    } else {
      console.error(`Could not start the website: ${error.message}`);
      process.exitCode = 1;
    }
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Controlium website ready: http://127.0.0.1:${port}/`);
    console.log('Press Ctrl+C to stop.');
  });
}

start(configuredPort);
