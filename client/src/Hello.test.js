import { render, screen } from '@testing-library/react';

import Hello from "./Hello"

test('render hello message with name', () => {

    render(<Hello name="Amit" />)
    const heading = screen.getByText(/Hello, Amit/i)
    expect(heading).toBeInTheDocument()

})