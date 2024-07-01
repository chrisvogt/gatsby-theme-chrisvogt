import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';

// The document head <head><meta /><link /></head> component
const Head = () => {
  const { webmentionUrl } = useSiteMetadata();

  console.log(`THE WEBMENTION.IO URL IS: ${webmentionUrl}`)

  const metaTags = [
    {
      name: 'webmention',
      content: webmentionUrl,
    },
    {
      name: 'pingback',
      content: webmentionUrl.replace('/webmention', '/xmlrpc'),
    },
  ];

  return (
    <>
      <link rel="webmention" href="https://webmention.io/www.chrisvogt.me/webmention" />
    </>
  );
};

export default Head;
