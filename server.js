const express = require('express');
const obtenerHoroscopo = require('./scraper');
const cron = require('node-cron');
const app = express();

let horoscopoCache = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { horoscopo: horoscopoCache });
});

// Ejecutar scraping al iniciar
(async () => {
  horoscopoCache = await obtenerHoroscopo();
})();

// Ejecutar scraping cada día a las 7:00 AM
cron.schedule('0 7 * * *', async () => {
  console.log('Actualizando horóscopo...');
  horoscopoCache = await obtenerHoroscopo();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
