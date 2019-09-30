import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import PromisePool from 'lib-promise-pool';

const fs_readDir = promisify(fs.readdir);
const fs_stat = promisify(fs.stat);

async function search(dir, regex, depth, result = [], concurrency) {
    async function fileAnalyzer(file) {
        const statPath = path.join(dir, file);
        const stat = await fs_stat(statPath);

        if (!regex.global) {
            if (stat.isFile() && regex.test(file)) {
                result.push({ dir, file });
            }
        } else if (regex.test(statPath)) { // scan the entire path for the regex if the pattern uses a //g
            result.push({ dir, file });
            regex.lastIndex = 0; // reset the last index for global searches
        }

        if (stat.isDirectory() && depth > 0) {
            await search(statPath, regex, depth - 1, result, concurrency);
        }
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
    depth > -1 && await search(baseDir, typeof pattern === 'string' ? new RegExp(pattern) : pattern, depth, result, concurrency);
    return result;
}

module.exports = FindFiles;
