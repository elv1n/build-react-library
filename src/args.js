import yargs from 'yargs';

const { argv } = yargs.options({
  src: {
    alias: 's',
    describe: 'Library source folder',
    default: 'src'
  },
  out: {
    alias: 'o',
    describe: 'Compiled source folder',
    default: 'build'
  },
  libName: {
    alias: 'n',
    describe: 'Change library name in package.json'
  }
});

export default argv;
