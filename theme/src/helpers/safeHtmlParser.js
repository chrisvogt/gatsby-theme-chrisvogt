import React from 'react'

/**
 * Safely converts HTML entities to React elements
 * Only supports: <b>, <i>, <br />
 *
 * @param {string} text - The text containing HTML entities
 * @returns {React.ReactNode} - React elements or the original string
 */
export const parseSafeHtml = text => {
  if (!text || typeof text !== 'string') {
    return text
  }

  // Split by <br /> tags first
  const parts = text.split(/<br\s*\/?>/i)

  if (parts.length === 1) {
    // No <br /> tags, just process <b> and <i>
    return processInlineTags(parts[0])
  }

  // Process each part and join with <br /> elements
  return parts.map((part, index) => {
    const processedPart = processInlineTags(part)

    if (index === parts.length - 1) {
      // Last part doesn't need a <br />
      return processedPart
    }

    return (
      <React.Fragment key={index}>
        {processedPart}
        <br />
      </React.Fragment>
    )
  })
}

/**
 * Process inline tags (<b> and <i>) within a text segment
 * Uses a simple approach that handles basic cases correctly
 */
const processInlineTags = text => {
  // Check if there are valid nested <b> or <i> tags (e.g., <b><i>text</i></b>)
  const hasNestedTags = /<(b|i)>\s*<(b|i)>.*<\/(b|i)>\s*<\/(b|i)>/i.test(text)
  if (hasNestedTags) {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return <span dangerouslySetInnerHTML={{ __html: escaped }} />
  }

  // Simple regex to match <b>content</b> and <i>content</i>
  // This handles the basic cases without complex nesting
  const tagRegex = /<(b|i)>([^<]*)<\/\1>/gi
  const parts = []
  let lastIndex = 0
  let match

  while ((match = tagRegex.exec(text)) !== null) {
    const [fullMatch, tag, content] = match

    // Add text before the tag
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Create the element
    const Element = tag === 'b' ? 'b' : 'i'
    parts.push(React.createElement(Element, { key: `${tag}-${parts.length}` }, content))

    lastIndex = match.index + fullMatch.length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 0 ? text : parts.length === 1 ? parts[0] : parts
}

export default parseSafeHtml
