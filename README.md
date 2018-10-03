# file-regex [![Build Status](https://travis-ci.org/AkashBabu/file-regex.svg?branch=master)](https://travis-ci.org/AkashBabu/file-regex) [![npm version](https://badge.fury.io/js/file-regex.svg)](https://badge.fury.io/js/file-regex)

Blazing Fast matching file finder for the given regex pattern.  
This library neither loads up the CPU nor does the job sequentially, instead under the hood, it uses [lib-promise-pool](https://github.com/AkashBabu/lib-promise-pool) with concurrency = 10(default). Hence 10 directories are searched concurrently.

Please visit this [wiki](https://github.com/AkashBabu/file-regex/wiki/Docs-V2.x) for V2.x Docs

## Installation

> npm install file-regex -S

## Usage

Assume the below folder structure:
```
  - file1.js
  - file2.js
  - file3.ts
  + dir1
    - file4.ts
    - file5.js
  + dir2
    - file6.js
    + dir3
      + dir4
        test1.txt

```
Example:
```javascript
import FindFiles from 'file-regex'

const pattern = ;

const result = await FindFiles(__dirname, /\.js$/);

console.log(result)
// [{dir: __dirname, file: file1.js}, {dir: __dirname, file: file2.js}]

```

## Documentation
**FindFiles(dir, pattern, depth = 0, options = {concurrency: 10})**

| Param | Description |
|:------|:------------|
| `dir` | Base Directory where the search would begin |
| `pattern` | Regex-Pattern for testing the matching files |
| `depth` | Number of recursions into the directories upto which the file search shall proceed. *Defaults to 0* |
| `options` | Options for controlling execution |
| `options.concurrency` | Number of concurrent folder search. *Defaults to 10* |

### Steps of execution
1. Check if the given depth > -1
2. Find all the files in the given directory and test against the given pattern
3. if matched then push the data into the result array and decrement depth(--depth)
4. Repeat steps 1, 2 & 3 untill depth > 0 and then return the results


## Contribution

I know this is very small module, but any improvements or pull request are always welcome.

### Test
> npm test 

## Coverage Report  
> npm run coverage

