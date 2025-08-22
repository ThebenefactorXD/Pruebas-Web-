const axios = require('axios');
const cheerio = require('cheerio');

async function obtenerHoroscopo() {
  const fecha = new Date();
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  const url = `https://listindiario.com/horoscopo/${yyyy}${mm}${dd}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const signos = [];

    $('.horoscopo-item').each((i, el) => {
      const signo = $(el).find('h3').text().trim();
      const texto = $(el).find('p').text().trim();
      signos.push({ signo, texto });
    });

    return signos;
  } catch (error) {
    console.error('Error al obtener el horóscopo:', error.message);
    return [];
  }
}

module.exports = obtenerHoroscopo;
