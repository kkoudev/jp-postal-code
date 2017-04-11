# JP Postal code

JP Postal code is JavaScript library for searching addresses from Japan postal code.

Forked from https://github.com/mzp/japan-postal-code

JP Postal code is supported webpack2.
(Japan Postal code is not supported webpack2.)

# Installation

```bash
npm install jp-postal-code
```

# Usage

```javascript
var jpPostalCode = require('jp-postal-code');

jpPostalCode('1000001', function(address) {
  console.log(address.prefecture_id); // => "13"
  console.log(address.prefecture);    // => "東京都"
  console.log(address.city);          // => "千代田区"
  console.log(address.area);          // => "千代田"
  console.log(address.street);        // => ""
});
```

# License

MIT License
