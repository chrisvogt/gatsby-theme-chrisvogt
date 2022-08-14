import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './gatsby-plugin-theme-ui'

// React module that provides necessary context to components being tested.
export const TestProvider = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
