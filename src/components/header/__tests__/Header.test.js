import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock child components
jest.mock('../ToggleTheme', () => () => <div>ToggleTheme Component</div>);

describe('Header Component', () => {
    test('Renders Header without crashing (light mode)', () => {
        useTheme.mockReturnValue({ theme: 'light' });
        const name = 'Test Header';

        render(<Header name={name} />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('light');
        expect(header).not.toHaveClass('dark');

        const doubleSlash = screen.getByTestId('double-slash');
        expect(doubleSlash).toBeInTheDocument();
        expect(doubleSlash).toHaveClass('light');

        const headerName = screen.getByRole('heading', { name });
        expect(headerName).toBeInTheDocument();
        expect(headerName).toHaveClass('light');

        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(toggleTheme).toBeInTheDocument();
    });

    test('Renders Header without crashing (dark mode)', () => {
        useTheme.mockReturnValue({ theme: 'dark' });
        const name = 'Test Header';

        render(<Header name={name} />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('dark');
        expect(header).not.toHaveClass('light');

        const doubleSlash = screen.getByTestId('double-slash');
        expect(doubleSlash).toBeInTheDocument();
        expect(doubleSlash).toHaveClass('dark');

        const headerName = screen.getByRole('heading', { name });
        expect(headerName).toBeInTheDocument();
        expect(headerName).toHaveClass('dark');

        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(toggleTheme).toBeInTheDocument();
    });
});