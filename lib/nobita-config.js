module.exports = app => {
  const _ = require('lodash');
  const requireJS = require('nobita-require');
  const cwd = process.cwd();
  const RUN_ENV = process.env.RUN_ENV;
  let defaultConfig = requireJS('./config/config.default.js');
  let envConfig = requireJS(`./config/config.${RUN_ENV}.js`);
  const _config = {
    env: RUN_ENV,
    cwd,
    listen: {
      port: 6001,
      callback() { }
    },
    session: {
      keys: ['ab18ae83-2f8c-4959-801c-3fcd389b0320'],
      key: 'NOBITA_SESSION'
    },
    koaBody: {
      strict: false,
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024
      }
    },
    xss: true
  };

  if (typeof defaultConfig == 'function') {
    defaultConfig = defaultConfig(app);
  }

  if (typeof envConfig == 'function') {
    envConfig = envConfig(app);
  }
  
  const config = _.mergeWith(
    _config,
    defaultConfig,
    envConfig,
    (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    }
  );
  app.keys = config.session.keys;
  app.config = app.context.config = config;
};