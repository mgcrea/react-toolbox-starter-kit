require('debug-utils');

const options = {
  useBabelrc: true,
  useSassLoader: true,
  useCssModules: true,
  useSourceMaps: false
}

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

const findLoader = (config, {loader: searchedLoader}) => {
  const loaders = config.use;
  return loaders.find(loader => {
    if (isString(loader)) {
      return loader === searchedLoader;
    }
    return loader.loader.toString() == searchedLoader.toString();
  });
}

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const isDev = env === 'development';
  const {useBabelrc, useSassLoader, useCssModules, useSourceMaps} = options;

  const scriptsModuleLoader = findModuleLoader(config, {test: /\.(js|jsx)$/});
  if (useBabelrc) {
    scriptsModuleLoader.options.babelrc = true;
  }

  const stylesModuleLoader = findModuleLoader(config, {test: /\.css$/});
  if (useSassLoader) {
    stylesModuleLoader.test = /(\.scss|\.css)$/;
    stylesModuleLoader.use.push({
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: useSourceMaps
      }
    });
  }
  const cssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('css-loader')});
  cssLoader.options.sourceMap = useSourceMaps;
  if (useCssModules) {
    stylesModuleLoader.use.unshift(require.resolve('css-hot-loader'));
    cssLoader.options.modules = useCssModules;
    cssLoader.options.localIdentName = '[local]__[name]__[hash:base64:5]';
  }
  const postcssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('postcss-loader')});
  postcssLoader.options.sourceMap = useSourceMaps;

  return config;
}
