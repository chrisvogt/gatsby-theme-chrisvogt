/** @jsx jsx */
import { Container, jsx, Themed } from 'theme-ui'
import { Box, Flex } from '@theme-ui/components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const shortcodes = [
  {
    component: '<YouTube />',
    description: 'Renders a YouTube embed widget.'
  },
  {
    component: '<SoundCloud />',
    description: 'Renders a SoundCloud embedded audio player.'
  },
  {
    component: '<Emoji />',
    description: 'Wraps emoji characters rendered in article text.'
  }
]

const widgetMocks = [
  {
    widget: 'GitHub',
    fileName: 'github-widget.mock.json',
    href: 'https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/master/theme/__mocks__/github-widget.mock.json'
  },
  {
    widget: 'Goodreads',
    fileName: 'goodreads-widget.mock.json',
    href: 'https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/master/theme/__mocks__/goodreads-widget.mock.json'
  },
  {
    widget: 'Instagram',
    fileName: 'instagram.mock.json',
    href: 'https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/master/theme/__mocks__/instagram.mock.json'
  },
  {
    widget: 'Spotify',
    fileName: 'spotify.mock.json',
    href: 'https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/master/theme/__mocks__/spotify.mock.json'
  }
]

const AboutSitePage = () => (
  <Layout>
    <SEO
      title='About this site'
      description='A list of the most recent articles published on my blog.'
    />

    <Flex
      sx={{
        flexDirection: `column`,
        flexGrow: 1,
        py: 3
      }}
    >
      <Container sx={{ flexGrow: 1 }}>
        <Themed.h1>About this site</Themed.h1>

        <Flex sx={{ flexDirection: 'row-reverse' }}>
          <Box sx={{ flexBasis: '30%', flexShrink: 0 }}>
            <aside>
              <p>Table of Contents</p>

              <nav>
                <a href='#'>Overview</a>
                <a href='#'>Tech</a>
              </nav>
            </aside>
          </Box>

          <Box sx={{ flexBasis: '70%', flexShrink: 0 }}>
            <p>
              This website was first published around September of 2012 as a
              timeline of my social feeds. Over the next decade it evolved into
              the hybrid blog and social dashboard it is today.
            </p>

            <p></p>

            <Themed.h2>Architecture</Themed.h2>

            <p>
              This website is currently built on GatsbyJS, an open source React
              and Node.js framework with built-in tooling and features that make
              developing and maintaining a blog convenient. The code repository
              is a monorepo hosted on GitHub that contains both a Gatsby theme
              and this website.
            </p>

            <Themed.h3>Content</Themed.h3>

            <p>
              Content for this site is spread between Markdown and JSX files,
              with blog articles saved in MDX and many site pages directly in
              React components.
            </p>

            <Themed.h4>Shortcodes</Themed.h4>

            <p>
              This project ships with a collection of React shortcodes that can
              be used within the MDX Markdown to create and render reusable
              components across articles.
            </p>

            <Themed.table>
              <tr>
                <th>Component</th>
                <th>Description</th>
              </tr>
              {shortcodes.map(shortcode => (
                <tr key={shortcode.component}>
                  <td><pre>{shortcode.component}</pre></td>
                  <td>
                    {shortcode.description}
                  </td>
                </tr>
              ))}
            </Themed.table>

            <Themed.h3>Image Hosting</Themed.h3>

            <p>
              Images local to this domain are stored in Cloud Storage for
              Firebase and served via Imgix, which provides on-the-fly image
              manipulations and CDN caching. I also have some blog articles
              published containing images served by Cloudinary.
            </p>

            <Themed.h3>Widgets</Themed.h3>

            <p>
              The widgets on my home page are rendered using data fetched client
              side after page render. Each widget has both a loading state –
              using skeleton loaders as placeholders for content – and an error
              state in case something unexpected .
            </p>

            <p>
              Widget data is fetched from my personal Metrics API, an Express
              server hosted on Firebase that uses a collection of Cloud
              Functions to periodically fetch and cache data from various social
              APIs.
            </p>

            <Themed.h4>Dependencies</Themed.h4>

            <p>
              The embedded Miro board below is a data flow diagram showing the
              services behind the home page widgets.
            </p>

            <iframe
              width='100%'
              height='432'
              src='https://miro.com/app/live-embed/uXjVPfHnU9E=/?moveToViewport=-683,-894,1446,1337&embedId=597705594823'
              frameborder='0'
              scrolling='no'
              allowfullscreen
            ></iframe>

            <Themed.h4>Schema</Themed.h4>

            <p>
              Mock data for each widget is checked into the theme repository and
              linked in the table below.
            </p>

            <Themed.table>
              <tr>
                <th>Widget</th>
                <th>File Name</th>
              </tr>
              {widgetMocks.map(mock => (
                <tr key={mock.widget}>
                  <td>{mock.widget}</td>
                  <td>
                    <Themed.a href={mock.href}>{mock.fileName}</Themed.a>
                  </td>
                </tr>
              ))}
            </Themed.table>

            <Themed.h2>CI/CD Processes</Themed.h2>

            <p>
              This project uses a combination of open source tooling for
              continuous integration and continuous delivery (CI/CD).
            </p>

            <Themed.h3>Testing</Themed.h3>

            <p>
              Unit tests are checked into the repository and run using Jest.
              These include both traditional unit tests and snapshot tests. Each
              PR and deployment is gated by tests passing, which is done via a
              CircleCI integration. The build and code style are also validated
              before each PR can be merged or deployed.
            </p>

            <Themed.h3>Deploying Changes</Themed.h3>

            <p>
              The client for this website is hosted on Netlify. I use Netlify
              Deploy Previews to automatically build and deploy temporary
              preview sites where I manually test changes before they are
              deployed to Production.
            </p>

            <p>
              Whenever a PR is open or changed a deploy preview is automatically
              created. Likewise, whenever a PR is merged, tests run and then the
              new site build is automatically deployed to Production via
              Netlify.
            </p>

            <Themed.h3>Monitoring</Themed.h3>

            <p>
              I use New Relic and its single-page application (SPA) monitoring
              feature for application performance monitoring (APM). It logs,
              charts and lets me explore API request timings and errors.
            </p>
          </Box>
        </Flex>
      </Container>
    </Flex>
  </Layout>
)

export default AboutSitePage
