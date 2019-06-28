# Generate URL for payment in Interkassa.

## Installation

```
npm i interkassa-node
```

## Usage

```javascript
const interkassa = require('interkassa-node');

console.log(interkassa({
    "ik_am": "99",
    "ik_cur": "USD",
    "ik_pm_no": "ID_234",
    "ik_desc": "Subscription",
    "ik_co_id": "5cc1ee513d1eaf94728b4567",
}, 'vwi5pRmkRtH49uyp', true));
/* =>
{
    "signature": "biFyHlpFwbM4wWUoToZ4Ew==",
    "url": "https://sci.interkassa.com/?
        ik_am=99&
        ik_cur=USD&
        ik_pm_no=ID_234&
        ik_desc=Subscription&
        ik_co_id=5cc1ee513d1eaf94728b4567&
        ik_sign=biFyHlpFwbM4wWUoToZ4Ew%3D%3D",
}
 */
```

## API

### interkassa(params, key, signature)

#### params

Type: `object`

URL parameters.

#### key

Type: `string`

Interkassa secret key.

#### signature

Type: `boolean`

Add signature to URL or not.

## Test

```
npm test
```