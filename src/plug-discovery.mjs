import tplink from 'tplink-smarthome-api';
import logger from './utils/logger.mjs';

const { Client } = tplink;

const getPlugs = new Promise((resolve, reject) => {
  const client = new Client();
  const plugs = [];
  client.startDiscovery();
  // Search for all plugs and turn them on
  client.on('plug-new', async (plug) => {
    logger.info(`Found plug ${plug.alias}`);
    plugs.push(plug);
    // await plug.setPowerState(true);
    if (plugs.length === 2) {
      client.stopDiscovery();
      resolve(plugs);
    }
  });
  client.on('error', (error) => {
    client.stopDiscovery();
    reject(error);
  });
});
export default getPlugs;
