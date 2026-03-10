import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Card, List, Project } from './types/basicTypes.ts';
import type { NormalizedState } from './types/normalizedTypes.ts';

const initialState: NormalizedState = {
    projects: { byId: {}, allIds: [] },
    lists: { byId: {}, allIds: [] },
    cards: { byId: {}, allIds: [] },
};

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setProjectData: (
            state,
            action: PayloadAction<{
                project: Project;
                lists: List[];
                cards: Card[];
            }>
        ) => {
            const { project, lists, cards } = action.payload;

            state.projects.byId[project.id] = project;
            if (!state.projects.allIds.includes(project.id)) {
                state.projects.allIds.push(project.id);
            }

            lists.forEach((list) => {
                state.lists.byId[list.id] = list;
                if (!state.lists.allIds.includes(list.id)) {
                    state.lists.allIds.push(list.id);
                }
            });

            cards.forEach((card) => {
                state.cards.byId[card.id] = card;
                if (!state.cards.allIds.includes(card.id)) {
                    state.cards.allIds.push(card.id);
                }
            });
        },

        addCard: (state, action: PayloadAction<Card>) => {
            const card = action.payload;

            state.cards.byId[card.id] = card;
            state.cards.allIds.push(card.id);

            const list = state.lists.byId[card.listId];
            if (list) {
                list.cardIds = [...list.cardIds, card.id].sort((a, b) => {
                    const cardA = state.cards.byId[a];
                    const cardB = state.cards.byId[b];
                    return cardA.position - cardB.position;
                });
            }
        },

        updateCard: (
            state,
            action: PayloadAction<Partial<Card> & { id: number }>
        ) => {
            const { id, ...changes } = action.payload;
            const existingCard = state.cards.byId[id];

            if (existingCard) {
                state.cards.byId[id] = { ...existingCard, ...changes };
            }
        },

        moveCard: (
            state,
            action: PayloadAction<{
                cardId: number;
                sourceListId: number;
                destinationListId: number;
                newPosition: number;
            }>
        ) => {
            const { cardId, sourceListId, destinationListId, newPosition } =
                action.payload;

            const sourceList = state.lists.byId[sourceListId];
            sourceList.cardIds = sourceList.cardIds.filter(
                (id) => id !== cardId
            );

            const destList = state.lists.byId[destinationListId];
            destList.cardIds.splice(newPosition, 0, cardId);

            state.cards.byId[cardId].listId = destinationListId;

            destList.cardIds.forEach((id, index) => {
                state.cards.byId[id].position = index;
            });
        },

        addList: (state, action: PayloadAction<List>) => {
            const list = action.payload;

            state.lists.byId[list.id] = list;
            state.lists.allIds.push(list.id);

            const project = state.projects.byId[list.projectId];
            if (project) {
                project.listIds = [...project.listIds, list.id];
            }
        },
    },
});

export const { setProjectData, addCard, updateCard, moveCard, addList } =
    kanbanSlice.actions;

export default kanbanSlice.reducer;
