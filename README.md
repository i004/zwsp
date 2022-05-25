# InvisibleData

Store data using zero width spaces! Might be useful for discord bots. 

---
### Usage
Import the library:
```typescript
import { encode, decode} from 'invisible-data'; // typescript

const { encode, decode } = require('invisible-data'); // node.js
```
Encoding:
```typescript
encode("Hello World!");
encode(3.14159265359);
encode(12345678987654321n);
encode([ 123, "Hello", 321, "World" ]);
encode({ a: 123, b: 321, c: "example", d: [ "Hello", "world" ] });
```
Decoding:
```typescript
decode(...);

// will also keep the type:
decode(encode("123")); // "123" (string)
decode(encode(123)); // 123 (number)
decode(encode([1, 2, 3])); // [1, 2, 3] (object)
```
---
### Why?
tbh, I don't really know. This might be useful for discord bots that don't use any database but still need to store certain information (for example, bots hosted on heroku).

*That was just a random idea that came to my mind at 3 am lol.*

![](https://i.imgur.com/YN3gjdM.png)

It works because the characters this library uses are actually a zero-width spaces and they appear to be invisible. Users still can access the info you stored, but a regular user won't notice anything.

---
### Other examples

Visit [examples](examples) directory for other examples (with discord.js)