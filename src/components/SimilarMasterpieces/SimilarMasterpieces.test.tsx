import { render, screen } from '@testing-library/react';
import SimilarMasterpieces, {
  SimilarMasterpiecesInformationProps,
} from '@/components/SimilarMasterpieces/index';

const props: SimilarMasterpiecesInformationProps = {
  data: [
    {
      id: 'id1',
      title: 'title 1',
      composer: 'composer 1',
      illustration: 'illustration1.svg',
    },
    {
      id: 'id1=2',
      title: 'title 2',
      composer: 'composer 2',
      illustration: 'illustration2.svg',
    },
  ],
};

describe('SimilarMasterpieces', () => {
  it('should render correctly', () => {
    // GIVEN / WHEN
    render(<SimilarMasterpieces {...props} />);

    // THEN
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Similar Masterpieces'
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText(props.data[0].title)).toBeInTheDocument();
    expect(screen.getByText(props.data[0].composer)).toBeInTheDocument();
    expect(screen.getByText(props.data[1].title)).toBeInTheDocument();
    expect(screen.getByText(props.data[1].composer)).toBeInTheDocument();
  });
});
