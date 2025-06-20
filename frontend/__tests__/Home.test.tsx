import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home Dashboard', () => {
  it('renders navigation bar', () => {
    render(<Home />);
    expect(screen.getByText('Wisdomloop')).toBeInTheDocument();
  });
});
