import { render, screen } from '@testing-library/react';
import Modal from '../Modal';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

describe('Modal Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
    });

    test('Renders Modal without crashing (light mode)', () => {
        const handleClose = jest.fn();
        const modalName = 'Test Modal';
        const childrenContent = 'This is the modal content';

        render(
            <Modal onClose={handleClose} modalName={modalName}>
                {childrenContent}
            </Modal>
        );

        const modalOverlay = screen.getByTestId('modal-overlay');
        expect(modalOverlay).toBeInTheDocument();

        const modalContent = screen.getByTestId('modal-content');
        expect(modalContent).toBeInTheDocument();
        expect(modalContent).toHaveClass('light');

        const modalHeader = screen.getByText(modalName);
        expect(modalHeader).toBeInTheDocument();

        const modalBody = screen.getByText(childrenContent);
        expect(modalBody).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /×/ });
        expect(closeButton).toBeInTheDocument();
    });

    test('Renders Modal without crashing (dark mode)', () => {
        useTheme.mockReturnValue({ theme: 'dark' });
        const handleClose = jest.fn();
        const modalName = 'Test Modal';
        const childrenContent = 'This is the modal content';

        render(
            <Modal onClose={handleClose} modalName={modalName}>
                {childrenContent}
            </Modal>
        );

        const modalOverlay = screen.getByTestId('modal-overlay');
        expect(modalOverlay).toBeInTheDocument();

        const modalContent = screen.getByTestId('modal-content');
        expect(modalContent).toBeInTheDocument();
        expect(modalContent).toHaveClass('dark');

        const modalHeader = screen.getByText(modalName);
        expect(modalHeader).toBeInTheDocument();

        const modalBody = screen.getByText(childrenContent);
        expect(modalBody).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /×/ });
        expect(closeButton).toBeInTheDocument();
    });
});