import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from './404';
import { ThemeProvider } from 'theme-ui';

// Mock Layout component
jest.mock('../components/layout', () => ({ children }) => (
  <div className="layoutMock">{children}</div>
));

// Mock Lottie
jest.mock('lottie-react-web', () => ({ options, ref }) => (
  <div data-testid="lottie-animation">Lottie Animation</div>
));

// Mock Theme
const mockTheme = {
  colors: {
    'panel-background': '#f0f0f0',
  }
};

// Helper function to render with theme
const renderWithTheme = (component) =>
  render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

describe('404 Page', () => {
  it('renders correctly', () => {
    renderWithTheme(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    
    // Use a regular expression to match partial text
    expect(screen.getByText(/Lost in space\?/i)).toBeInTheDocument();
    
    // Check the home link separately
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/');
  });

  it('renders the Lottie animation', () => {
    renderWithTheme(<NotFoundPage />);
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });

  it('renders the Layout component', () => {
    renderWithTheme(<NotFoundPage />);
    expect(screen.getByText('Lottie Animation')).toBeInTheDocument();
    const layoutDiv = screen.getByText('Lottie Animation').closest('.layoutMock');
    expect(layoutDiv).toBeInTheDocument();
  });
});
