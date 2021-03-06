/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

import paths from 'paths';
import args from 'args';

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(paths.lib, file);
  const targetPath = path.resolve(paths.build, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@material-ui/core/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in typescript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob
    .sync('*/index.js', { cwd: from })
    .map(path.dirname);

  await Promise.all(
    directoryPackages.map(async directoryPackage => {
      const packageJson = {
        sideEffects: false,
        module: path.join('../esm', directoryPackage, 'index.js'),
        typings: './index.d.ts'
      };
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      await Promise.all([
        fse.exists(path.join(to, directoryPackage, 'index.d.ts')),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
      ]);

      return packageJsonPath;
    })
  );
}

async function typescriptCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file =>
    fse.copy(path.resolve(from, file), path.resolve(to, file))
  );
  return Promise.all(cmds);
}

const isDTsExist = () => fse.exists(path.join(paths.src, 'index.d.ts'));

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(paths.lib, './package.json'),
    'utf8'
  );
  const {
    nyc,
    scripts,
    devDependencies,
    workspaces,
    ...packageDataOther
  } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    name: args.libName ? args.libName : packageDataOther.name,
    private: false,
    main: './index.js',
    module: './esm/index.js',
    typings: (await isDTsExist()) ? './index.d.ts' : undefined
  };
  const targetPath = path.resolve(paths.build, './package.json');

  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    'utf8'
  );
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

const run = async () => {
  try {
    await createPackageFile();

    // TypeScript
    await typescriptCopy({ from: paths.src, to: paths.build });

    await createModulePackages({ from: paths.src, to: paths.build });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default run;
