import React, { useEffect, useRef } from 'react'
import { useColorMode, useThemeUI } from 'theme-ui'

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hex
    .replace(/^#/, '')
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
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
}

export { Circle }

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const [colorMode] = useColorMode()
  const { theme } = useThemeUI()
  const backgroundHex = theme.rawColors?.background || '#1e1e2f' // Default to fallback color
  const backgroundRgba = hexToRgba(backgroundHex, 0.15) // Apply transparency to background color

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.body.scrollHeight // Set canvas height to the entire page height
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

    const circles = []

    for (let i = 0; i < 80; i++) {
      const isLarge = i < 4 // Larger size for the first 4 circles
      const radius = isLarge ? Math.random() * 200 + 250 : Math.random() * 35 + 40
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const gradient = gradients[i % 2]

      const circle = new Circle(x, y, radius, gradient)
      circles.push(circle)
    }

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      circles.forEach(circle => circle.update(canvas, ctx))

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [colorMode])

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
