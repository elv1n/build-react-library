import { join } from 'path';

const ownPath = join(__dirname, '..');

const lib = process.cwd();
const build = join(lib, './build');
const src = join(lib, './src');

export default {
  ownPath,
  lib,
  build,
  src
};
