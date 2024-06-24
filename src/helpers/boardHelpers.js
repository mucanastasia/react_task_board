import { getTasksFromLocalStorage, setBoardsInLocalStorage, deleteBoardFromLocalStorage } from '../services/localStorageService';

export default function boardHelpers(boards, setBoards) {

    const saveBoards = (updatedBoards) => {
        setBoards(updatedBoards);
        setBoardsInLocalStorage(updatedBoards);
    };

    const createBoard = (boardName) => {
        const newBoardId = Date.now();
        const newBoard = {
            id: newBoardId,
            name: boardName?.length > 0 ? boardName : 'Untitled board',
            path: `/boards/${newBoardId}`,
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

    const countTasksInBoard = (boardTasks) => {
        const data = new Map([
            ['Total', 0],
            ['To do', 0],
            ['In progress', 0],
            ['Done', 0]
        ]);

        data.set('Total', boardTasks.length);

        for (let task of boardTasks) {
            if (task.status === 'toDo') {
                data.set('To do', data.get('To do') + 1);
            } else if (task.status === 'inProgress') {
                data.set('In progress', data.get('In progress') + 1);
            } else if (task.status === 'done') {
                data.set('Done', data.get('Done') + 1);
            }
        }

        return Object.fromEntries(data);
    };

    const countTasksInAllBoards = () => {
        const data = new Map([
            ['Total', 0],
            ['To do', 0],
            ['In progress', 0],
            ['Done', 0]
        ]);

        for (let board of boards) {
            const boardTasks = getTasksFromLocalStorage(board.id);
            const boardData = countTasksInBoard(boardTasks);

            data.set('Total', data.get('Total') + boardData['Total']);
            data.set('To do', data.get('To do') + boardData['To do']);
            data.set('In progress', data.get('In progress') + boardData['In progress']);
            data.set('Done', data.get('Done') + boardData['Done']);
        }

        return Object.fromEntries(data);
    }

    return { addBoard, updateBoardName, deleteBoard, countTasksInBoard, countTasksInAllBoards }

};

