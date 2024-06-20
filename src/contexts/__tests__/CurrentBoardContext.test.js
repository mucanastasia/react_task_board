import { render, screen } from '@testing-library/react';
import { CurrentBoardProvider, useCurrentBoard } from '../CurrentBoardContext';

const TestComponent = () => {
    const { board } = useCurrentBoard();
    return (
        <div>
            <h5>{board.name}</h5>
            <p>{board.description}</p>
        </div>
    );
};

describe('CurrentBoardContext', () => {
    const board = { id: '1', name: 'Test Board', description: 'Test Description' };

    test('Provides board data', () => {
        render(
            <CurrentBoardProvider board={board}>
                <TestComponent />
            </CurrentBoardProvider>
        );

        expect(screen.getByText('Test Board')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
});