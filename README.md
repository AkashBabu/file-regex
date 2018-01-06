# file-regex

### Installation

> npm install file-regex -S

### Usage

```
var findFiles = require('file-regex')
var pattern = 'in.*x.js'
findFile(__dirname, 'in.*\.js', function(err, files) {
  console.log(files);
})
Result:
['index.js']

OR

findFiles(__dirname, 'in.*', true, 2, function(err, files) {
  console.log('recursive file search with depth', files);
})
Result:
recursive file search with depth [ { dir: 'C:\\Users\\abu8kor\\Documents\\Other Documents\\Nodejs\\lib\\file-regex\\.git',
    file: 'index' },
  { dir: 'C:\\Users\\abu8kor\\Documents\\Other Documents\\Nodejs\\lib\\file-regex',
    file: 'index.js' },
  { dir: 'C:\\Users\\abu8kor\\Documents\\Other Documents\\Nodejs\\lib\\file-regex\\test-folder',
    file: 'index.js' },
  { dir: 'C:\\Users\\abu8kor\\Documents\\Other Documents\\Nodejs\\lib\\file-regex\\test2',
    file: 'index.js' },
  { dir: 'C:\\Users\\abu8kor\\Documents\\Other Documents\\Nodejs\\lib\\file-regex\\test2',
    file: 'indexx' } ]
```

`findFiles()` takes `pattern` as a string or RegEx and converts it into a RegEx with added ^ and $ boundary markers. If you want to provide
an explicit RegEx object which is used without modification, you can use this variant:

```
var findFiles = require('file-regex').byRegex;

findFile(__dirname, /^in.*\.js$/, function(err, files) {
  console.log(files);
})
Result:
['index.js']

```

### Constructor

**findFiles(path, pattern [, recursive[, depth]], callback)**

*path* - the path in which you want to perform file search
*pattern* - regex pattern to search the files
*recursive* - if true, then a recursive search is performed for the depth mentioned. *default* is false
*depth* - the recursive depth upto which the file shall be searched.
*callback(err, files)* - if recursive is false, then the files array will contain only the string of filenames, else it will contain an array of Objects which would provide information regarding the directory in which the matched file was found.




### Contribution

I know this is very small module, but any improvements or pull request are always welcome.

### License

MIT
