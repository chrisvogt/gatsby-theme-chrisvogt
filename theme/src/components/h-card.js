import React from 'react'

const HCard = () => (
  <div className='h-card' style={{ display: 'none' }}>
    <a className='p-name u-url u-uid' href='https://www.chrisvogt.me' rel='me'>
      Chris Vogt
    </a>
    <img
      className='u-photo'
      src='https://chrisvogt.imgix.net/ig/17948822426064646.jpg'
      alt='Chris Vogt'
      width='1440'
      height='810'
    />
    <p className='p-note'>
      Software engineer, pianist, and photographer in San Francisco. Writing about tech, music, and personal projects.
    </p>
    <a className='u-email' href='mailto:mail@chrisvogt.me'>
      mail@chrisvogt.me
    </a>
    <p className='p-given-name'>Chris</p>
    <p className='p-family-name'>Vogt</p>
    <p className='p-locality'>San Francisco</p>
    <abbr className='p-region' title='California'>
      CA
    </abbr>
    <div className='p-country-name'>U.S.A</div>
    <div className='p-category'>Software Developer</div>
  </div>
)

export default HCard
