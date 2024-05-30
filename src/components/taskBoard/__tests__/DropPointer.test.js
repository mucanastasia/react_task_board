import { render, screen } from '@testing-library/react';
import DropPointer from '../DropPointer';
import { useTheme } from '../../../contexts/ThemeContext';

jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

describe('DropPointer Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
    });

    test('Renders DropPointer when show is true', () => {
        render(<DropPointer show={true} />);

        const dropPointer = screen.getByTestId('drop-pointer');
        expect(dropPointer).toBeInTheDocument();
        expect(dropPointer).toHaveClass('gap colorGap light');
    });

    test('Does not render DropPointer when show is false', () => {
        render(<DropPointer show={false} />);

        const dropPointer = screen.queryByTestId('drop-pointer');
        expect(dropPointer).not.toBeInTheDocument();
    });

    test('Applies correct theme class', () => {
        useTheme.mockReturnValue({ theme: 'dark' });

        render(<DropPointer show={true} />);

        const dropPointer = screen.getByTestId('drop-pointer');
        expect(dropPointer).toHaveClass('dark');
    });
});