import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PlatformArchitecture from '../components/PlatformArchitecture';

describe('PlatformArchitecture', () => {
  const defaultProps = {
    isOpen: false,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(<PlatformArchitecture {...defaultProps} />);
    expect(screen.queryByTestId('architecture-overlay')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('architecture-overlay')).toBeInTheDocument();
  });

  it('displays the title "Platform Architecture"', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('overlay-title')).toHaveTextContent('Platform Architecture');
  });

  it('renders all 5 pipeline steps', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    const steps = screen.getAllByTestId(/^pipeline-step-/);
    expect(steps).toHaveLength(5);
  });

  it('renders server components section', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('server-components')).toBeInTheDocument();
  });

  it('renders dual ingress (online + local) card', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('edge-layer')).toBeInTheDocument();
  });

  it('renders environments section (pre + pro)', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByText(/Environments.*pre.*pro/)).toBeInTheDocument();
  });

  it('renders service template section (front + apigw + backend)', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByText(/Service Template/)).toBeInTheDocument();
  });

  it('renders infrastructure tools section', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('infra-tools')).toBeInTheDocument();
  });

  it('renders all 5 infrastructure tools', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    const tools = ['cilium', 'longhorn', 'prometheus', 'loki', 'vault'];
    tools.forEach(tool => {
      expect(screen.getByTestId(`infra-${tool}`)).toBeInTheDocument();
    });
  });

  it('renders key numbers section', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByTestId('key-numbers')).toBeInTheDocument();
  });

  it('renders all 4 metrics', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    const metrics = ['projects-deployed', 'k8s-namespaces', 'ci-cd-stages', 'auto-rollback'];
    metrics.forEach(metric => {
      expect(screen.getByTestId(`metric-${metric}`)).toBeInTheDocument();
    });
  });

  it('shows 40+ K8s namespaces', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByText('40+')).toBeInTheDocument();
  });

  it('does not have a close button (uses backdrop/ESC to close)', () => {
    render(<PlatformArchitecture isOpen onClose={() => {}} />);
    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside the content', () => {
    const onClose = vi.fn();
    render(<PlatformArchitecture isOpen onClose={onClose} />);
    fireEvent.click(screen.getByTestId('architecture-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('uses overscroll-contain instead of body scroll lock', () => {
    const { container } = render(<PlatformArchitecture {...defaultProps} isOpen />);
    const overlay = container.querySelector('[data-testid="architecture-overlay"]');
    expect(overlay).toHaveClass('overscroll-contain');
    expect(document.body.style.overflow).toBe('');
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<PlatformArchitecture isOpen onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closed', () => {
    const onClose = vi.fn();
    render(<PlatformArchitecture {...defaultProps} isOpen={false} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not affect body overflow on unmount', () => {
    const { unmount } = render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(document.body.style.overflow).toBe('');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('displays the section titles', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByText('The CI/CD Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Global Architecture')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure at a Glance')).toBeInTheDocument();
  });

  it('pipeline steps contain correct titles', () => {
    render(<PlatformArchitecture {...defaultProps} isOpen />);
    expect(screen.getByText('Push to GitHub')).toBeInTheDocument();
    expect(screen.getByText('Jenkins Builds in Ephemeral Pods')).toBeInTheDocument();
    expect(screen.getByText('Image Pushed to Harbor')).toBeInTheDocument();
    expect(screen.getByText('Helm Chart Published')).toBeInTheDocument();
    expect(screen.getByText('ArgoCD Deploys to Kubernetes')).toBeInTheDocument();
  });
});
