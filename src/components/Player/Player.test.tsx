import { render, screen } from '@testing-library/react';
import Player from '@/components/Player/index';

describe('Player', () => {
  it('should render correctly', () => {
    render(<Player />);
    expect(screen.getByText('Player')).toBeInTheDocument();
  });
});