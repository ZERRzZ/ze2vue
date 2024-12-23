const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_DIR,
  transpileDependencies: true,
  outputDir: 'docs'
})
