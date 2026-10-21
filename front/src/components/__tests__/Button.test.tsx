import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from '../Button';
import { faHome } from '@fortawesome/free-solid-svg-icons';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(<Button icon={faHome} />);
    const link = document.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct href when url provided', () => {
    render(<Button text="Go Home" url="/home" />);
    const link = screen.getByText('Go Home').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });
});
