import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import PromisePool from 'lib-promise-pool';

const fs_readDir = promisify(fs.readdir);
const fs_stat = promisify(fs.stat);

async function search(dir, regex, depth, result = [], concurrency) {
    async function fileAnalyzer(file) {
        const filePath = path.join(dir, file);
        const stat = await fs_stat(filePath);

        // Check if it's a file, if so then
        // check if the pattern contains a global
        // flag, if so then test the pattern
        // on the complete path else just the filename
        if (stat.isFile() && regex.test(regex.global ? filePath : file)) {
            result.push({ dir, file });
        } else if (stat.isDirectory() && depth > 0) {
            await search(filePath, regex, depth - 1, result, concurrency);
        }

        // reset the lastIndex for the regex
        // to run the match from the beginning of the
        // string (filePath)
        regex.lastIndex = 0;
    }

    const folderContents = await fs_readDir(dir);
    return PromisePool(folderContents, fileAnalyzer, concurrency);
}

/**
 * @typedef {Object[]} Result
 * @property {string} dir
 * @property {string} file
 */

/**
 * Searches for files matching the given pattern
 * @param {string} baseDir Base directory
 * @param {RegExp|String} pattern Regexp pattern
 * @param {Number} depth Number of recursions into the directory for file search
 * @param {Object} options
 * @param {number} options.concurrency Number of concurrent folder searches
 *
 * @return {Promise.<Result>}
 */
async function FindFiles(baseDir = path.resolve('../../'), pattern = '.*', depth = 0, options = {}) {
    const { concurrency = 10 } = options;

    const result = [];
    depth > -1 && await search(path.resolve(baseDir), typeof pattern === 'string' ? new RegExp(pattern) : pattern, depth, result, concurrency);
    return result;
}

module.exports = FindFiles;
