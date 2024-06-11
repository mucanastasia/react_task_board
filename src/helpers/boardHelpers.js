import { setBoardsInLocalStorage, deleteBoardFromLocalStorage } from '../services/localStorageService';

export default function boardHelpers(boards, setBoards) {

    const saveBoards = (updatedBoards) => {
        setBoards(updatedBoards);
        setBoardsInLocalStorage(updatedBoards);
    };

    const createBoard = (boardName) => {
        const newBoardId = `board_${Date.now()}`;
        const newBoard = {
            id: newBoardId,
            name: boardName?.length > 0 ? boardName : 'Untitled board',
            path: `/${newBoardId}`,
            isEditing: false,
        };
        return newBoard;
    };

    const addBoard = (boardName) => {
        const newBoard = createBoard(boardName);
        const updatedBoards = [...boards, newBoard];
        saveBoards(updatedBoards);
        return (newBoard);
    };

    const updateBoardName = (boardId, updatedBoardData) => {
        const updatedBoards = boards.map(board => board.id === boardId ? { ...board, ...updatedBoardData } : board);
        saveBoards(updatedBoards);
    };

    const deleteBoard = (boardId) => {
        const updatedBoards = boards.filter(board => board.id !== boardId);
        saveBoards(updatedBoards);
        deleteBoardFromLocalStorage(boardId);
    };

    return { addBoard, updateBoardName, deleteBoard }

};

