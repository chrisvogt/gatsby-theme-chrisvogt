// Babel config, used by Jest and Gatsby builds
// Optimized to reduce unnecessary transforms and improve Lighthouse scores

// Custom preset that extends babel-preset-gatsby with optimizations
function createOptimizedPreset(api, options = {}) {
  const isTest = api.env('test')
  const isBrowser = !isTest && (api.env('browser') || api.env('production') || api.env('development'))

  // Get the base babel-preset-gatsby configuration
  const basePreset = require('babel-preset-gatsby').default(api, options)

  // Only apply optimizations for browser builds
  if (!isBrowser) {
    return basePreset
  }

  // Filter out unnecessary plugins for modern browsers
  const optimizedPlugins = basePreset.plugins.filter(plugin => {
    if (!Array.isArray(plugin)) return true

    const [pluginName] = plugin

    // Skip transform-spread if browsers support it natively
    if (pluginName && pluginName.includes('transform-spread')) {
      return false // Modern browsers support spread natively
    }

    // Skip transform-classes if browsers support it natively
    if (pluginName && pluginName.includes('transform-classes')) {
      return false // Modern browsers support classes natively
    }

    return true
  })

  // Enhance plugins with loose mode for better performance
  const enhancedPlugins = optimizedPlugins.map(plugin => {
    if (!Array.isArray(plugin)) return plugin

    const [pluginName, pluginOptions = {}] = plugin

    // Use loose mode for class properties (already set in babel-preset-gatsby)
    if (pluginName && pluginName.includes('plugin-proposal-class-properties')) {
      return [pluginName, { ...pluginOptions, loose: true }]
    }

    // Use loose mode for object rest/spread if present
    if (pluginName && pluginName.includes('plugin-proposal-object-rest-spread')) {
      return [pluginName, { ...pluginOptions, loose: true }]
    }

    return plugin
  })

  return {
    ...basePreset,
    plugins: enhancedPlugins
  }
}

module.exports = {
  presets: [createOptimizedPreset]
}
