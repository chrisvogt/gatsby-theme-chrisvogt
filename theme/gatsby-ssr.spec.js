import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as gatsbySSR from './gatsby-ssr'

describe('gatsby-ssr', () => {
  it('exports wrapRootElement', () => {
    expect(gatsbySSR.wrapRootElement).toBeDefined()
  })

  it('sets html lang attribute and injects the color mode script', () => {
    const setHtmlAttributes = jest.fn()
    const setPreBodyComponents = jest.fn()

    gatsbySSR.onRenderBody({ setHtmlAttributes, setPreBodyComponents })

    // Assert the HTML lang attribute
    expect(setHtmlAttributes).toHaveBeenCalledWith({ lang: 'en' })

    // Extract the script element
    expect(setPreBodyComponents).toHaveBeenCalledTimes(1)
    const [scriptElement] = setPreBodyComponents.mock.calls[0][0]

    // Render the script element using React Testing Library
    const { container } = render(scriptElement)
    const scriptTag = container.querySelector('script')

    expect(scriptTag).toBeInTheDocument()
    expect(scriptTag).toHaveTextContent(/localStorage\.getItem\(['"]theme-ui-color-mode['"]\)/)
    expect(scriptTag).toHaveTextContent(/prefers-color-scheme/)
    expect(scriptTag).toHaveTextContent(/data-theme-ui-color-mode/)
  })
})
