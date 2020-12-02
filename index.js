const boxen = require('boxen')
const chalk = require('chalk')

const package = require('./theme/package.json')

/**
 * Post-Install Splash Banner
 *
 * This module contains the Private Sphere splash banner, rendered after running
 * the install scripts.
 */

const banner = boxen('Private Sphere\na GatsbyJS theme', {
  align: 'center',
  backgroundColor: '#9b20dc',
  color: 'white',
  padding: {
    top: 1,
    right: 8,
    bottom: 1,
    left: 8,
  },
})

console.log(banner)

console.log(
  `✅  Installation succeeded: ${chalk.bold('gatsby-theme-private-sphere')}`
)

console.log(`⚙  Version: ${chalk.bold(package.version)}`)
