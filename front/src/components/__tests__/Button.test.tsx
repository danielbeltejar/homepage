import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Button from '../Button';
import { faHome } from '@fortawesome/free-solid-svg-icons';

describe('Button', () => {
  test('renders with text', () => {
    render(
      <MemoryRouter>
        <Button text="Click me" />
      </MemoryRouter>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(
      <MemoryRouter>
        <Button icon={faHome} />
      </MemoryRouter>
    );
    const link = document.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Button text="Click me" onClick={handleClick} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct href when url provided', () => {
    render(
      <MemoryRouter>
        <Button text="Go Home" url="/home" />
      </MemoryRouter>
    );
    const link = screen.getByText('Go Home').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });
});