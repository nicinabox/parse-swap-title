# swap-parser

Parses strings like this:

```
[US-MI] [H] Paypal [W] KUL ES-87
```

to this:

```
{
  "zone": "US",
  "region": "MI",
  "have": "Paypal",
  "type": "buying",
  "want": "KUL ES-87"
}
```
