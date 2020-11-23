module.exports = {
  BASE_URL: 'https://api.octopus.energy',
  PRODUCT_CODE: 'AGILE-18-02-21',
  get TARIFF_CODE() { return `E-1R-${this.PRODUCT_CODE}-J`; },
  get TARIFF_URL() {
    return `${this.BASE_URL}/v1/products/${this.PRODUCT_CODE}/electricity-tariffs/${this.TARIFF_CODE}`;
  },
  LOG_LEVEL: 'debug',
  ON_PRICE: 0, // price at which to switch on
  STOP_EARLY: 30000, // allows a gap (in ms) between plug turning off and then on again
};
