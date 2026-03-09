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
