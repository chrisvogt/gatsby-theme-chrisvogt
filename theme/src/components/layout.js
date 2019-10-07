/** @jsx jsx */
import { Global } from "@emotion/core"
import { jsx, Styled } from "theme-ui"

import SEO from "./seo"
import TopNavigation from './top-navigation'

export default ({ children, ...props }) => (
  <Styled.root data-testid="theme-root">
    <Global
      styles={{
        body: {
          margin: 0,
          padding: 0,
          height: '100%',
          boxSizing: `border-box`,
          textRendering: `optimizeLegibility`,
          WebkitFontSmoothing: `antialiased`,
          MozOsxFontSmoothing: `grayscale`
        },
        "::selection": {
          backgroundColor: `primary`,
          color: `white`
        }
      }}
    />
    <SEO />
    <TopNavigation />
    {children}
  </Styled.root>
)
