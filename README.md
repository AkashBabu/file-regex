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

1. Example (file-name regex match):
```JS
import FindFiles from 'file-regex'

const result = await FindFiles(__dirname, /\.js$/);

console.log(result)
// [{dir: __dirname, file: file1.js}, {dir: __dirname, file: file2.js}]

```

2. Example (file-path + file-name regex match)
If you want to match the absolute path for the files against the regex, then  specify global flag (for ex: `/\dir3.*\.js$/g`):

```JS
import FindFiles from 'file-regex'

const result = await FindFiles(__dirname, /\/dir1\/.*?\.js$/g, 5);

console.log(result)
// [{dir: __dirname, file: file5.js}]

```
The above example doesn't match the files in other directories except `dir1`

## Documentation
**FindFiles(dir, pattern, depth = 0, options = {concurrency: 10})**

| Param | Description |
|:------|:------------|
| `dir` | Base Directory where the search would begin |
| `pattern` | Regex-Pattern for testing the matching files. If a global regex (for ex: `/\/dir3/g`) is used, then the entire path will be checked for a match |
| `depth` | Number of recursions into the directories upto which the file search shall proceed. *Defaults to 0* |
| `options` | Options for controlling execution |
| `options.concurrency` | Number of concurrent folder search. *Defaults to 10* |

## Contribution

I know this is very small module, but any improvements or pull request are always welcome.

## Thanks to the contributors:

<a href="https://github.com/roylaurie">
  <img src="https://avatars3.githubusercontent.com/u/281087?s=400&v=4" alt="Roy Laurie" width="100" height="100" title="Roy Laurie">
</a>

