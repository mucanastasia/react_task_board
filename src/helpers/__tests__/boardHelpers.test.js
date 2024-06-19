import { setBoardsInLocalStorage, deleteBoardFromLocalStorage } from "../../services/localStorageService";
import boardHelpers from "../boardHelpers";

// Mock the localStorageService functions
jest.mock('../../services/localStorageService');

describe('boardHelpers', () => {
    let boards, setBoards, helpers;

    beforeEach(() => {
        boards = [
            { id: 1, name: 'Board 1', path: '/boards/1', isEditing: false },
            { id: 2, name: 'Board 2', path: '/boards/2', isEditing: false },
        ];
        setBoards = jest.fn();
        helpers = boardHelpers(boards, setBoards);
    });

    test('1 - addBoard adds a new board and calls setBoards and setBoardsInLocalStorage', () => {
        const boardName = 'New Board';
        const newBoard = helpers.addBoard(boardName);
        const expectedBoards = [...boards, expect.objectContaining({ name: boardName, path: expect.stringContaining('/boards/'), isEditing: false })];

        expect(setBoards).toHaveBeenCalledWith(expectedBoards);
        expect(setBoardsInLocalStorage).toHaveBeenCalledWith(expectedBoards);
        expect(newBoard).toEqual(expect.objectContaining({
            name: boardName,
            path: expect.stringContaining('/boards/'),
            isEditing: false,
        }));
    });

    test('2 - addBoard adds a new board with "Untitled board" if no name is given', () => {
        const newBoard = helpers.addBoard('');
        const expectedBoards = [...boards, expect.objectContaining({ name: 'Untitled board', path: expect.stringContaining('/boards/'), isEditing: false })];

        expect(setBoards).toHaveBeenCalledWith(expectedBoards);
        expect(setBoardsInLocalStorage).toHaveBeenCalledWith(expectedBoards);
        expect(newBoard).toEqual(expect.objectContaining({
            name: 'Untitled board',
            path: expect.stringContaining('/boards/'),
            isEditing: false,
        }));
    });

    test('3 - updateBoardName updates the name of an existing board and calls setBoards and setBoardsInLocalStorage', () => {
        const updatedBoardData = { name: 'Updated Board 1' };
        helpers.updateBoardName(1, updatedBoardData);
        const expectedBoards = [
            { id: 1, name: 'Updated Board 1', path: '/boards/1', isEditing: false },
            boards[1]
        ];

        expect(setBoards).toHaveBeenCalledWith(expectedBoards);
        expect(setBoardsInLocalStorage).toHaveBeenCalledWith(expectedBoards);
    });

    test('4 - deleteBoard deletes a board from the boards array and calls setBoards and deleteBoardFromLocalStorage', () => {
        helpers.deleteBoard(1);
        const expectedBoards = [boards[1]];

        expect(setBoards).toHaveBeenCalledWith(expectedBoards);
        expect(setBoardsInLocalStorage).toHaveBeenCalledWith(expectedBoards);
        expect(deleteBoardFromLocalStorage).toHaveBeenCalledWith(1);
    });

});