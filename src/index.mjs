import { getRates, setPlugTimers } from './tarrif.mjs';
import logger from './utils/logger.mjs';

async function main() {
  const rates = await getRates();
  if (rates) {
    logger.info(`Found these rates below the price threshold: ${JSON.stringify(rates, null, 2)}`);
    setPlugTimers(rates);
  } else {
    logger.info('No rates below the price threshold were found today');
  }
}

main();
