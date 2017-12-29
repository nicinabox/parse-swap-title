# parse-swap-title

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
import parseTitle from 'parse-swap-title'

const result = parseTitle('[US-MI] [H] Paypal [W] KUL ES-87')
```
