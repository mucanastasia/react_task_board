import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock child components
jest.mock('../BoardName', () => () => <div>BoardName Component</div>);
jest.mock('../ToggleTheme', () => () => <div>ToggleTheme Component</div>);

describe('Header Component', () => {
    test('Renders Header without crashing (light mode)', () => {
        useTheme.mockReturnValue({ theme: 'light' });

        render(<Header />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('light');
        expect(header).not.toHaveClass('dark');

        const boardName = screen.getByText('BoardName Component');
        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(boardName).toBeInTheDocument();
        expect(toggleTheme).toBeInTheDocument();
    });

    test('Renders Header without crashing (dark mode)', () => {
        useTheme.mockReturnValue({ theme: 'dark' });

        render(<Header />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('dark');
        expect(header).not.toHaveClass('light');

        const boardName = screen.getByText('BoardName Component');
        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(boardName).toBeInTheDocument();
        expect(toggleTheme).toBeInTheDocument();
    });
});