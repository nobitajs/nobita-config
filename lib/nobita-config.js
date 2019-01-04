const _ = require('lodash');
const requireJS = require('nobita-require');
const cwd = process.cwd();
const RUN_ENV = process.env.RUN_ENV;
const defaultConfig = requireJS('./config/config.default.js');
const envConfig = requireJS(`./config/config.${RUN_ENV}.js`);
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

const config = _.merge(_config, defaultConfig, envConfig);

module.exports = config;