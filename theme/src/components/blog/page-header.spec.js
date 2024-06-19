import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import PageHeader from './page-header';

describe('PageHeader', () => {
  it('renders correctly with given children', () => {
    render(<PageHeader>Hello, World!</PageHeader>);
    const headingElement = screen.getByRole('heading', { name: /Hello, World!/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<PageHeader>Hello, World!</PageHeader>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
