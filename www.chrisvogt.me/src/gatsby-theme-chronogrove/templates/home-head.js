import React from 'react'
import Seo from '../../../../theme/src/components/seo'

export default function HomeHead() {
  return (
    <Seo
      title='Home'
      description="Explore Chris Vogt's digital garden. A Software Engineer in San Francisco, Chris shares his interest in photography, piano, and travel."
      keywords='Chris Vogt, Software Engineer in San Francisco, GoDaddy engineer blog, photography blog, piano recordings, travel blog, personal blog, digital garden'
    >
      <meta property='og:url' content='https://www.chrisvogt.me' />
      <meta property='og:type' content='website' />
      <script type='application/ld+json'>
        {`{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Chris Vogt",
          "url": "https://www.chrisvogt.me",
          "sameAs": [
            "https://linkedin.com/in/cjvogt",
            "https://github.com/chrisvogt",
            "https://x.com/c1v0",
            "https://twitter.com/c1v0",
            "https://www.instagram.com/c1v0",
            "https://stackoverflow.com/users/1391826/chris-vogt"
          ],
          "jobTitle": "Principal Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "GoDaddy"
          }
        }`}
      </script>
    </Seo>
  )
}
