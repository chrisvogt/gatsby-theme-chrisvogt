import React, { useEffect, useRef, useCallback } from 'react'
import { useColorMode, useThemeUI } from 'theme-ui'

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hex
    .replace(/^#/, '')
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Debounce function to limit resize event frequency
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

class Circle {
  constructor(x, y, radius, gradientStops) {
    this.x = x
    this.y = y
    this.radius = radius
    this.gradientStops = gradientStops
    this.dx = (Math.random() - 0.5) * 0.715 // Increased speed
    this.dy = (Math.random() - 0.5) * 0.715 // Increased speed
  }

  draw(ctx) {
    if (!ctx) return

    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    this.gradientStops.forEach(stop => {
      gradient.addColorStop(stop.position, stop.color)
    })

    ctx.globalAlpha = 0.5 // Balanced opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.closePath()
    ctx.globalAlpha = 1.0 // Reset transparency
  }

  update(canvas, ctx) {
    if (!ctx || !canvas) return

    this.x += this.dx
    this.y += this.dy

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.draw(ctx)
  }

  // Method to reposition circle when canvas resizes
  reposition(canvas) {
    if (!canvas) return

    // Keep circles within bounds after resize
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius
    }
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius
    }
  }
}

export { Circle }

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const circlesRef = useRef([])
  const [colorMode] = useColorMode()
  const { theme } = useThemeUI()
  const backgroundHex = theme.rawColors?.background || '#1e1e2f' // Default to fallback color
  const backgroundRgba = hexToRgba(backgroundHex, 0.35) // Apply transparency to background color

  // Create circles with optimized count
  const createCircles = useCallback((canvas, gradients) => {
    const circles = []
    const circleCount = 40 // Reduced from 80 for better performance

    for (let i = 0; i < circleCount; i++) {
      const isLarge = i < 3 // Reduced large circles from 4 to 3
      const radius = isLarge ? Math.random() * 150 + 200 : Math.random() * 30 + 35 // Slightly smaller radii
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const gradient = gradients[i % 2]

      const circle = new Circle(x, y, radius, gradient)
      circles.push(circle)
    }
    return circles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight // Use viewport height instead of scroll height

      // Only resize if dimensions actually changed
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth
        canvas.height = newHeight

        // Reposition existing circles to stay within new bounds
        circlesRef.current.forEach(circle => circle.reposition(canvas))
      }
    }

    setCanvasSize()

    const darkModeGradients = [
      [
        { position: 0, color: 'rgba(128, 0, 128, 1)' }, // Royal Purple
        { position: 0.2, color: 'rgba(128, 0, 128, 0.9)' },
        { position: 0.4, color: 'rgba(128, 0, 128, 0.8)' },
        { position: 0.6, color: 'rgba(255, 215, 0, 0.4)' }, // Gold accent
        { position: 0.8, color: 'rgba(128, 0, 128, 0.7)' },
        { position: 1, color: 'rgba(128, 0, 128, 0.6)' }
      ],
      [
        { position: 0, color: 'rgba(128, 0, 128, 1)' }, // Royal Purple
        { position: 0.2, color: 'rgba(128, 0, 128, 0.8)' },
        { position: 0.4, color: 'rgba(255, 215, 0, 0.4)' }, // Gold accent
        { position: 0.6, color: 'rgba(128, 0, 128, 0.7)' },
        { position: 0.8, color: 'rgba(128, 0, 128, 0.6)' },
        { position: 1, color: 'rgba(128, 0, 128, 0.5)' }
      ]
    ]

    const lightModeGradients = [
      [
        { position: 0, color: 'rgba(66, 46, 163, 1)' }, // Primary Purple
        { position: 0.4, color: 'rgba(255, 20, 147, 0.8)' }, // Hot Pink
        { position: 1, color: 'rgba(30, 144, 255, 0.6)' } // Vibrant Blue
      ],
      [
        { position: 0, color: 'rgba(255, 20, 147, 1)' }, // Hot Pink
        { position: 0.5, color: 'rgba(30, 144, 255, 0.8)' }, // Vibrant Blue
        { position: 1, color: 'rgba(255, 235, 200, 0.5)' } // Pale Peach
      ]
    ]

    const gradients = colorMode === 'dark' ? darkModeGradients : lightModeGradients

    // Create circles and store reference
    circlesRef.current = createCircles(canvas, gradients)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      circlesRef.current.forEach(circle => circle.update(canvas, ctx))

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Debounced resize handler
    const debouncedResize = debounce(setCanvasSize, 100)

    window.addEventListener('resize', debouncedResize)

    return () => {
      window.removeEventListener('resize', debouncedResize)
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colorMode, createCircles])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: backgroundRgba, // Unified background color with transparency
          backdropFilter: 'blur(75px)',
          WebkitBackdropFilter: 'blur(75px)', // Safari
          pointerEvents: 'none' // Ensure the overlay doesn't block interactions
        }}
      ></div>
    </div>
  )
}

export default AnimatedBackground
