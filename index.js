module.exports = (params, key, signature = false, free = false) => {
    if (!params || !key || typeof params !== 'object') {
        throw new Error('Missing params and secret key');
    }
    params = JSON.parse(JSON.stringify(params));
    params.ik_am = parseFloat(params.ik_am).toString();
    Object.keys(params).forEach(function (p) {
        if (!/^ik_/i.test(p)) {
            delete params[p];
        }
    });
    let result = {};
    if (signature) {
        let params_arr = [];
        delete params.ik_sign;
        Object.keys(params).sort().forEach(function (p) {
            params_arr.push(params[p]);
        });
        params_arr.push(key);
        let params_str = params_arr.join(':');

        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            params.ik_sign = Buffer.from(
                require('crypto')
                    .createHash('md5')
                    .update(params_str)
                    .digest('binary'),
                'binary')
                .toString('base64');
        } else {
            params.ik_sign = new Buffer(params_str, 'binary')
                .toString('base64');
        }
        result.signature = params.ik_sign;
    }

    let url = free ? 'https://www.free-kassa.ru/merchant/cash.php?' : 'https://sci.interkassa.com/?';
    Object.keys(params).forEach(function (p) {
        url += p + '=' + encodeURIComponent(params[p]) + '&';
    });

    result.url = url;

    return result;
};