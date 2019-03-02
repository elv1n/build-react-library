import { join } from 'path';
import args from 'args';

const ownPath = join(__dirname, '..');

const lib = process.cwd();
const build = join(lib, args.out);
const src = join(lib, args.src);

export default {
  ownPath,
  lib,
  build,
  src
};
