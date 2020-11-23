/**
Timer class for turning on plugs at a certain time
*/
import config from 'config';
import getPlugs from '../plug-discovery.mjs';
import logger from '../utils/logger.mjs';

class PlugTimer {
  constructor(rate) {
    const timeToWait = new Date(rate.valid_from) - new Date(Date.now());
    if (timeToWait < 0) throw new Error('Cannot set a negative plug timer');
    this.rate = rate;
    this.p = new Promise(
      resolve => setTimeout(resolve, timeToWait),
    );
  }

  async set() {
    await this.p; // wait until price is negative
    const plugs = await getPlugs(); // get a list of available plugs
    logger.info('turning plugs on');
    plugs.forEach(plug => plug.setPowerState(true)); // turn them on
    await new Promise(
      resolve => setTimeout(
        resolve, new Date(this.rate.valid_to) - new Date(this.rate.valid_from) - config.STOP_EARLY,
      ),
    ); // wait until turn-off time
    logger.info('turning plugs off');
    plugs.forEach(plug => plug.setPowerState(false)); // turn them on
  }
}

export default PlugTimer;
