// Basically took this from https://gist.github.com/csanz/1181250
var crypto = require('crypto');

var encrypt = module.exports.encrypt = function(plaintext, password) {
    var cipher = crypto.createCipher('aes-256-cbc', password)
    var crypted = cipher.update(plaintext,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
};

var decrypt = module.exports.decrypt = function(crypted, password) {
    var decipher = crypto.createDecipher('aes-256-cbc',password)
    var dec = decipher.update(crypted,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
};
