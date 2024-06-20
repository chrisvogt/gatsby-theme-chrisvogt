import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeTemplate from './home';
import { useStaticQuery, graphql } from 'gatsby';

// Mock components
jest.mock('../components/top-navigation', () => () => <div>TopNavigation</div>);
jest.mock('../components/home-navigation', () => () => <nav>HomeNavigation</nav>);
jest.mock('../components/home-widgets', () => () => <div data-testid="home-widgets">HomeWidgets</div>);

// Mock the data returned by the GraphQL query
const mockData = {
  site: {
    siteMetadata: {
      avatarURL: 'https://example.com/avatar.jpg',
      description: 'Test Description',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
      title: 'Test Title',
      titleTemplate: '%s · Test Site'
    }
  }
};

// Mock the useStaticQuery hook
beforeEach(() => {
  useStaticQuery.mockReturnValue(mockData);
});

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
  useStaticQuery: jest.fn()
}));

describe('HomeTemplate', () => {
  it('renders correctly with given data', () => {
    render(<HomeTemplate data={mockData} />);
  });

  it('renders HomeNavigation component', () => {
    render(<HomeTemplate data={mockData} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders HomeWidgets component', () => {
    render(<HomeTemplate data={mockData} />);
    expect(screen.getByTestId('home-widgets')).toBeInTheDocument();
  });
});
