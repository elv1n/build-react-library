import npmRun from 'npm-run';
import pMap from 'p-map';
import logUpdate from 'log-update';
import emoji from 'node-emoji';

import { babelEnvs } from 'consts';
import paths from 'paths';
import copyFiles from 'utils/copy-files';
import getCommand from 'utils/command';

const mapper = async env =>
  new Promise((resolve, reject) => {
    const command = getCommand(env);

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

export default async () => {
  logUpdate(`${emoji.get(':rocket:')}  Start compiling...`);
  await pMap(babelEnvs, mapper);
  await copyFiles();
  logUpdate.done();
};
