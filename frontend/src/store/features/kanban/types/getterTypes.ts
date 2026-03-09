import type { Card, List, Project } from './basicTypes';

export interface ProjectWithLists extends Project {
    lists: List[];
}

export interface ListWithCards extends List {
    cards: Card[];
}
