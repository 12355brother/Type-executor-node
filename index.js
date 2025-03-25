require('dotenv').config();
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET
});

binance.balance((error, balances) => {
  if (error) return console.error("Error fetching balances:", error.body);
  console.log("Balance fetched:", balances);
});
