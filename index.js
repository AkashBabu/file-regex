const path = require('path')
const fs = require('fs')
const async = require('async')

function recursiveSearch (cwd, regex, depth, cb) {
  let matchingFiles = []

  let dirs = [cwd]

  let completed = false

  function search (_dirs, regex, cb) {
    if (_dirs.length === 0) {
      completed = true
      return cb()
    }

    // Reinitialize the directories at this Depth level
    dirs = []

    function dirIterator (dir, cb) {
      fs.readdir(dir, (err, _files) => {
        if (err) return cb(err)

        function fileIterator (file, cb) {
          fs.stat(path.join(dir, file), (err, stat) => {
            if (err) return cb(err)

            if (stat.isFile() && regex.test(file)) {
              matchingFiles.push({
                dir,
                file
              })
            } else if (stat.isDirectory()) {
              dirs.push(path.join(dir, file))
            }

            cb()
          })
        }

        async.eachSeries(_files, fileIterator, cb)
      })
    }

    async.eachSeries(_dirs, dirIterator, cb)
  }

  async.whilst(() => ((depth-- > 0) && !completed), (cb) => search(dirs.slice(), regex, cb), (err) => {
    cb(err, matchingFiles)
  })
}

/**
 * @callback requestCallback
 * @param {Error} err
 * @param {string[]} matchingFiles
 */

/**
 * Finds all the files matching the given pattern
 * @param {string} cwd - Base Path for File Search
 * @param {string|RegExp} pattern - File Search pattern in either String or RegExp format
 * @param {boolean} [recursive=false] - true for Recursive Search
 * @param {number} [depth=100] - Max Depth to be searched recursively
 * @param {requestCallback} cb - Callback (err, files)
 */
function findFiles (cwd, pattern, recursive, depth, cb) {
  let regex

    // Restricting pattern to be either RegExp or string (Composable to RegExp)
  if (!(pattern instanceof RegExp)) {
    if (typeof pattern === 'string') {
      regex = new RegExp('^' + pattern + '$')
    } else {
      throw new Error("Expecting 'pattern' to be either a string or an instance of RegExp")
    }
  } else {
    regex = pattern
  }

    // Parsing Arguments
  if (typeof recursive === 'function') {
    cb = recursive
    recursive = false
    depth = 1
  } else if (typeof depth === 'function') {
    cb = depth
    depth = 100
  }

  if (depth === 0) {
    throw new Error("If 'depth' is 0, then it means that No Search will be processed")
  }

    // Default dept = 1, when recursive is false, so that only the root dir is searched
  if (!recursive) {
    depth = 1
  }

  recursiveSearch(cwd, regex, depth, cb)
}

module.exports = findFiles
