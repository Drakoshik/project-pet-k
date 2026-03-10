import type { RootState } from '../../configureStore';
import { createSelector } from '@reduxjs/toolkit';
import type { ListWithCards, ProjectWithLists } from './types/getterTypes.ts';

const selectProjects = (state: RootState) => state.kanban.projects;
const selectLists = (state: RootState) => state.kanban.lists;
const selectCards = (state: RootState) => state.kanban.cards;

export const selectProjectWithLists = createSelector(
    [
        selectProjects,
        selectLists,
        (_state: RootState, projectId: number) => projectId,
    ],
    (projects, lists, projectId): ProjectWithLists | null => {
        const project = projects.byId[projectId];

        if (!project) return null;

        const projectLists = project.listIds
            .map((listId) => lists.byId[listId])
            .filter((list) => list !== undefined)
            .sort((a, b) => a.position - b.position);

        return {
            ...project,
            lists: projectLists,
        };
    }
);

export const selectListWithCards = createSelector(
    [selectLists, selectCards, (_state: RootState, listId: number) => listId],
    (lists, cards, listId): ListWithCards | null => {
        const list = lists.byId[listId];

        if (!list) return null;

        const listCards = list.cardIds
            .map((cardId) => cards.byId[cardId])
            .filter((card) => card !== undefined)
            .sort((a, b) => a.position - b.position);

        return {
            ...list,
            cards: listCards,
        };
    }
);

export const selectAllListsWithCards = createSelector(
    [
        selectProjects,
        selectLists,
        selectCards,
        (_state: RootState, projectId: number) => projectId,
    ],
    (projects, lists, cards, projectId): ListWithCards[] => {
        const project = projects.byId[projectId];

        if (!project) return [];

        return project.listIds
            .map((listId) => {
                const list = lists.byId[listId];
                if (!list) return null;

                const listCards = list.cardIds
                    .map((cardId) => cards.byId[cardId])
                    .filter((card) => card !== undefined)
                    .sort((a, b) => a.position - b.position);

                return {
                    ...list,
                    cards: listCards,
                };
            })
            .filter((list): list is ListWithCards => list !== null)
            .sort((a, b) => a.position - b.position);
    }
);

export const selectProjectWithFullData = createSelector(
    [
        selectProjects,
        selectLists,
        selectCards,
        (_state: RootState, projectId: number) => projectId,
    ],
    (
        projects,
        lists,
        cards,
        projectId
    ): (ProjectWithLists & { lists: ListWithCards[] }) | null => {
        const project = projects.byId[projectId];

        if (!project) return null;

        const listsWithCards = project.listIds
            .map((listId) => {
                const list = lists.byId[listId];
                if (!list) return null;

                const listCards = list.cardIds
                    .map((cardId) => cards.byId[cardId])
                    .filter((card) => card !== undefined)
                    .sort((a, b) => a.position - b.position);

                return {
                    ...list,
                    cards: listCards,
                };
            })
            .filter((list): list is ListWithCards => list !== null)
            .sort((a, b) => a.position - b.position);

        return {
            ...project,
            lists: listsWithCards,
        };
    }
);
