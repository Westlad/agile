const { Client } = require('tplink-smarthome-api');

const client = new Client();
// const plug = client.getDevice({ host: '10.0.1.2' }).then((device) => {
//   device.getSysInfo().then(console.log);
//   device.setPowerState(true);
// });

// Look for devices, log to console, and turn them on
client.startDiscovery().on('device-new', (device) => {
  device.getSysInfo().then(console.log);
  device.setPowerState(true);
});
