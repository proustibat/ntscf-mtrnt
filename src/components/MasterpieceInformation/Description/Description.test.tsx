import { render, screen } from '@testing-library/react';
import Description, {
  DescriptionProps,
} from '@/components/MasterpieceInformation/Description/index';
import userEvent from '@testing-library/user-event';

const props: DescriptionProps = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla nulla at ipsum venenatis, nec mattis dolor venenatis. Nullam ullamcorper eros neque, nec ornare neque venenatis ac. Nulla a massa sed ex aliquam laoreet. Praesent mi nunc, vehicula id scelerisque sed, fermentum vel purus. Phasellus est quam, imperdiet in finibus non, ornare in felis. Nullam in mauris at diam elementum suscipit rhoncus ut tellus. Quisque vitae tempus dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
};

describe('Description', () => {
  it('should render correctly', () => {
    // GVEN / WHEN
    render(<Description {...props} />);

    // THEN
    expect(screen.getByText(props.text)).toBeInTheDocument();
    expect(screen.getByText(props.text)).toHaveClass('hasEllipsis');
    expect(screen.getByRole('button')).toHaveTextContent('See more');
  });

  it('handles the read more button click', async () => {
    // GIVEN
    render(<Description {...props} />);

    // WHEN
    await userEvent.click(screen.getByRole('button', { name: /See more/i }));

    // THEN
    expect(screen.getByText(props.text)).not.toHaveClass('hasEllipsis');
    expect(screen.getByRole('button')).toHaveTextContent('See less');
  });

  it('handles the read less button click', async () => {
    // GIVEN
    render(<Description {...props} />);

    // WHEN
    await userEvent.click(screen.getByRole('button', { name: /See more/i }));
    await userEvent.click(screen.getByRole('button', { name: /See less/i }));

    // THEN
    expect(screen.getByText(props.text)).toHaveClass('hasEllipsis');
    expect(screen.getByRole('button')).toHaveTextContent('See more');
  });
});
