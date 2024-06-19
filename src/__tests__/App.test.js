import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { useBoard } from '../contexts/BoardContext';
import { useSidebar } from '../contexts/SidebarContext';

jest.mock('../contexts/BoardContext', () => ({
    useBoard: jest.fn(),
}));

jest.mock('../contexts/SidebarContext', () => ({
    useSidebar: jest.fn(),
}));

jest.mock('../components/sidebar/Sidebar', () => () => <div>Sidebar Component</div>);
jest.mock('../components/home/Home', () => () => <div>Home Component</div>);
jest.mock('../components/statistics/Statistics', () => () => <div>Statistics Component</div>);
jest.mock('../components/taskBoard/TaskBoard', () => ({ board }) => <div>TaskBoard Component for {board.name}</div>);

describe('App Component', () => {
    beforeEach(() => {
        useBoard.mockReturnValue({
            boards: [
                { id: 1, name: 'Board 1', path: '/boards/1' },
                { id: 2, name: 'Board 2', path: '/boards/2' },
            ],
        });

        useSidebar.mockReturnValue({
            isOpen: true,
        });
    });

    test('renders App without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Sidebar Component')).toBeInTheDocument();
        expect(screen.getByText('Home Component')).toBeInTheDocument();
    });

    test('renders Statistics Component when navigating to /stats', () => {
        render(
            <MemoryRouter initialEntries={['/stats']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Statistics Component')).toBeInTheDocument();
    });

    test('renders TaskBoard Component for Board 1 when navigating to /boards/1', () => {
        render(
            <MemoryRouter initialEntries={['/boards/1']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('TaskBoard Component for Board 1')).toBeInTheDocument();
    });

    test('renders TaskBoard Component for Board 2 when navigating to /boards/2', () => {
        render(
            <MemoryRouter initialEntries={['/boards/2']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('TaskBoard Component for Board 2')).toBeInTheDocument();
    });

    test('renders the correct margin when sidebar is open', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const contentDiv = screen.getByTestId('content');
        expect(contentDiv).toHaveStyle('margin-left: 240px');
    });

    test('renders the correct margin when sidebar is closed', () => {
        useSidebar.mockReturnValue({
            isOpen: false,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const contentDiv = screen.getByTestId('content');
        expect(contentDiv).toHaveStyle('margin-left: 64px');
    });
});