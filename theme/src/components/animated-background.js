/*!
 * Animated Background
 * (c) 2024 Christopher Vogt
 * This code is licensed under the MIT License.
 * Created with the assistance of ChatGPT by OpenAI.
 */

import React, { useEffect, useRef } from 'react'

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

    ctx.globalAlpha = 0.45 // Set transparency to 45%
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    this.gradientStops.forEach(stop => {
      gradient.addColorStop(stop.position, stop.color)
    })

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.closePath()
    ctx.globalAlpha = 1.0 // Reset transparency to 100%
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

    const gradients = [
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
  }, [])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></canvas>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(75, 0, 130, 0.02)',
          backdropFilter: 'blur(100px)',
          WebkitBackdropFilter: 'blur(100px)', // Safari
          pointerEvents: 'none' // Ensure the overlay doesn't block interactions
        }}
      ></div>
    </div>
  )
}

export default AnimatedBackground
