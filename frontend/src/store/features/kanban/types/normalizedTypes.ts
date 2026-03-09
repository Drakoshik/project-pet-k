import type { Card, List, Project } from './basicTypes.ts';

export interface NormalizedProject {
    project: Project;
    lists: List[];
    cards: Card[];
}

export interface NormalizedState {
    projects: {
        byId: Record<number, Project>;
        allIds: number[];
    };
    lists: {
        byId: Record<number, List>;
        allIds: number[];
    };
    cards: {
        byId: Record<number, Card>;
        allIds: number[];
    };
}
