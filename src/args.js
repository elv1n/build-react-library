import yargs from 'yargs';

const { argv } = yargs.options({
  'src-dir': {
    alias: 's',
    describe: 'Library source folder',
    default: 'src'
  },
  'output-dir': {
    alias: 'o',
    describe: 'Compiled source folder',
    default: 'build'
  },
  'lib-name': {
    alias: 'n',
    describe: 'Change library name in package.json'
  },
  watch: {
    alias: 'w',
    type: 'boolean',
    describe: 'Add --watch argument to babel'
  }
});

export default argv;
