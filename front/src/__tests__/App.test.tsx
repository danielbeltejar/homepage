import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    // Header fetches /api/posts/newest on mount
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ filename: 'test.md', title: 'Test', content: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders without crashing', async () => {
    render(<App />);
    expect(document.querySelector('div')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument());
  });
});
