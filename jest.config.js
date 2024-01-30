module.exports = {
  timers: 'fake',
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-health|@react-native|react-native|react-redux|react-native-circular-progress|flow-parser|react-test-renderer|jscodeshift)/)',
  ],
};
