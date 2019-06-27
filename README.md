# Generate URL for payment in Interkassa/Free-kassa.

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

console.log(interkassa({
    "ik_am": "99",
    "ik_cur": "USD",
    "ik_pm_no": "ID_234",
    "ik_desc": "Subscription",
    "ik_co_id": "132536",
}, 'secret_word', true, true));
/* =>
{
    "signature": "a1rfzPKzJ5AixEnrVaUqBQ==",
    "url": "https://www.free-kassa.ru/merchant/cash.php?
        ik_am=99&
        ik_cur=USD&
        ik_pm_no=ID_234&
        ik_desc=Subscription&
        ik_co_id=132536&
        ik_sign=a1rfzPKzJ5AixEnrVaUqBQ%3D%3D",
}
 */
```

## API

### interkassa(params, key, signature, free)

#### params

Type: `object`

URL parameters.

#### key

Type: `string`

Interkassa secret key.

#### signature

Type: `boolean`

Add signature to URL or not.

#### free

Type: `boolean`

Use free-kassa merchant

## Test

```
npm test
```