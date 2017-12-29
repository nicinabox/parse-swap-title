# swap-parser

Parses strings like this:

```
[US-MI] [H] Paypal [W] KUL ES-87
```

to this:

```json
{
  "zone": "US",
  "region": "MI",
  "have": "Paypal",
  "type": "buying",
  "want": "KUL ES-87"
}
```

## Usage

```javascript
import parse from 'swap-parser'

const result = parse('[US-MI] [H] Paypal [W] KUL ES-87')
```
