/* eslint-env node */
module.exports = {
  mount: {
    src: '/dist',
    public: '/',
  },
  buildOptions: {
    out: 'docs',
  },
  devOptions: {
    // Needs https for connecting to mobile locally
    secure: true,
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2015',
  },
};
