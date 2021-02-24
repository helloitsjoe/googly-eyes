/* eslint-env node */
module.exports = {
  mount: {
    src: '/dist',
    public: '/',
  },
  devOptions: {
    // Needs https for connecting to mobile locally
    secure: true,
  },
};
