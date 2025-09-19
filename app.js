// app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Ruta de verificación del webhook (GET)
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Verifica que el token coincida
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("✅ Webhook verificado correctamente");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403); // Token incorrecto
    }
  } else {
    res.sendStatus(400); // Faltan parámetros
  }
});

// Ruta para recibir mensajes (POST)
app.post("/", (req, res) => {
  console.log("📩 Evento recibido:", JSON.stringify(req.body, null, 2));

  // Responde 200 para que Meta sepa que recibiste el evento
  res.sendStatus(200);
});

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
