import { join } from 'path';

import paths from 'paths';
import args from 'args';
import { buildRoot } from 'consts';

export default env => {
  const isDev = env === 'development';
  const outDir = env === buildRoot || isDev ? '' : env;
  const nodeEnv = isDev ? 'development' : 'production';
  return [
    `cross-env NODE_ENV=${nodeEnv}`,
    `BABEL_ENV=${env}`,
    'babel',
    paths.src,
    args.watch && '--watch',
    `--config-file ${join(paths.ownPath, '/babel.library.js')}`,
    `--out-dir ${join(paths.build, outDir)}`,
    '--ignore **/__tests__',
    '--verbose'
  ]
    .filter(Boolean)
    .join(' ');
};
