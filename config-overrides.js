module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    https: false,
    querystring: require.resolve("querystring-es3"),
    url: false,
    path: require.resolve("path-browserify"),
    stream: false,
    buffer: false,
  };

  return config;
};
