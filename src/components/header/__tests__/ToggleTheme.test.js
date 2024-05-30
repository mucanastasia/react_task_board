import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        userEvent.click(toggleInput);
        expect(toggleInput).toBeChecked();

        userEvent.click(toggleInput);
        expect(toggleInput).not.toBeChecked();
    });
});