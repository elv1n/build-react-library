import npmRun from 'npm-run';
import logUpdate from 'log-update';
import emoji from 'node-emoji';

import paths from 'paths';
import copyFiles from 'utils/copy-files';
import getCommand from 'utils/command';

export default async () => {
  await copyFiles();
  logUpdate(`${emoji.get(':rocket:')}  Start watching...`);
  const ls = npmRun.exec(getCommand('development'), {
    cwd: paths.lib
  });

  ls.stdout.on('data', data => {
    console.log(data);
  });

  ls.stderr.on('data', data => {
    console.log(data);
  });

  ls.on('close', code => {
    console.log(code);
    logUpdate.done();
  });
};
