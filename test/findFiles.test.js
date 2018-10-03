import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import FindFiles from '../dist/index';


const testFolder = path.join(__dirname, 'files');

const files = [
    'file1.js',
    'file2.js',
    'file3.ts',
    'dir1/file1.js',
    'dir1/file2.js',
    'dir1/file3.ts',
    'dir2/file1.js',
    'dir2/file2.js',
    'dir2/file3.ts',
    'dir3/dir4/file1.js',
    'dir3/dir4/file2.js',
    'dir3/dir4/file3.ts',
    'dir5/dir6/dir7/file1.js',
    'dir5/dir6/dir7/file2.js',
    'dir5/dir6/dir7/file3.ts',
];

describe('#functionality FindFiles', () => {
    before(() => {
        function createDir(folder) {
            const exists = fs.existsSync(folder);
            if (!exists) fs.mkdirSync(folder);
        }

        createDir(testFolder);

        files.forEach(f => {
            for (let i = 1; i < f.split('/').length; i++) createDir(path.join(testFolder, f.split('/').slice(0, i).join(path.sep)));
            fs.writeFileSync(path.join(testFolder, f.split('/').join(path.sep)), '');
        });
    });

    it('should find all the files matching the given regex', async () => {
        const pattern = /\.js$/;
        const result = await FindFiles(testFolder, pattern);
        expect(result.length).to.be.eql(2);

        result.forEach(r => expect(r.dir).to.be.eql(testFolder));
        result.forEach(r => expect(pattern.test(r.file)).to.be.true);
    });

    it('should find all the files matching the given pattern string', async () => {
        const pattern = '\.js$';
        const result = await FindFiles(testFolder, pattern);
        expect(result.length).to.be.eql(2);

        result.forEach(r => expect(r.dir).to.be.eql(testFolder));
        result.forEach(r => expect(new RegExp(pattern).test(r.file)).to.be.true);
    });

    it('should search files only till the given depth', async () => {
        const pattern = /\.ts$/;
        const result = await FindFiles(testFolder, pattern, 2);
        expect(result.length).to.be.eql(4);
    });

    it('should not perform any search if the given depth = -1', async () => {
        const pattern = /\.js$/;
        const result = await FindFiles(testFolder, pattern, -1);
        expect(result.length).to.be.eql(0);
    });
});
