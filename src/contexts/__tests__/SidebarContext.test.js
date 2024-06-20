import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarProvider, useSidebar } from '../SidebarContext';
import { getSidebarStatusFromLocalStorage, setSidebarStatusInLocalStorage } from '../../services/localStorageService';

jest.mock('../../services/localStorageService', () => ({
    getSidebarStatusFromLocalStorage: jest.fn(),
    setSidebarStatusInLocalStorage: jest.fn(),
}));

const TestComponent = () => {
    const { isOpen, setIsOpen } = useSidebar();
    return (
        <div>
            <div data-testid="sidebar-status">{isOpen ? 'Open' : 'Closed'}</div>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</button>
        </div>
    );
};

describe('SidebarProvider', () => {
    beforeEach(() => {
        getSidebarStatusFromLocalStorage.mockReturnValue(true);
    });

    test('initializes with sidebar status from local storage', () => {
        render(
            <SidebarProvider>
                <TestComponent />
            </SidebarProvider>
        );

        const statusDiv = screen.getByTestId('sidebar-status');
        expect(statusDiv.textContent).toBe('Open');
    });

    test('updates local storage when sidebar status changes', () => {
        render(
            <SidebarProvider>
                <TestComponent />
            </SidebarProvider>
        );

        const button = screen.getByText('Toggle Sidebar');
        fireEvent.click(button);

        expect(setSidebarStatusInLocalStorage).toHaveBeenCalledWith(false);

        const statusDiv = screen.getByTestId('sidebar-status');
        expect(statusDiv.textContent).toBe('Closed');
    });

    test('provides the isOpen and setIsOpen values to its children', () => {
        render(
            <SidebarProvider>
                <TestComponent />
            </SidebarProvider>
        );

        const statusDiv = screen.getByTestId('sidebar-status');
        expect(statusDiv.textContent).toBe('Open');

        const button = screen.getByText('Toggle Sidebar');
        fireEvent.click(button);

        expect(statusDiv.textContent).toBe('Closed');
    });
});