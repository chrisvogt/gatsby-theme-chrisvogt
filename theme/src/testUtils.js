import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'
import theme from './gatsby-plugin-theme-ui'

import store from './store'

export { store }

// React module that provides necessary context to components being tested.
export const TestProvider = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export const TestProviderWithState = ({ children }) => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </ReduxProvider>
)
