import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Since it has Router, just check it renders
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});