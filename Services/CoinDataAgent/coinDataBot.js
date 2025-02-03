const axios = require('axios');

const apiUrl = 'https://api.coinlore.net/api/tickers/';

async function fetchCryptoData() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    data.data.forEach((coin) => {
      console.log('--- Coin Data ---');
      for (const [key, value] of Object.entries(coin)) {
        console.log(`${key}: ${value}`);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchCryptoData();
