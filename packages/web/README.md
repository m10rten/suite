# Web package

Web package with pre-configured fetch for HTTP API requests.

## Installation

```bash
npm install @mvdlei/web
```

## Usage

```javascript
import { api } from "@mvdlei/web";

api.get("https://api.example.com/data").then((response) => console.log(response));
```

### With body

```javascript
api("https://api.example.com/data", {
  method: "POST",
  body: { example: "example" },
}).then((data) => console.log(data));
```

### Can throw:

```javascript
try {
  const data = await api("https://api.example.com/data", {
    method: "POST",
    body: { example: "example" },
  });
} catch (error) {
  if (HttpError.is(error)) {
    // handle http error
    error.response;
  }
}
```

## License

MIT
