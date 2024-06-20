import { act, render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import BreadcrumbMenu from '../BreadcrumbMenu';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock the useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

// Mock child components
jest.mock('../../modal/Modal', () => ({ onClose, modalName, children }) => (
    <div data-testid="modal">
        <h1>{modalName}</h1>
        <button onClick={onClose}>Close</button>
        {children}
    </div>
));
jest.mock('../../modal/DeleteBoardModalContent', () => ({ setShow, close }) => (
    <div>DeleteBoardModalContent Component</div>
));
jest.mock('../../taskBoard/DeveloperToolsTaskBoard', () => () => (
    <div>DeveloperToolsTaskBoard Component</div>
));

describe('BreadcrumbMenu Component', () => {
    beforeEach(() => {
        useTheme.mockReturnValue({ theme: 'light' });
    });

    test('Renders BreadcrumbMenu without crashing', () => {
        render(<BreadcrumbMenu />);

        const breadcrumb = screen.getByText('...');
        expect(breadcrumb).toBeInTheDocument();
        expect(breadcrumb).toHaveClass('light');
    });

    test('Shows options menu when breadcrumb is clicked', () => {
        render(<BreadcrumbMenu />);

        const breadcrumb = screen.getByText('...');
        fireEvent.click(breadcrumb);

        const optionsMenu = screen.getByText('DeveloperToolsTaskBoard Component');
        expect(optionsMenu).toBeInTheDocument();
    });

    test('Opens modal when delete option is clicked', () => {
        render(<BreadcrumbMenu />);

        const breadcrumb = screen.getByText('...');
        fireEvent.click(breadcrumb);

        const deleteOption = screen.getByText('Delete board');
        fireEvent.click(deleteOption);

        const modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();

        const modalHeader = screen.getByText('Delete board?');
        expect(modalHeader).toBeInTheDocument();
    });
});