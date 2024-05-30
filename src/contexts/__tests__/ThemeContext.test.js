import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { getThemeFromLocalStorage, setThemeInLocalStorage } from '../../services/localStorageService';

jest.mock('../../services/localStorageService', () => ({
    getThemeFromLocalStorage: jest.fn(),
    setThemeInLocalStorage: jest.fn(),
}));

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid='theme'>{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        getThemeFromLocalStorage.mockReturnValue('light');
        document.body.className = '';
    });

    test('Provides initial theme from localStorage', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
    });

    test('Toggles theme and updates localStorage', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByText('Toggle Theme');
        fireEvent.click(button);

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark');
        expect(setThemeInLocalStorage).toHaveBeenCalledWith('dark');

        fireEvent.click(button);

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
        expect(setThemeInLocalStorage).toHaveBeenCalledWith('light');
    });
});