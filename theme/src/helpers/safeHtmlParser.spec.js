import React from 'react'
import { render } from '@testing-library/react'
import { parseSafeHtml } from './safeHtmlParser'

describe('parseSafeHtml', () => {
  it('should return null/undefined as-is', () => {
    expect(parseSafeHtml(null)).toBeNull()
    expect(parseSafeHtml(undefined)).toBeUndefined()
  })

  it('should return non-string values as-is', () => {
    expect(parseSafeHtml(123)).toBe(123)
    expect(parseSafeHtml({})).toEqual({})
    expect(parseSafeHtml([])).toEqual([])
  })

  it('should return empty string as-is', () => {
    expect(parseSafeHtml('')).toBe('')
  })

  it('should return plain text without HTML as-is', () => {
    const text = 'This is plain text without any HTML tags'
    expect(parseSafeHtml(text)).toBe(text)
  })

  it('should handle <b> tags correctly', () => {
    const text = 'This is <b>bold</b> text'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b>bold</b>')
    expect(container.textContent).toBe('This is bold text')
  })

  it('should handle <i> tags correctly', () => {
    const text = 'This is <i>italic</i> text'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<i>italic</i>')
    expect(container.textContent).toBe('This is italic text')
  })

  it('should handle multiple <b> and <i> tags', () => {
    const text = 'This is <b>bold</b> and <i>italic</i> text'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b>bold</b>')
    expect(container.innerHTML).toContain('<i>italic</i>')
    expect(container.textContent).toBe('This is bold and italic text')
  })

  it('should not support nested tags', () => {
    const text = 'This is <b><i>bold italic</i></b> text'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    // Nested tags are not processed, returned as-is
    expect(container.innerHTML).toContain('&lt;b&gt;&lt;i&gt;bold italic&lt;/i&gt;&lt;/b&gt;')
    expect(container.textContent).toBe('This is <b><i>bold italic</i></b> text')
  })

  it('should handle <br /> tags correctly', () => {
    const text = 'Line 1<br />Line 2'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<br>')
    expect(container.textContent).toBe('Line 1Line 2')
  })

  it('should handle <br> tags without slash', () => {
    const text = 'Line 1<br>Line 2'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<br>')
    expect(container.textContent).toBe('Line 1Line 2')
  })

  it('should handle multiple <br /> tags', () => {
    const text = 'Line 1<br />Line 2<br />Line 3'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    const brElements = container.querySelectorAll('br')
    expect(brElements).toHaveLength(2)
    expect(container.textContent).toBe('Line 1Line 2Line 3')
  })

  it('should handle mixed tags with <br />', () => {
    const text = 'This is <b>bold</b><br />and <i>italic</i>'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b>bold</b>')
    expect(container.innerHTML).toContain('<br>')
    expect(container.innerHTML).toContain('<i>italic</i>')
    expect(container.textContent).toBe('This is boldand italic')
  })

  it('should ignore unsupported HTML tags', () => {
    const text = 'This is <div>div content</div> and <span>span content</span>'
    const result = parseSafeHtml(text)
    expect(result).toBe(text) // Should return original text unchanged
  })

  it('should not parse malformed HTML', () => {
    const text = 'This is <b>unclosed bold and <i>italic</b>'
    const result = parseSafeHtml(text)
    // Malformed HTML is ignored, returned as-is
    expect(result).toBe(text)
  })

  it('should parse case-insensitive tags', () => {
    const text = 'This is <B>BOLD</B> and <I>ITALIC</I>'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<i>BOLD</i>')
    expect(container.innerHTML).toContain('<i>ITALIC</i>')
    expect(container.textContent).toBe('This is BOLD and ITALIC')
  })

  it('should handle case-insensitive <br /> tags', () => {
    const text = 'Line 1<BR />Line 2<Br>Line 3'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    const brElements = container.querySelectorAll('br')
    expect(brElements).toHaveLength(2)
    expect(container.textContent).toBe('Line 1Line 2Line 3')
  })

  it('should handle empty tag content', () => {
    const text = 'This is <b></b> empty'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b></b>')
    expect(container.textContent).toBe('This is  empty')
  })

  it('should handle text with only <br /> tags', () => {
    const text = '<br /><br />'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    const brElements = container.querySelectorAll('br')
    expect(brElements).toHaveLength(2)
    expect(container.textContent).toBe('')
  })

  it('should handle text starting with <br />', () => {
    const text = '<br />Line 2'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<br>')
    expect(container.textContent).toBe('Line 2')
  })

  it('should handle text ending with <br />', () => {
    const text = 'Line 1<br />'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<br>')
    expect(container.textContent).toBe('Line 1')
  })

  it('should handle text with only inline tags', () => {
    const text = '<b>Bold</b><i>Italic</i>'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b>Bold</b>')
    expect(container.innerHTML).toContain('<i>Italic</i>')
    expect(container.textContent).toBe('BoldItalic')
  })

  it('should handle text with only one tag', () => {
    const text = '<b>Bold</b>'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<b>Bold</b>')
    expect(container.textContent).toBe('Bold')
  })

  it('should handle text with only one <br /> tag', () => {
    const text = '<br />'
    const result = parseSafeHtml(text)
    const { container } = render(<div>{result}</div>)
    expect(container.innerHTML).toContain('<br>')
    expect(container.textContent).toBe('')
  })
})
