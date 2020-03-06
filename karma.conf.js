var webpackConfig = require('@vue/cli-service/webpack.config') // 拿到配置文件

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    // 自动观察文件变化
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ['spec'],
    // 启动一个无头浏览器
    browsers: ['ChromeHeadless']
  })
}