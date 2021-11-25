import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Se her mens du venter/i);
  expect(linkElement).toBeInTheDocument();
});
