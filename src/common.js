// emsdk-npm - common.js
// Copyright 2019 Brion Vibber
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

const path = require('path');
const os = require('os');
const child_process = require('child_process');

function base() {
    const srcdir = path.dirname(module.filename);
    const basedir = path.dirname(srcdir);
    return basedir;
}

function run(command, args, opts) {
    opts = opts || {};
    if (opts.logCmd) {
        console.log('+', command, args.join(' '));
    }
    const result = child_process.spawnSync(command, args, opts);
    if (result.error) {
        throw result.error;
    }
    return result;
}

function run_local(subdir, cmd, args, opts) {
    const dir = path.join(base(), subdir);
    const suffix = (os.type() == 'Windows_NT') ? '.bat' : '';
    const target = path.join(dir, cmd + suffix);
    return run(target, args, opts);
}

module.exports = {base, run, run_local};
