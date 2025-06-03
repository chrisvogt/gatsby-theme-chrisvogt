import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './button'
import { ThemeUIProvider } from 'theme-ui'

// Mock Theme
const mockTheme = {
  buttons: {
    primary: {
      backgroundColor: 'blue',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'gray',
      color: 'black'
    }
  }
}

// Helper function to render with theme
const renderWithTheme = component => render(<ThemeUIProvider theme={mockTheme}>{component}</ThemeUIProvider>)

describe('Button', () => {
  it('renders a button with default variant (primary)', () => {
    renderWithTheme(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('background-color: blue')
    expect(button).toHaveStyle('color: white')
  })

  it('renders a button with the secondary variant', () => {
    renderWithTheme(<Button variant='secondary'>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('background-color: gray')
    expect(button).toHaveStyle('color: black')
  })

  it('passes additional props to the button element', () => {
    renderWithTheme(<Button type='submit'>Submit</Button>)

    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })
})
