import { join, resolve } from 'path';
import npmRun from 'npm-run';
import pMap from 'p-map';
import logUpdate from 'log-update';
import emoji from 'node-emoji';

import paths from 'paths';
import copyFiles from 'utils/copy-files';

const babelEnvs = ['cjs', 'esm', 'es', 'umd'];
// const root = fs.realpathSync(process.cwd());
const buildRoot = 'cjs';

const mapper = async env =>
  new Promise((resolve, reject) => {
    const outDir = env === buildRoot ? '' : env;

    const command = `cross-env NODE_ENV=production babel --config-file ${join(
      paths.ownPath,
      '/babel.library.js'
    )} ${paths.src} --out-dir ${join(
      paths.build,
      outDir
    )} --ignore **/__tests__`;

    npmRun.exec(
      command,
      {
        cwd: paths.lib
      },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }

        // the *entire* stdout and stderr (buffered)
        if (stdout) {
          console.log(`Env ${env} done`);
        }
        if (stderr) {
          console.log(stderr);
        }
        resolve(env);
      }
    );
  });

(async () => {
  logUpdate(`${emoji.get(':rocket:')}  Start compiling...`);
  await pMap(babelEnvs, mapper);
  await copyFiles();
  logUpdate.done();
})();
