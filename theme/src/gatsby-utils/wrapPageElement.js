import React from 'react';
import Head from '../../src/components/head';

const wrapPageElement = ({ element, props }) => (
  <>
    <Head />
    {element}
  </>
);

export default wrapPageElement
