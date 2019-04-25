module.exports = (params, key, signature = false) => {
    if (!params || !key || typeof params !== 'object') {
        throw new Error("Missing params and secret key");
    }
    let result = {};
    if (signature) {
        let params_arr = [];
        Object.keys(params).sort().forEach(function (key) {
            params_arr.push(params[key]);
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

    let url = 'https://sci.interkassa.com/?';
    Object.keys(params).forEach(function (key) {
        url += key + '=' + encodeURIComponent(params[key]) + '&';
    });

    result.url = url;

    return result;
};