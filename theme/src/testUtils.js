import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeUIProvider } from 'theme-ui'
import theme from './gatsby-plugin-theme-ui'

import store from './store'

export { store }

// React module that provides necessary context to components being tested.
export const TestProvider = ({ children }) => <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>

export const TestProviderWithState = ({ children }) => (
  <ReduxProvider store={store}>
    <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
  </ReduxProvider>
)
