import { render, screen, fireEvent } from '@testing-library/react';
import { BoardNameProvider, useBoardName } from '../BoardNameContext';
import { getBoardNameFromLocalStorage, setBoardNameInLocalStorage } from '../../services/localStorageService';

jest.mock('../../services/localStorageService', () => ({
    getBoardNameFromLocalStorage: jest.fn(),
    setBoardNameInLocalStorage: jest.fn(),
}));

const TestComponent = () => {
    const { boardName, setBoardName } = useBoardName();
    return (
        <div>
            <h1 data-testid='boardName'>{boardName}</h1>
            <button onClick={() => setBoardName('New Board Name')}>Set Board Name</button>
        </div>
    );
};

describe('BoardNameContext', () => {
    beforeEach(() => {
        getBoardNameFromLocalStorage.mockReturnValue('Initial Board Name');
    });

    test('Provides initial board name from localStorage', () => {
        render(
            <BoardNameProvider>
                <TestComponent />
            </BoardNameProvider>
        );

        expect(screen.getByTestId('boardName')).toHaveTextContent('Initial Board Name');
    });

    test('Updates board name and calls setBoardNameInLocalStorage', () => {
        render(
            <BoardNameProvider>
                <TestComponent />
            </BoardNameProvider>
        );

        const button = screen.getByText('Set Board Name');
        fireEvent.click(button);

        expect(screen.getByTestId('boardName')).toHaveTextContent('New Board Name');
        expect(setBoardNameInLocalStorage).toHaveBeenCalledWith('New Board Name');
    });
});