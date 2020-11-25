/**
Timer class for turning on plugs at a certain time
*/
import config from 'config';
import getPlugs from '../plug-discovery.mjs';
import logger from '../utils/logger.mjs';

class PlugTimer {
  constructor(rate) {
    this.rate = rate;
    logger.info(`Created new plug timer for ${rate.valid_from}`);
  }

  async set() {
    const timeToWait = new Date(this.rate.valid_from) - new Date(Date.now());
    logger.debug(`setting plug timer with time to wait ${Math.floor(timeToWait / 60000)} minutes`);
    if (timeToWait < 0) throw new Error('Cannot set a negative plug timer');
    await new Promise(
      resolve => setTimeout(resolve, timeToWait),
    );
    const plugs = await getPlugs; // get a list of available plugs
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
