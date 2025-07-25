import React, { useEffect, useRef, useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import * as d3 from 'd3'
import careerData from '../src/data/career-path.json'
import isDarkMode from 'gatsby-theme-chronogrove/src/helpers/isDarkMode'

const CareerPathVisualization = () => {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const { colorMode } = useThemeUI()
  const darkModeActive = isDarkMode(colorMode)

  const createVisualization = () => {
    if (!svgRef.current || !containerRef.current) return

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove()

    const container = containerRef.current
    const containerWidth = container.offsetWidth || 800
    const margin = { top: 40, right: 60, bottom: 40, left: 60 }
    const width = Math.max(400, containerWidth - 40) - margin.left - margin.right
    const height = Math.min(700, Math.max(400, window.innerHeight * 0.5)) - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Create hierarchical layout
    const root = d3.hierarchy(careerData)
    const treeLayout = d3.tree().size([width, height])
    treeLayout(root)

    // Create time scale - INVERTED (latest years at top)
    const timeScale = d3.scaleLinear().domain([2005, 2025]).range([height, 0])

    // Adjust node positions based on time
    root.descendants().forEach(node => {
      if (node.data.startYear) {
        node.y = timeScale(node.data.startYear)
      } else if (node.data.type === 'path' && node.children && node.children.length > 0) {
        // Position path nodes at the time of their earliest job
        const earliestYear = Math.min(...node.children.map(child => child.data.startYear || 2025))
        node.y = timeScale(earliestYear)
      }
    })

    // Create curved links
    const linkGenerator = d3
      .linkVertical()
      .x(d => d.x)
      .y(d => d.y)

    // Create gradient definitions for cross-path connections
    const defs = svg.append('defs')

    // Define gradients for path transitions
    const gradients = [
      { id: 'it-to-design', start: '#4299e1', end: '#ed8936' },
      { id: 'it-to-engineering', start: '#4299e1', end: '#48bb78' }
    ]

    gradients.forEach(grad => {
      const gradient = defs
        .append('linearGradient')
        .attr('id', grad.id)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

      gradient.append('stop').attr('offset', '0%').attr('stop-color', grad.start).attr('stop-opacity', 0.8)

      gradient.append('stop').attr('offset', '100%').attr('stop-color', grad.end).attr('stop-opacity', 0.8)
    })

    // Draw regular tree links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .style('fill', 'none')
      .style('stroke', d => {
        const pathNode = d.target.ancestors().find(ancestor => ancestor.data.type === 'path')
        return pathNode ? pathNode.data.color : '#999'
      })
      .style('stroke-width', d => {
        if (d.target.data.type === 'path') return 4
        if (d.target.data.name === 'GoDaddy') return 3
        return 2
      })
      .style('opacity', 0.8)

    // Find and draw cross-path connections
    const allNodes = root.descendants()
    const jobNodes = allNodes.filter(d => d.data.type === 'job')

    // Group job nodes by company name
    const companiesByName = {}
    jobNodes.forEach(node => {
      const companyName = node.data.name
      if (!companiesByName[companyName]) {
        companiesByName[companyName] = []
      }
      companiesByName[companyName].push(node)
    })

    // Create cross-path connections for companies that appear in multiple paths
    Object.entries(companiesByName).forEach(([, nodes]) => {
      if (nodes.length > 1) {
        // Sort nodes by start year to connect them chronologically
        nodes.sort((a, b) => a.data.startYear - b.data.startYear)

        for (let i = 0; i < nodes.length - 1; i++) {
          const sourceNode = nodes[i]
          const targetNode = nodes[i + 1]

          // Determine gradient based on paths
          const sourcePath = sourceNode.ancestors().find(a => a.data.type === 'path')
          const targetPath = targetNode.ancestors().find(a => a.data.type === 'path')

          let gradientId = 'it-to-design'
          if (sourcePath?.data.name === 'IT Path' && targetPath?.data.name === 'Engineering Path') {
            gradientId = 'it-to-engineering'
          }

          // Create curved connection
          const connectionPath = d3.path()
          const midX = (sourceNode.x + targetNode.x) / 2
          const midY = (sourceNode.y + targetNode.y) / 2
          const controlY = midY - Math.abs(targetNode.x - sourceNode.x) * 0.3

          connectionPath.moveTo(sourceNode.x, sourceNode.y)
          connectionPath.quadraticCurveTo(midX, controlY, targetNode.x, targetNode.y)

          g.append('path')
            .attr('class', 'cross-path-link')
            .attr('d', connectionPath.toString())
            .style('fill', 'none')
            .style('stroke', `url(#${gradientId})`)
            .style('stroke-width', 3)
            .style('stroke-dasharray', '5,5')
            .style('opacity', 0.7)
        }
      }
    })

    // Create nodes
    const nodes = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        setSelectedNode(d.data)
      })
      .on('mouseover', function () {
        d3.select(this).select('circle').style('stroke-width', 4)
      })
      .on('mouseout', function () {
        d3.select(this).select('circle').style('stroke-width', 2)
      })

    // Add circles for nodes - larger sizes
    nodes
      .append('circle')
      .attr('r', d => {
        if (d.data.type === 'path') return 8
        if (d.data.name === 'GoDaddy') return 15
        if (d.data.name === 'Career Journey') return 8
        return 8
      })
      .style('fill', d => {
        if (d.data.type === 'path') return d.data.color
        if (d.data.name === 'Career Journey') return '#2d3748'
        const pathNode = d.ancestors().find(ancestor => ancestor.data.type === 'path')
        return pathNode ? pathNode.data.color : '#e2e8f0'
      })
      .style('stroke', d => {
        if (d.data.type === 'path') return d.data.color
        return '#fff'
      })
      .style('stroke-width', d => {
        if (d.data.type === 'path') return 3
        return 2
      })
      .style('opacity', d => {
        if (d.data.type === 'path') return 0.8
        return 1
      })

    // Add diamond shapes for path nodes to make them look like branching points
    nodes
      .filter(d => d.data.type === 'path')
      .append('polygon')
      .attr('points', '0,-6 6,0 0,6 -6,0')
      .style('fill', d => d.data.color)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('opacity', 0.9)

    // Add labels with responsive positioning
    nodes
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => {
        // Responsive text positioning
        if (width < 600) {
          // Mobile: position text above/below nodes
          return 0
        } else {
          // Desktop: position text left/right based on node position
          if (d.x > width * 0.7) return -12
          if (d.x < width * 0.3) return 12
          return d.children ? -12 : 12
        }
      })
      .attr('dy', d => {
        // Mobile: position text above/below
        if (width < 600) {
          return d.children ? '-1.2em' : '1.8em'
        }
        return '0.35em'
      })
      .style('text-anchor', d => {
        if (width < 600) return 'middle'
        if (d.x > width * 0.7) return 'end'
        if (d.x < width * 0.3) return 'start'
        return d.children ? 'end' : 'start'
      })
      .style('font-size', d => {
        const baseSize = width < 600 ? 10 : 12
        if (d.data.type === 'path') return `${baseSize + 2}px`
        if (d.data.name === 'GoDaddy') return `${baseSize + 1}px`
        return `${baseSize}px`
      })
      .style('font-weight', d => {
        if (d.data.type === 'path' || d.data.name === 'GoDaddy') return 'bold'
        return 'normal'
      })
      .style('fill', darkModeActive ? '#e2e8f0' : '#2d3748')
      .text(d => {
        if (d.data.name === 'Career Journey') return ''
        if (d.data.type === 'path') return d.data.name
        if (d.data.name === 'GoDaddy') return d.data.name
        return d.data.title || d.data.name
      })

    // Add year labels - responsive positioning
    const years = d3.range(2005, 2026, 5)
    g.selectAll('.year-label')
      .data(years)
      .enter()
      .append('text')
      .attr('class', 'year-label')
      .attr('x', -20)
      .attr('y', d => timeScale(d))
      .attr('dy', '0.35em')
      .style('text-anchor', 'end')
      .style('font-size', width < 600 ? '10px' : '11px')
      .style('fill', darkModeActive ? '#a0aec0' : '#718096')
      .style('font-weight', 'bold')
      .text(d => d)

    // Add timeline line
    g.append('line')
      .attr('x1', -10)
      .attr('y1', 0)
      .attr('x2', -10)
      .attr('y2', height)
      .style('stroke', darkModeActive ? '#4a5568' : '#cbd5e0')
      .style('stroke-width', 2)
  }

  useEffect(() => {
    createVisualization()

    // Add resize listener for responsiveness
    const handleResize = () => {
      setTimeout(createVisualization, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [darkModeActive])

  // Glassmorphism container styles
  const containerStyles = {
    background: 'panel-background',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: darkModeActive ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)'
  }

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box
        sx={{
          ...containerStyles,
          padding: [2, 3, 4]
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <svg
            ref={svgRef}
            sx={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </Box>

        {selectedNode && (
          <Box
            sx={{
              mt: 4,
              background: 'panel-background',
              borderRadius: ['12px', '16px'],
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: darkModeActive ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: [3, 4],
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header with gradient accent */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                pb: 3,
                borderBottom: darkModeActive ? '2px solid rgba(74, 158, 255, 0.3)' : '2px solid rgba(66, 46, 163, 0.3)'
              }}
            >
              <Box
                sx={{
                  background: darkModeActive
                    ? 'linear-gradient(45deg, #4a9eff, #711e9b)'
                    : 'linear-gradient(45deg, #422EA3, #711E9B)',
                  width: '6px',
                  height: '32px',
                  borderRadius: '3px',
                  mr: 3
                }}
              />
              <Box>
                {/* Company Name */}
                {selectedNode.title && selectedNode.name && (
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: darkModeActive ? '#888' : '#666',
                      fontWeight: 'medium',
                      mb: 1
                    }}
                  >
                    {selectedNode.name}
                  </Box>
                )}
                {/* Job Title / Role */}
                <Box
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: darkModeActive ? '#4a9eff' : '#422EA3',
                    lineHeight: 'tight'
                  }}
                >
                  {selectedNode.title || selectedNode.name}
                </Box>
              </Box>
            </Box>

            {/* Dates */}
            {selectedNode.dates && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  fontSize: '14px',
                  color: darkModeActive ? '#aaa' : '#777',
                  fontWeight: 'medium'
                }}
              >
                <Box
                  sx={{
                    width: '16px',
                    height: '16px',
                    mr: 2,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  📅
                </Box>
                {selectedNode.dates}
              </Box>
            )}

            {/* Description */}
            {selectedNode.description && (
              <Box
                sx={{
                  fontSize: '14px',
                  color: 'textMuted',
                  lineHeight: 'relaxed',
                  fontStyle: 'italic',
                  background: darkModeActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '8px',
                  padding: 3,
                  border: darkModeActive ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                {selectedNode.description}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CareerPathVisualization
