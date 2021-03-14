module.exports = (params, key, signature = false) => {
    if (!params || !key || typeof params !== 'object') {
        throw new Error('Missing params and secret key');
    }

    let result = {},
        params_arr = [],
        url = 'https://sci.interkassa.com/?';

    params = JSON.parse(JSON.stringify(params));
    
    Object.keys(params).forEach(function (p) {
        if (!/^ik_/i.test(p) || p === 'ik_sign') {
            delete params[p];
        }
    });

    Object.keys(params).sort().forEach(function (p) {
        params_arr.push(params[p]);
    });
    params_arr.push(key);
    let params_str = params_arr.join(':');

    if (Buffer.from && Buffer.from !== Uint8Array.from) {
        result.signature = Buffer.from(
            require('crypto')
                .createHash('md5')
                .update(params_str)
                .digest('binary'),
            'binary')
            .toString('base64');
    } else {
        result.signature = new Buffer(params_str, 'binary')
            .toString('base64');
    }

    if (signature) {
        params.ik_sign = result.signature;
    }
    
    params.ik_am = parseFloat(params.ik_am).toString();

    Object.keys(params).forEach(function (p) {
        url += p + '=' + encodeURIComponent(params[p]) + '&';
    });

    result.url = url;

    return result;
};
