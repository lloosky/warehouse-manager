module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/manager/' : '/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js'
    }
  }
};
