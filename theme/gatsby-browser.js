import 'prismjs/themes/prism-solarizedlight.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import './src/styles/global.css'

import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key='sidekickai-config'
      dangerouslySetInnerHTML={{
        __html: `
          window.__sidekickai = { key: '${process.env.GATSBY_SIDEKICK_API_KEY}' };
        `,
      }}
    />,
  ]);
};


export { default as wrapRootElement } from './wrapRootElement'
