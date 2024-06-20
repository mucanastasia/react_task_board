import { render, screen } from '@testing-library/react';
import BoardHeader from '../BoardHeader';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock child components
jest.mock('../ToggleTheme', () => () => <div>ToggleTheme Component</div>);
jest.mock('../BoardName', () => () => <div>BoardName Component</div>);
jest.mock('../BreadcrumbMenu', () => () => <div>BreadcrumbMenu Component</div>);

describe('BoardHeader Component', () => {
    test('Renders BoardHeader without crashing (light mode)', () => {
        useTheme.mockReturnValue({ theme: 'light' });
        const board = { name: 'Test Board' };

        render(<BoardHeader board={board} />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('light');
        expect(header).not.toHaveClass('dark');

        const boardName = screen.getByText('BoardName Component');
        expect(boardName).toBeInTheDocument();

        const breadcrumbMenu = screen.getByText('BreadcrumbMenu Component');
        expect(breadcrumbMenu).toBeInTheDocument();

        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(toggleTheme).toBeInTheDocument();
    });

    test('Renders BoardHeader without crashing (dark mode)', () => {
        useTheme.mockReturnValue({ theme: 'dark' });
        const board = { name: 'Test Board' };

        render(<BoardHeader board={board} />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('dark');
        expect(header).not.toHaveClass('light');

        const boardName = screen.getByText('BoardName Component');
        expect(boardName).toBeInTheDocument();

        const breadcrumbMenu = screen.getByText('BreadcrumbMenu Component');
        expect(breadcrumbMenu).toBeInTheDocument();

        const toggleTheme = screen.getByText('ToggleTheme Component');
        expect(toggleTheme).toBeInTheDocument();
    });
});