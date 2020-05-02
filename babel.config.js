module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          root: './src',
          assets: './assets',
          navigation: './src/navigation',
          components: './src/components',
          features: './src/features',
          state: './src/state',
          api: './src/api',
          utils: './src/utils',
          services: './src/services',
          styles: './src/styles',
          database: './src/database',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
