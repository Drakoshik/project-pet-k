import { useSelector } from 'react-redux';
import type { RootState } from '../../configureStore';
import {
    selectAllListsWithCards,
    selectListWithCards,
    selectProjectWithFullData,
    selectProjectWithLists,
} from './kanbanSelector.ts';

export const useProjects = () =>
    useSelector((state: RootState) => state.kanban.projects);
export const useLists = () =>
    useSelector((state: RootState) => state.kanban.lists);
export const useCards = () =>
    useSelector((state: RootState) => state.kanban.cards);

export const useProject = (projectId: number) =>
    useSelector((state: RootState) => state.kanban.projects.byId[projectId]);

export const useList = (listId: number) =>
    useSelector((state: RootState) => state.kanban.lists.byId[listId]);

export const useCard = (cardId: number) =>
    useSelector((state: RootState) => state.kanban.cards.byId[cardId]);

export const useProjectWithLists = (projectId: number) =>
    useSelector((state: RootState) => selectProjectWithLists(state, projectId));

export const useListWithCards = (listId: number) =>
    useSelector((state: RootState) => selectListWithCards(state, listId));

export const useAllListsWithCards = (projectId: number) =>
    useSelector((state: RootState) =>
        selectAllListsWithCards(state, projectId)
    );

export const useProjectWithFullData = (projectId: number) =>
    useSelector((state: RootState) => {
        return selectProjectWithFullData(state, projectId);
    });
