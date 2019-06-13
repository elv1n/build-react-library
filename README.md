
[![npm version](https://badgen.net/npm/v/build-react-library)](https://npm.im/build-react-library) [![npm downloads](https://badgen.net/npm/dm/build-react-library)](https://npm.im/build-react-library)

## build-react-library helps you to bundle a React library

**build-react-library based on [@material-ui](https://github.com/mui-org/material-ui) babel config**

Additional plugins:

- @babel/plugin-syntax-dynamic-import

### Get Started

```bash
yarn add build-react-library
yarn build-react-icons
```

## Advanced usage and Custom builds

`yarn build-react-library --help` can be used to display the options available for building.

* `--output-dir, -o` - Directory to output generated components. [default: "build"]
* `--src-dir, -s` - Directory containing the source SVG icons. [default: "src"]
* `--lib-name, -n` - "Change library name in package.json".
* `--watch, -w` - "babel --watch".
