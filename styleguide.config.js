const fs = require('fs');
const url = require('url');
const path = require('path');
const paths = require('react-app-rewired/config/paths');
const webpackConfig = paths.scriptVersionDir + '/config/webpack.config.dev';
const config = require(webpackConfig);
const override = require(paths.projectDir + '/config-overrides');

module.exports = {
  configureServer(app) {
    // Serve public/ directory
    app.get('*', (req, res) => {
      const parsedUrl = url.parse(req.url);
      fs.createReadStream(path.join(__dirname, 'public', parsedUrl.pathname)).pipe(res);
    });
  },
  webpackConfig(env) {
    return override(config, env);
  },
  styleguideComponents: {
    // Wrapper: path.join(__dirname, 'docs/styleguide/components/Wrapper.js')
    Wrapper: path.join(__dirname, 'src/components/styleguide/Wrapper/Wrapper.js')
  },
  require: [
    path.join(__dirname, 'src/styles/index.scss'),
  ],
  template: path.join(__dirname, 'docs/styleguide/index.html'),
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md'
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: 'src/components/ui/*/*.js'
    }
  ]
};
