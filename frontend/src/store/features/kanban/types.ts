export interface Project {
    id: number;
    name: string;
    description?: string;
    listIds: number[];
}

export interface List {
    id: number;
    title: string;
    position: number;
    projectId: number;
    cardIds: number[];
}

export interface Card {
    id: number;
    title: string;
    description?: string;
    position: number;
    listId: number;
    assigneeId?: number;
}

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
