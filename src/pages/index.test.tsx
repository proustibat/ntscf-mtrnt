import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders the page', () => {
    // GIVEN / WHEN
    render(<Home />);

    // THEN
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });
});
