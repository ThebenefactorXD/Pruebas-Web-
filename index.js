const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHoroscope() {
  try {
    const url = 'https://listindiario.com/la-vida/horoscopo/20250822/aries_871249.html'; // reemplaza con la URL real
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const resultado = $('.horoscopo-dia').text().trim(); // ajusta el selector
    console.log(`[${new Date().toISOString()}] Horóscopo: ${resultado}`);
  } catch (error) {
    console.error('Error al hacer scraping:', error.message);
  }
}

scrapeHoroscope();
