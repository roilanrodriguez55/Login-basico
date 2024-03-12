const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http
  .createServer((req, res) => {
    const { method } = req;
    switch (method) {
      case "GET":
        manejarMetodoGET(req, res);
        break;
      case "POST":
        manejarMetodoPOST(req, res);
        break;
      case "PUT":
        manejarMetodoPUT(req, res);
        break;
      default:
        console.log("El servidor no puede manejar el metodo seleccionado");
        break;
    }
  })
  .listen(3000, () =>
    console.log(
      `El servidor está escuchando en el puerto http://localhost:${port}`
    )
  );

//Funcion para manejar los
function manejarMetodoGET(req, res) {
  const path = req.url;
  console.log(path);
  if (path === "/" || path === "/index.html") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno del servidor");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (path.startsWith("/styles/")) {
    fs.readFile(`.${path}`, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno del servidor");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      return res.end(data);
    });
  } else if (path === "/pages/login.html") {
    // manejar la página de login
    fs.readFile("./pages/login.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        res.end("Error interno en el servidor");
        return;
      }
      res.writeHead(200, { "Content-type": "text/html" });
      return res.end(data);
    });
  } else if (path === "../") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno del servidor");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (path === "/pages/register.html") {
    // manejar la página de registro
    fs.readFile("./pages/register.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        return res.end("Error interno en el servidor");
      }
      res.writeHead(200, { "Content-type": "text/html" });
      return res.end(data);
    });
  } else {
    res.statusCode = 404;
  }
}

function manejarMetodoPOST(req, res) {}

function manejarMetodoPUT(req, res) {}
