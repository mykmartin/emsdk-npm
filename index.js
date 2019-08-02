'use strict';

const path = require('path');
const fs = require('fs');
const common = require('./src/common.js');

const gitDir = path.join(common.base(), 'emsdk');

function emscriptenInstalled() {
  for (const installDir of ['releases', 'fastcomp', 'node']) {
    if (!fs.existsSync(path.join(gitDir, installDir))) {
      return false;
    }
  }
  return true;
}

function install() {
  const opts = {stdio: 'inherit'};

  if (!fs.existsSync(gitDir)) {
    console.log('\n-- Installing emsdk --');
    common.run('git', ['clone', 'https://github.com/emscripten-core/emsdk.git', gitDir], opts);
  }

  if (!emscriptenInstalled()) {
    console.log('\n-- Installing emscripten --');
    common.run_local('emsdk', 'emsdk', ['--embedded', 'install', 'latest'], opts);
  }

  if (!fs.existsSync(path.join(gitDir, '.emscripten'))) {
    console.log('\n-- Activating emscripten --');
    common.run_local('emsdk', 'emsdk', ['--embedded', 'activate', 'latest'], opts);
  }
}

function run(cmd, args, opts) {
  args.unshift(cmd);
  const result = common.run_local('bin', 'emsdk-run', args, opts);
  if (result.stdout) {
    result.stdout = result.stdout.toString();
  }
  if (result.stderr) {
    result.stderr = result.stderr.toString();
  }
  return result;
}

exports.install = install;
exports.run = run;
