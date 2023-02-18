import { render, screen } from '@testing-library/react';
import MasterpieceInformation, {
  MasterpieceInformationProps,
} from '@/components/MasterpieceInformation/index';

const props: MasterpieceInformationProps = {
  data: {
    title: 'Sabers',
    composer: 'Stanley Myers',
    description: 'Listening to music while coding <3',
    illustration: 'myers.svg',
  },
};

describe('MasterpieceInformation', () => {
  it('should render correctly', () => {
    // GIVEN / WHEN
    render(<MasterpieceInformation {...props} />);

    // THEN
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      props.data.title
    );
    expect(screen.getByText('·')).toBeInTheDocument();
    expect(screen.getByText('·')).toBeVisible();
    expect(screen.getByText(props.data.composer)).toBeInTheDocument();
    expect(screen.getByText(props.data.description)).toBeInTheDocument();
    expect(screen.getByText(props.data.description)).toHaveClass('hasEllipsis');
    expect(screen.getByRole('button')).toHaveTextContent('See more');
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      props.data.illustration
    );
  });
});
