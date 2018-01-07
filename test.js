let {
      expect,
      should
} = require('chai')
should = should()

let findFiles = require('./index')

let path = require('path')
let fs = require('fs')
let rimraf = require('rimraf')

let async = require('async')

describe('File-Regex Search Test', () => {
  let testFolder = path.resolve('testFolder') + '/'

  before(done => {
    let cwd = testFolder

    if (!fs.existsSync(cwd)) {
      fs.mkdirSync(cwd)
    }

    let files = [
      'test1.txt',
      'test2.txt',
      'asdf.js',
      'asdf.ts',
      'asdf.something',
      'dir1/test.js',
      'dir1/asdf.js',
      'dir2/asdf.js',
      'dir2/dir3/asdf.js',
      'dir2/dir3/dir4/asdf.js'
    ]

    async.eachSeries(files, (file, cb) => {
      let dir = ''
      if (file.indexOf('/') > -1) dir = cwd + file.slice(0, file.lastIndexOf('/'))

      if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir)

      fs.open(cwd + file, 'w', cb)
    }, done)
  })

  after(done => {
    rimraf(testFolder, done)
  })

  it("should throw Error if 'pattern' is not a string or an instance of Regex", () => {
    (function () {
      findFiles('./', 1, () => {})
    }).should.throw("Expecting 'pattern' to be either a string or an instance of RegExp")
  })

  it('should throw if the given depth is 0', () => {
    (function () {
      findFiles('./', 'asdf*', true, 0, () => {})
    }).should.throw("If 'depth' is 0, then it means that No Search will be processed")
  })

  it('should use recursive=false & depth=1 as default', done => {
    findFiles(testFolder, 'test.*', (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(2)
      files.forEach(fd => {
        expect(fd.dir).to.be.eql(testFolder)
        expect(fd.file).to.match(/test.*/)
      })

      done()
    })
  })

  it('should find only the matching files in the given directory and not recursively if the depth is 1', done => {
    findFiles(testFolder, 'test.*', true, 1, (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(2)
      files.forEach(fd => {
        expect(fd.dir).to.be.eql(testFolder)
        expect(fd.file).to.match(/test.*/)
      })

      done()
    })
  })

  it('should use default depth as 1 if recursively is false', done => {
    findFiles(testFolder, 'test.*', false, (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(2)
      files.forEach(fd => {
        expect(fd.dir).to.be.eql(testFolder)
        expect(fd.file).to.match(/test.*/)
      })

      done()
    })
  })

  it('should find only the matching files till the given depth', done => {
    findFiles(testFolder, 'asdf.*', true, 2, (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(5)
      files.forEach(fd => {
        expect(fd.file).to.match(/asdf.*/)
      })

      done()
    })
  })

  it('should accept pattern as an instance of RegExp as well', done => {
    findFiles(testFolder, /^asdf.*/, true, 2, (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(5)
      files.forEach(fd => {
        expect(fd.file).to.match(/asdf.*/)
      })

      done()
    })
  })

  it('should automatically exit when the folders are not found for the given dept', done => {
    findFiles(testFolder, /\.js$/, true, 100, (err, files) => {
      expect(err).to.not.exist
      expect(files).to.be.an('array')
      expect(files.length).to.be.eql(6)
      files.forEach(fd => {
        expect(fd.file).to.match(/\.js$/)
      })

      done()
    })
  })
})
