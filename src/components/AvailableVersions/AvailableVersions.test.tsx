import { render, screen } from '@testing-library/react';
import AvailableVersions, {
  AvailableVersionsProps,
} from '@/components/AvailableVersions/index';

const props: AvailableVersionsProps = {
  data: {
    title: 'title',
    instrument: 'piano',
    versions: [
      {
        id: '1',
        title: 'version 1',
        description: 'bla bli blu',
        current: false,
      },
      {
        id: '2',
        title: 'version 2',
        description: 'bla bli blu',
        current: true,
      },
      {
        id: '3',
        title: 'version 3',
        description: 'bla bli blu',
        current: false,
      },
    ],
  },
};

describe('AvailableVersions', () => {
  it('should render correctly', () => {
    // GIVEN
    const {
      data: { title, instrument, versions },
    } = props;
    const jsx = <AvailableVersions {...props} />;

    // WHEN
    render(jsx);

    // THEN
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
    expect(screen.getByText(instrument)).toBeInTheDocument();
    expect(screen.getByText(versions[1].title)).toBeInTheDocument();
  });

  // TODO
  // it('handles the selection of another version', () => {
  //
  // })
});
