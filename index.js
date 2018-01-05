const path = require('path');
const fs = require('fs');


function recursiveSearch(cwd, regex, depth) {
    if ( depth-- > 0) {
        var matchingFiles = [];
        var files = fs.readdirSync(cwd)
        files.forEach(file => {
            var fsStat = fs.statSync(path.join(cwd, file));
            if (fsStat.isFile() && regex.test(file)) {
                matchingFiles.push({
                    dir: cwd,
                    file: file
                })
            } else if (fsStat.isDirectory()) {
                matchingFiles = matchingFiles.concat(recursiveSearch(path.join(cwd, file), regex, depth));
            }
        })

        return matchingFiles;
    } else {
        return [];
    }
}

function findFileByRegex(cwd, regex, recursive, depth, cb) {

    if (recursive.constructor == Function) {
        cb = recursive;
        recursive = false;
        depth = 100;
    } else if (depth.constructor == Function) {
        cb = depth;
        depth = 100;
    }

    if (recursive) {
        cb(null, recursiveSearch(cwd, regex, depth));

    } else {
        fs.readdir(cwd, function(err, files) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, files.filter(file => regex.test(file)));
            }
        })
    }
}

function findFile(cwd, pattern, recursive, depth, cb) {

    var regex = new RegExp('^' + pattern + "$");

    findFileByRegex(cwd, regex, recursive, depth, cb);
}

findFile.byRegex = findFileByRegex;

module.exports = findFile;
