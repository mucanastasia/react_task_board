import { fireEvent, render, screen } from '@testing-library/react';
import ToggleTheme from '../ToggleTheme';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

describe('BoardName Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({
            theme: 'light',
            toggleTheme: jest.fn(),
        });
    });

    test('Renders ToggleTheme without crashing', () => {
        render(<ToggleTheme />);

        const toggleContainer = screen.getByRole('switch');
        expect(toggleContainer).toBeInTheDocument();
        expect(toggleContainer).toHaveClass('switch__input');
    });

    test('Initial state based on theme', () => {
        useTheme.mockReturnValue({
            theme: 'dark',
            toggleTheme: jest.fn(),
        });

        render(<ToggleTheme />);

        const toggleInput = screen.getByRole('switch');
        expect(toggleInput).toBeInTheDocument();
        expect(toggleInput).toBeChecked();
    });

    test('Toggle theme on switch click', () => {
        useTheme.mockReturnValue({
            theme: 'light',
            toggleTheme: jest.fn(),
        });

        render(<ToggleTheme />);

        const toggleInput = screen.getByRole('switch');
        fireEvent.click(toggleInput);
        expect(toggleInput).toBeChecked();

        fireEvent.click(toggleInput);
        expect(toggleInput).not.toBeChecked();
    });
});