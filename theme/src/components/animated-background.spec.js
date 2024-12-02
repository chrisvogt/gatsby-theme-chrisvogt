import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AnimatedBackground from './animated-background'

// Mock requestAnimationFrame and cancelAnimationFrame
beforeEach(() => {
  window.requestAnimationFrame = jest.fn(callback => setTimeout(callback, 16)) // Simulate 60fps
  window.cancelAnimationFrame = jest.fn(id => clearTimeout(id))
})

afterEach(() => {
  jest.clearAllMocks()
})

// Mock the Canvas and its 2D context
const mockGetContext = jest.fn()

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: mockGetContext
  })

  mockGetContext.mockReturnValue({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    closePath: jest.fn(),
    createRadialGradient: jest.fn(() => ({
      addColorStop: jest.fn()
    })),
    fillStyle: '',
    globalAlpha: 1.0
  })
})

describe('AnimatedBackground', () => {
  it('renders the canvas and overlay div correctly', () => {
    render(<AnimatedBackground />)

    // Check if the canvas is rendered
    const canvasElement = document.querySelector('canvas')
    expect(canvasElement).toBeInTheDocument()

    // Check if the overlay div is rendered
    const overlayDiv = canvasElement.nextElementSibling
    expect(overlayDiv).toBeInTheDocument()
    expect(overlayDiv).toHaveStyle('background-color: rgba(75, 0, 130, 0.02)')

    // We skip checking `backdrop-filter` due to limitations in JSDOM
    // If needed, add a test for `backdrop-filter` in a real browser environment
    // expect(overlayDiv).toHaveStyle('backdrop-filter: blur(100px)');
  })

  it('sets up and tears down window resize event listeners', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<AnimatedBackground />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

    // Unmount the component and ensure the resize event listener is removed
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('initializes canvas size and gradient drawing', () => {
    render(<AnimatedBackground />)

    expect(mockGetContext).toHaveBeenCalledWith('2d')

    const context = mockGetContext.mock.results[0].value

    // Check if the canvas context methods are being called
    expect(context.clearRect).toHaveBeenCalled()
    expect(context.beginPath).toHaveBeenCalled()
    expect(context.arc).toHaveBeenCalled()
    expect(context.fill).toHaveBeenCalled()
    expect(context.closePath).toHaveBeenCalled()
    expect(context.createRadialGradient).toHaveBeenCalled()
  })

  it('uses requestAnimationFrame to animate', () => {
    render(<AnimatedBackground />)

    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })
})
