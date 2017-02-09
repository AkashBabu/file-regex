const path = require('path');
const fs = require('fs');


function findFile(cwd, pattern, cb) {
  fs.readdir(cwd, function(err, files){
    if(err) {
      console.log("Error in reading dir");
      cb(err, null);
    } else {
      var regex = new RegExp('^' + pattern + "$");
      cb(null, files.filter(file => regex.test(file)));
    }
  })
};

module.exports = findFile;
