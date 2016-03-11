export default {
  name: 'InstakCMS',
  env : process.env.ENV || 'test',
  db  : {
    production : 'mongodb://user:pass@remote-host:port/instacash_cms_prod',
    development: 'mongodb://remote-host:port/instacash_cms_dev',
    test       : 'mongodb://127.0.0.1:27017/instacash_cms_local'
  },
  jwt : {
    secret: 'Instak'
  }
};
