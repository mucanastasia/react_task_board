import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../contexts/ThemeContext', () => ({
    ThemeProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../contexts/BoardNameContext', () => ({
    BoardNameProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../contexts/TasksContext', () => ({
    TasksProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../components/taskBoard/TaskBoard', () => () => <div>TaskBoard Component</div>);
jest.mock('../components/header/Header', () => () => <div>Header Component</div>);

describe('App Component', () => {
    test('renders App without crashing', () => {
        render(<App />);

        expect(screen.getByText('Header Component')).toBeInTheDocument();
        expect(screen.getByText('TaskBoard Component')).toBeInTheDocument();
    });
});