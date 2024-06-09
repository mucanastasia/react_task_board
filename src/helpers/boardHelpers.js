import { setBoardsInLocalStorage } from '../services/localStorageService';

export default function boardHelpers(boards, setBoards) {

    const saveBoards = (updatedBoards) => {
        setBoards(updatedBoards);
        setBoardsInLocalStorage(updatedBoards);
    };

    const createBoard = () => {
        const newBoardId = `board_${Date.now()}`;
        const newBoard = {
            id: newBoardId,
            name: `Untitled task board ${newBoardId}`,
            path: `/${newBoardId}`,
            isEditing: false,
        };
        return newBoard;
    };

    const addBoard = () => {
        const newBoard = createBoard();
        const updatedBoards = [...boards, newBoard];
        saveBoards(updatedBoards);
    };

    // const deleteBoard = () => { 

    // };

    const updateBoardName = (boardId, updatedBoardData) => {
        const updatedBoards = boards.map(board => board.id === boardId ? { ...board, ...updatedBoardData } : board);
        saveBoards(updatedBoards);
    };

    return { addBoard, updateBoardName }

};

