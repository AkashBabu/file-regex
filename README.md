# file-regex

### Installation

> npm install file-regex -S

### Usage

```
var findFiles = require('file-regex')
var pattern = 'in.*x.js'
findFile(__dirname, 'in.*\.js', function(err, files) {
  console.log(err, files);
})
```

### Contribution

I know this is very small module, but any improvements or pull request are always welcome.

### License

MIT
