require('debug-utils');
const path = require('path');

const srcPath = path.join(__dirname, 'src');
const modulesPath = path.join(__dirname, 'node_modules');

const options = {
  useBabelrc: true,
  useSassLoader: true,
  sassDataOption: '@import "' + path.resolve(srcPath, 'styles/_theme.scss') + '";',
  usePostcssSass: false,
  useCssModules: true,
  useSourceMaps: false,
  useHotLoader: false
};

const isString = maybeString => typeof maybeString === 'string';

const addModuleLoader = (config, loader) => {
  const loaders = config.module.rules[1].oneOf;
  loaders.splice(loaders.length - 1, 0, loader);
}

const findModuleLoader = (config, {test}) => {
  const loaders = config.module.rules[1].oneOf;
  return loaders.find(loader => {
    return loader.test.toString() == test.toString()
  });
}

const findLoader = (config, {loader: searchedLoader, env = 'development'}) => {
  const loaders = (env === 'production') ? config.loader : config.use;
  return loaders.find((loader) => {
    if (isString(loader)) {
      return loader === searchedLoader;
    }
    return loader.loader.toString() === searchedLoader.toString();
  });
};

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const isDev = env === 'development';
  const {useBabelrc, useSassLoader, sassDataOption, useCssModules, useSourceMaps, useHotLoader, usePostcssSass} = options;

  if (useHotLoader) {
    config.entry.push('react-hot-loader/patch?quiet=false');
  }

  const scriptsModuleLoader = findModuleLoader(config, {test: /\.(js|jsx)$/});
  if (useBabelrc) {
    scriptsModuleLoader.options.babelrc = true;
  }

  const stylesModuleLoader = findModuleLoader(config, {test: /\.css$/});
  const stylesModuleLoaders = (env === 'production') ? stylesModuleLoader.loader : stylesModuleLoader.use;
  const cssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('css-loader')});
  // stylesModuleLoader.include = [srcPath];
  if (useSourceMaps) {
    cssLoader.options.sourceMap = true;
  }
  if (useCssModules) {
    // Load every .css from node_modules as a global file (eg. required for codemirror import)
    const externalCssModuleLoader = {
      test: /\.css$/,
      include: modulesPath,
      use: [require.resolve('style-loader'), require.resolve('css-loader')]
    };
    insertModuleLoader(config, externalCssModuleLoader, 2);
    stylesModuleLoader.exclude = modulesPath;
    cssLoader.options.modules = useCssModules;
    cssLoader.options.localIdentName = '[local]__[name]__[hash:base64:5]';
  }

  const postcssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('postcss-loader')});
  if (useSourceMaps) {
    postcssLoader.options.sourceMap = true;
  }
  if (useSassLoader) {
    // As a distinct module loader
    const sassModuleLoader = {
      test: /\.scss$/,
      use: stylesModuleLoaders.slice().concat([{
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: useSourceMaps,
          data: sassDataOption
        }
      }])
    }
    addModuleLoader(config, sassModuleLoader);
    /*
    // Overriding styles module loader
    stylesModuleLoader.test = /(\.scss|\.css)$/;
    stylesModuleLoaders.push();
    */
  }

  // Always use this local copy of react to prevent runtime errors with linked modules
  if (!config.resolve.alias.react) {
    config.resolve.alias.react = path.join(modulesPath, 'react');
  }

  // dd(postcssLoader.options.plugins);
  // d(config);
  return config;
}
