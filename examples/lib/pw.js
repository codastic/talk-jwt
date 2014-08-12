var crypto = require('crypto');

var hash = module.exports.hash = function(password, salt) {
    if(typeof salt === 'undefined') {
        try{
            salt = crypto.randomBytes(32).toString('hex');
        } catch (error) {
            salt = crypto.createHash('sha256')
                .update(Math.round((new Date().valueOf() * Math.random())) + '')
                .digest('hex');
        }
    }
    return salt + crypto.createHmac('sha256', salt).update(password).digest('hex');
};

var validate = module.exports.validate = function(hashed, password) {
    if(!password) return false;
    if(hashed === null) return false;
    var salt = hashed.substring(0, 64);
    if(hashed === hash(password, salt)) return true;
    return false;
};
