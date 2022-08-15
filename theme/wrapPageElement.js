import React from 'react'
import PropTypes from 'prop-types'
import Layout from './src/components/layout'

// NOTE(chrisvogt): wraps the page element and sets persistent UI elements
const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired,
  props: PropTypes.object
}

export default wrapPageElement
