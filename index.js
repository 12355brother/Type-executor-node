const axios = require('axios');
const crypto = require('crypto');

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;
const BASE_URL = 'https://api.binance.com';

const headers = {
  'X-MBX-APIKEY': API_KEY,
};

// Layer 1: Precision Grid Lock
function precisionGridLock(symbol, price) {
  const precision = price % 1 === 0 ? 2 : price.toString().split('.')[1].length;
  const lockedGrid = `${symbol}_${precision}P`;
  console.log(`[LOCKED GRID] ${lockedGrid}`);
  return lockedGrid;
}

async function executeSniper() {
  const symbol = 'PIUSDT'; // You can change this to any coin
  const quantity = 1;       // Adjust quantity as needed

  try {
    const priceRes = await axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`);
    const price = parseFloat(priceRes.data.price);
    console.log(`[LIVE] Current Price of ${symbol}: ${price}`);

    // Inject Layer 1
    precisionGridLock(symbol, price);

    const orderData = {
      symbol,
      side: 'BUY',
      type: 'MARKET',
      quantity,
      timestamp: Date.now(),
    };

    const query = new URLSearchParams(orderData).toString();
    const signature = crypto
      .createHmac('sha256', API_SECRET)
      .update(query)
      .digest('hex');

    const finalQuery = `${query}&signature=${signature}`;

    const response = await axios.post(
      `${BASE_URL}/api/v3/order?${finalQuery}`,
      null,
      { headers }
    );

    console.log('[EXECUTED] Order placed:', response.data);
  } catch (error) {
    console.error('[ERROR]', error.response?.data || error.message);
  }
}

executeSniper();
// Layer 2: Injection Surge Protocol
function injectionSurge(symbol, level) {
  console.log(`[SURGE] Initiating Injection Surge Protocol at level ${level} for ${symbol}`);
  
  if (level >= 3) {
    console.log(`[SURGE] HIGH level injection detected. Switching to rapid-entry mode for ${symbol}`);
    executeSniper(); // Optional re-execution
  } else {
    console.log(`[SURGE] Moderate injection. Monitoring ${symbol} with pulse-checks.`);
    setTimeout(() => {
      console.log(`[SURGE] Revalidating ${symbol} after cooldown...`);
    }, 3000);
  }
}

injectionSurge('PIUSDT', 3);
// Layer 3: Predictive Entry Pulse
function predictiveEntry(symbol, targetPrice) {
  console.log(`[PULSE] Engaging predictive scan for ${symbol}. Target → $${targetPrice}`);

  axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
    .then(res => {
      const livePrice = parseFloat(res.data.price);
      console.log(`[PULSE] Current Price of ${symbol}: $${livePrice}`);

      if (livePrice <= targetPrice) {
        console.log(`[PULSE] Target reached. Executing sniper on ${symbol}`);
        executeSniper();
      } else {
        console.log(`[PULSE] Price not optimal. Holding.`);
      }
    })
    .catch(err => console.error('[PULSE ERROR]', err.response?.data || err));
}

predictiveEntry('PIUSDT', 3.15); // Set your predicted pulse entry price
// Layer 4: Temporal Shift Directive
function temporalShift(symbol, delayMs) {
  console.log(`[TEMPORAL] Delaying sniper for ${delayMs}ms on ${symbol}`);

  setTimeout(() => {
    console.log(`[TEMPORAL] Time window reached. Executing sniper on ${symbol}`);
    executeSniper();
  }, delayMs);
}

temporalShift('PIUSDT', 5000); // Delay sniper by 5 seconds

// Layer 5: Trigger Zone Analysis Grid
function triggerZoneCheck(symbol, zoneLow, zoneHigh) {
  axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
    .then(res => {
      const price = parseFloat(res.data.price);
      console.log(`[TRIGGER] Current Price of ${symbol}: ${price}`);

      if (price >= zoneLow && price <= zoneHigh) {
        console.log(`[TRIGGER] Price in optimal trigger zone.`);
        executeSniper();
      } else {
        console.log(`[TRIGGER] Price outside optimal zone.`);
      }
    })
    .catch(err => console.error('[TRIGGER ERROR]', err));
}

triggerZoneCheck('PIUSDT', 3.1, 3.25); // Update trigger zone

// Layer 6: Delay Pulse Recheck Logic
function delayedRecheck(symbol, delayMs) {
  console.log(`[DELAY] Waiting ${delayMs}ms before rechecking...`);
  setTimeout(() => {
    axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
      .then(res => {
        const price = parseFloat(res.data.price);
        console.log(`[DELAY] Rechecked Price of ${symbol}: ${price}`);
        executeSniper();
      })
      .catch(err => console.error('[DELAY ERROR]', err));
  }, delayMs);
}

delayedRecheck('PIUSDT', 5000); // Recheck in 5 seconds

// Layer 7: Signal Memory Imprint Engine
let signalHistory = [];

function recordSignal(symbol, price) {
  const timestamp = new Date().toISOString();
  signalHistory.push({ symbol, price, timestamp });
  if (signalHistory.length > 10) signalHistory.shift(); // Keep last 10
  console.log(`[MEMORY] Signal recorded for ${symbol} at ${price}`);
}

recordSignal('PIUSDT', 3.19);

// Layer 8: Dual Condition Signal Validator
function dualValidator(symbol, targetPrice, delayMs) {
  console.log(`[VALIDATOR] Dual-check started for ${symbol}`);
  axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
    .then(res => {
      const initial = parseFloat(res.data.price);
      console.log(`[VALIDATOR] Initial price: ${initial}`);

      setTimeout(() => {
        axios.get(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
          .then(res2 => {
            const later = parseFloat(res2.data.price);
            console.log(`[VALIDATOR] Rechecked price: ${later}`);

            if (initial <= targetPrice && later <= targetPrice) {
              console.log(`[VALIDATOR] Both checks passed.`);
              executeSniper();
            } else {
              console.log(`[VALIDATOR] Signal not validated.`);
            }
          });
      }, delayMs);
    })
    .catch(err => console.error('[VALIDATOR ERROR]', err));
}

dualValidator('PIUSDT', 3.18, 4000); // 4-second recheck delay
