# Agile

This is a simple program that reads Octopus Agile data and turns on tp-link Kasa smart plugs when the electricity price is negative.  It will exit once it has run out of Agile data.  I just hacked this quickly for my own use so it's not consumer-grade code; you'll probably need a bit of Nodejs knowledge to make it do what you want.  That said, it's very short and simple.

The easiest way to use it is to set up a Cron job to run it between 22:30 and 23:00 every day.  That way it will pick up the next day's data after it has just finished with today.  Don't forget to set the PATH in your crontab to point to your instance of Nodejs: the standard Cron PATH may not include it.

To run the code, make sure you have Node, then clone this repo. Do `npm i`and, from the local repository root, run `node src/index.mjs`.

The program will find and operate _all_ of your Kasa smart plugs.  If you don't want that then filter the list of plugs it discovers (e.g. plug.alias will return the 'name' of the plug). Change the code in plug-discovery.mjs.

Finally, note that the Agile tariff code (see the config) is area-dependent.  The letter `E` indicates that this code is for the South-East region.  If you live elsewhere, you'll need to change to your area code or the prices will be wrong. The codes are listed [here](https://www.energy-stats.uk/dno-region-codes-explained/).
