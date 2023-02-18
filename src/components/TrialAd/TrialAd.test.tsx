import { render, screen } from '@testing-library/react';
import TrialAd, { TrialAdProps } from '@/components/TrialAd/index';

const props: TrialAdProps = {
  data: {
    title: 'title',
    description: 'description',
    cta: 'click me',
  },
};

describe('TrialAd', () => {
  it('should render correctly', () => {
    // GIVEN
    const {
      data: { title, description, cta },
    } = props;

    // WHEN
    render(<TrialAd {...props} />);

    // THEN
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(cta);
  });
});
