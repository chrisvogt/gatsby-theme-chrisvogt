const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

let basePath
let contentPath

exports.createPages = async ({ actions, reporter }, themeOptions) => {
  const { createPage } = actions

  basePath = themeOptions.basePath || '/'

  createPage({
    component: require.resolve('./src/templates/home.js'),
    path: basePath
  })
}

exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { program } = store.getState()

  basePath = themeOptions.basePath || '/'
  contentPath = themeOptions.contentPath || 'src/pages'
  dataPath = themeOptions.dataPath || 'src/data'

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, dataPath)
  ]

  dirs.forEach(dir => {
    reporter.log(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}
