import args from 'args';
import development from 'process/development';
import production from 'process/production';

(async () => {
  if (args.watch) {
    await development();
  } else {
    await production();
  }
})();
