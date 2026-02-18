const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions if needed
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;
