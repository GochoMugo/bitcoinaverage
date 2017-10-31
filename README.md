BitcoinAverage NodeJS Client
============================

> **IMPORTANT DISCLAIMER:** This repo/project is **not** officially (nor unofficially :smile:) supported by
> BitcoinAverage. They do **not** seem to have Github repos for their API clients.
> Just had to apply some small but critical changes to the NodeJS client.
>
> The officially supported package can be found on npm: https://npmjs.com/package/bitcoinaverage

This client enables quick and easy access to our Bitcoin, Ethereum, Litecoin, Ripple and other cryptocurrency exchange rates.


To install the library, you just need to run the following command:


```
#!bash

# from master branch
$ npm install github:GochoMugo/bitcoinaverage

# or better yet, use a tag e.g. v0.0.0
# latest release: https://github.com/GochoMugo/bitcoinaverage/releases/latest
$ npm install github:GochoMugo/bitcoinaverage#v0.0.0
```


Here we provide you 2 examples - the first example shows how to call function which makes a HTTP request to our Restful [API](https://apiv2.bitcoinaverage.com/) and the other example connects to one of our websockets. You just need to enter your publicKey and secretKey and you are ready to run this example.



```
#!node

const ba = require('bitcoinaverage');

var publicKey = 'yourPublicKey';
var secretKey = 'yourSecretKey';

var restClient = ba.restfulClient(publicKey, secretKey);
var wsClient = ba.websocketClient(publicKey, secretKey);


// Here we log the response received by https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD. For custom usage you just need to implement the Anonimous function and do something else instead of console.log(response);.
restClient.tickerGlobalPerSymbol('BTCUSD', function(error, response) {
    console.log(error, response);
});


// Here we show an example how to connect to one of our websockets and get periodical update for the Global Price Index for 'BTCUSD'. You can use 'local' instead of 'global', or you can change the crypto-fiat pair to something else (example: ETHEUR), depending on your needs.
wsClient.connectToTickerWebsocket('global', 'BTCUSD', function(error, response) {
    console.log(error, response);
});
```
