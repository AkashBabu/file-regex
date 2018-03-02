# file-regex [![Build Status](https://travis-ci.org/AkashBabu/file-regex.svg?branch=master)](https://travis-ci.org/AkashBabu/file-regex) [![npm version](https://badge.fury.io/js/file-regex.svg)](https://badge.fury.io/js/file-regex)

* New in current version, you could either pass a string or an instance of RegExp for `pattern`

## Installation

> npm install file-regex -S

## Usage

Assume the below folder structure:
```
  - test1.txt
  - test2.js
  - test3.ts
  + dir1
    - test1.txt
    - test2.js
  + dir2
    - test1.js
    + dir3
      + dir4
        test1.txt

```


```javascript
  let findFiles = require('file-regex')
  let pattern = 'test.*\.t.*' // Can also be /^test.*\.t.*/


  findFiles(__dirname, pattern, (err, files) => {  
    console.log(files);
  })
  
  ///=> Output
  [{
    dir: CURR_DIR,
    file: "test1.txt"
  }, {
    dir: CURR_DIR,
    file: "test1.ts"
  }]

  OR

  findFiles(__dirname, pattern, true, 2, function(err, files) {
    console.log(files);
  })
  ///=> Output
  [{
    dir: 'CURR_DIR',
    file: "test1.txt"
  }, {
    dir: 'CURR_DIR',
    file: "test1.ts"
  }, { 
    dir: 'CURR_DIR/dir1',
    file: 'test1.txt' 
  }]

```

## Constructor

### **findFiles(path, pattern ,recursive = false, depth = 1, callback)**

**path** *string* - the path in which you want to perform file search  
**pattern** *string|RegExp* - regex pattern to search the files  
**recursive** *boolean* - if true, then a recursive search is performed for the depth mentioned. *default* is false  
**depth** *number* - the recursive depth upto which the file shall be searched.  
**callback(err, files)** *Function* - if recursive is false, then the files array will contain only the string of filenames, else it will contain an array of Objects which would provide information regarding the directory in which the matched file was found.

## Contribution

I know this is very small module, but any improvements or pull request are always welcome.
Please make sure to follow JS-Standard-Code style  

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

### Test
> npm test  

Testing in watch mode while development  
> npm run test-watch  

Report generation  
> npm run report  

## License

MIT

## Contributors

<table>
  <tbody align="center">
    <tr align="center">
      <td align="center">
        <a href="https://github.com/navbruce">
          <img width="150" height="150" src="https://github.com/navbruce.png?v=3&s=150">
          </br>
          Navbruce
        </a>
      </td>
    </tr>
  <tbody>
</table>

