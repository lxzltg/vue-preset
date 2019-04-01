module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-default-from',
    [
      'import',
      {
        libraryName: 'iview',
        styleLibraryName: 'src/components'
      }
    ]
  ]
}
