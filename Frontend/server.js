// Passenger entry point for cPanel's Node.js Selector. Passenger sets
// process.env.PORT and expects this file to start an HTTP server listening
// on it — `next start` alone doesn't work here because Passenger doesn't
// invoke npm scripts, only this file directly. Requires `npm run build` to
// have already produced .next (done by .cpanel.yml before Passenger starts
// the app).
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT, () => {
    console.log(`Frontend ready on port ${process.env.PORT}`);
  });
});
