/** @jsx jsx */
import { Container, jsx, Themed } from 'theme-ui'
import { Flex } from '@theme-ui/components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const AboutMePage = () => (
  <Layout>
    <SEO
      title='About Me'
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
          <Themed.h1>
            About Me
          </Themed.h1>

          <p>
            I'm a Senior Software Engineer at GoDaddy who currently works on customer dashboards and the logged-in experience shown to all small businesses accounts. I've also called San Francisco home since 2016 and currently reside in Duboce Triangle after 5 years living in Glen Park. My main hobbies are coding, photography and playing piano, but I have a wide variety of interests that I dedicate time and energy towards.
          </p>

          <p>
            In August 2022 I celebrated my 5-year anniversary at GoDaddy. I originally joined GoDaddy to work on a product team building customer dashboards driven by intelligent recommendations that guide customers towards activities known to improve traffic and conversions on thir sites. We also built social integrations with Facebook, Instagram and Twitter so customers could market their products and websites on those channels.
          </p>

          <p>
            Over 5 years I've worked on a wide range of projects at work. My favorite and most recent has been a new logged-in experience that provides customers a project-focused way to view and manage their products instead of presenting their account as a collection of unconnected products. I created the software design documents and was tech lead on an agile team that built and maintained many of the features of that project. Nowadays I find myself contributing to a collection of projects focused around the customer experience and the services that power those projects.
          </p>

          <p>
            When not working I'm most likely exploring the Bay Area via BART or car with a camera strapped to my shoulder; or I'm crawling through unfamiliar neighborhoods with a group of friends, looking for dog-friendly bars with pool tables; or I'm rearranging furniture in an endless attempt find the most optimal and pleasing living arrangement; or I'm out at the Greek Theater or at some small spot off Divisidero listening to live music; or perhaps I'm playing a simulation or base-building game on the PC.
          </p>
        </Container>
      </Flex>
  </Layout>
);

export default AboutMePage;
