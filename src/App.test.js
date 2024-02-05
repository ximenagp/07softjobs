import { render, screen } from '@testing-library/react';
import App from './App';

import {render, screen } from '@testing-library/react';
import App from './App';
it('should render learn react link', () => {
  render(<App />);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
