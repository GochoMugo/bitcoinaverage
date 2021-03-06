'use strict';

const crypto = require('crypto-js');
const request = require('request');

module.exports = {
    getSignature: getSignature,
    getResourceForFullUrl: getResourceForFullUrl
};

function getSignature(publicKey, secretKey) {
    var timestamp = Math.floor(Date.now() / 1000);
    var payload = timestamp + '.' + publicKey;
    var hash = crypto.HmacSHA256(payload, secretKey);
    var hex_hash = crypto.enc.Hex.stringify(hash);
    return payload + "." + hex_hash;
}

function getResourceForFullUrl(url, publicKey, secretKey, handleResponseFunction) {
    var signature = getSignature(publicKey, secretKey);
    var options = {
        url: url,
        headers: {
            'X-Signature': signature
        },
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            return handleResponseFunction(error);
        }
        if (response.statusCode !== 200) {
            return handleResponseFunction(response);
        }
        return handleResponseFunction(null, body);
    });
}
