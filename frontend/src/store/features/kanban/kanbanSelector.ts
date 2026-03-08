import { useSelector } from 'react-redux';
import type { RootState } from '../../configureStore';

export const useKanban = () => {
    const projects = useSelector((state: RootState) => state.kanban.projects);
    const lists = useSelector((state: RootState) => state.kanban.lists);
    const cards = useSelector((state: RootState) => state.kanban.cards);

    return {
        projects,
        lists,
        cards,
    };
};
