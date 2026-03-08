import type { UniqueIdentifier } from '@dnd-kit/core';
import containerData from '../../../mocks/Containers.ts';

export interface Card {
    id: UniqueIdentifier;
    title?: string;
    description?: string;
    position?: number;
    assigneeId?: number;
}

export interface List {
    id: string;
    title: string;
    position?: number;
    items: Card[];
}

export class KanbanDataService {
    private static instance: KanbanDataService;
    private containers: List[];

    private constructor() {
        this.containers = containerData;
    }

    public setContainers(containers: List[]): void {
        this.containers = containers;
    }

    public static getInstance(): KanbanDataService {
        if (!KanbanDataService.instance) {
            KanbanDataService.instance = new KanbanDataService();
        }
        return KanbanDataService.instance;
    }

    public getContainers(): List[] {
        return this.containers;
    }

    public addContainer(title: string): List {
        const newContainer: List = {
            id: `container-${Date.now()}`,
            title: title || 'New Column',
            items: [],
        };
        this.containers.push(newContainer);
        return newContainer;
    }

    public updateContainers(containers: List[]): void {
        this.containers = containers;
    }

    public removeContainer(containerId: string): void {
        this.containers = this.containers.filter(
            (container) => container.id !== containerId
        );
    }

    public addItem(containerId: string, content: string): Card {
        const container = this.containers.find((c) => c.id === containerId);
        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }

        const newItem: Card = {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            description: content.trim(),
        };

        container.items.push(newItem);
        return newItem;
    }

    public removeItem(containerId: string, itemId: UniqueIdentifier): void {
        const container = this.containers.find((c) => c.id === containerId);
        if (container) {
            container.items = container.items.filter(
                (item) => item.id !== itemId
            );
        }
    }

    public updateItemContent(
        containerId: string,
        itemId: UniqueIdentifier,
        newContent: string
    ): void {
        const container = this.containers.find((c) => c.id === containerId);
        if (container) {
            const item = container.items.find((i) => i.id === itemId);
            if (item) {
                item.description = newContent.trim();
            }
        }
    }
}
