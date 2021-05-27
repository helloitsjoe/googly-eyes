console.log(`process.env.NODE_ENV:`, process.env.NODE_ENV);
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
    secure: process.env.NODE_ENV !== 'production',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2015',
  },
};
