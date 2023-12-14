const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');

const app = express();
const proxy = httpProxy.createProxyServer();
const port = 3000;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Configurar la ruta para el servidor proxy
const apiUrl = 'http://159.54.135.174/Apis/consultar_Tiendas.php';
app.all('/api/*', (req, res) => {
  const targetUrl = apiUrl + req.url;

  // Realizar la solicitud proxy
  proxy.web(req, res, { target: targetUrl });
});

// Manejar errores del servidor proxy
proxy.on('error', (err, req, res) => {
  console.error('Error en el servidor proxy:', err);
  res.status(500).send('Error interno en el servidor proxy.');
});

// Responder a la ruta "/" con el método GET enviando el archivo 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express y proxy escuchando en el puerto ${port}`);
});
