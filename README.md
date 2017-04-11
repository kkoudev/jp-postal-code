# JP Postal code

JP Postal code is JavaScript library for searching addresses from Japan postal code.

Forked from https://github.com/mzp/japan-postal-code

# Installation

```bash
npm install jp-postal-code
```

# Usage

```javascript
var postalCode = require('jp-postal-code');

postalCode('1000001', function(address) {
  console.log(address.prefecture); // => "東京都"
  console.log(address.city); // => "千代田区"
  console.log(address.area); // => "千代田"
  console.log(address.street); // => ""
});
```

# License

MIT License
