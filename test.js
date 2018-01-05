var findFiles = require('./index');


findFiles(__dirname, "in.*", function(err, files){
  console.log('no recursion:', err, files);
 })

findFiles(__dirname, 'in.*', true, function(err, files) {
  console.log('recursive file search without depth:', err, files);
})

findFiles(__dirname, 'in.*', true, 2, function(err, files) {
  console.log('recursive file search with depth:', err, files);
})

findFiles.byRegex(__dirname, /^in.*$/, true, 2, function(err, files) {
  console.log('recursive file search with depth, by regex:', err, files);
})