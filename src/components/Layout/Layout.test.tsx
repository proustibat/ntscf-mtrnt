import { render, screen } from '@testing-library/react';
import Layout from '@/components/Layout/index';

describe('Layout', () => {
  it('renders children', () => {
    // GIVEN
    const text = 'hi there';
    const JSX = <Layout>{text}</Layout>;

    // WHEN
    render(JSX);

    // THEN
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
