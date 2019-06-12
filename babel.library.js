let defaultPresets;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV)
          ? false
          : 'commonjs'
      }
    ]
  ];
}

const productionPlugins = [
  'transform-react-constant-elements',
  'transform-dev-warning',
  ['react-remove-properties', { properties: ['data-test'] }],
  [
    'transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap'
    }
  ]
];

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    'babel-plugin-optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    // for IE 11 support
    '@babel/plugin-transform-object-assign'
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    cjs: {
      plugins: productionPlugins
    },
    coverage: {
      plugins: ['babel-plugin-istanbul']
    },
    esm: {
      plugins: productionPlugins
    },
    es: {
      plugins: productionPlugins
    },
    production: {
      plugins: productionPlugins
    },
    'production-umd': {
      plugins: productionPlugins
    },
    test: {
      sourceMaps: 'both'
    }
  }
};
