import config from 'config';
import axios from 'axios';
import PlugTimer from './classes/PlugTimer.mjs';
import logger from './utils/logger.mjs';

const { ON_PRICE, TARIFF_URL } = config;

export async function getRates() {
  const res = await axios.get(`${TARIFF_URL}/standard-unit-rates`);
  const { results: rates } = res.data;
  // filter today's rates to remove ones in the past and ones above threshold
  const filteredRates = [];
  rates.forEach(rate => {
    const timeToWait = new Date(rate.valid_from) - new Date(Date.now());
    if (timeToWait > 0 && rate.value_inc_vat < ON_PRICE) filteredRates.push(rate);
  });
  return filteredRates;
}

export async function setPlugTimers(rates) {
  for (const rate of rates) {
    try {
      logger.silly(`setting plug timer for ${rate.valid_from}`);
      const plugTimer = new PlugTimer(rate);
      plugTimer.set();
    } catch (err) {
      logger.info('Could not set plug timer');
    }
  }
}
