import { render, screen } from '@testing-library/react';
import { SectionProvider, useSection } from '../SectionContext';

const TestComponent = () => {
    const { sectionId, name } = useSection();
    return (
        <div className={`title_${sectionId}`} data-testid='sectionName'>
            {name}
        </div>
    );
};

describe('SectionContext', () => {
    test('Provides sectionId and name to components', () => {
        render(
            <SectionProvider sectionId='toDo' name='To Do'>
                <TestComponent />
            </SectionProvider>
        );

        expect(screen.getByTestId('sectionName')).toHaveTextContent('To Do');
        expect(screen.getByTestId('sectionName')).toHaveClass('title_toDo');
    });
});