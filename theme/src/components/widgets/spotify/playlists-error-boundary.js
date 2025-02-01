import { Component } from 'react'

// This component is a temporary solution for an issue I've been observing the last month or two
// where the Spotify Widget response data is missing images for the playlists. This causes a fatal
// error in the component which takes down the entire Home page.
class PlaylistsErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in Playlists component:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Don't render anything if there's an error. Most visitors, if not all, won't realize
      // this is missing.
      return null
    }

    return this.props.children
  }
}

export default PlaylistsErrorBoundary
