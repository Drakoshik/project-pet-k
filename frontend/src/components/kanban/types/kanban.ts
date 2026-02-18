import type { UniqueIdentifier } from '@dnd-kit/core';
import containerData from '../../../mocks/Containers.ts';

export interface Item {
    id: UniqueIdentifier;
    content: string;
}

export interface Container {
    id: string;
    title: string;
    items: Item[];
}

export class KanbanDataService {
    private static instance: KanbanDataService;
    private containers: Container[];

    private constructor() {
        this.containers = containerData;
    }

    public static getInstance(): KanbanDataService {
        if (!KanbanDataService.instance) {
            KanbanDataService.instance = new KanbanDataService();
        }
        return KanbanDataService.instance;
    }

    public getContainers(): Container[] {
        return this.containers;
    }

    public addContainer(title: string): Container {
        const newContainer: Container = {
            id: `container-${Date.now()}`,
            title: title || 'New Column',
            items: [],
        };
        this.containers.push(newContainer);
        return newContainer;
    }

    public updateContainers(containers: Container[]): void {
        this.containers = containers;
    }

    public removeContainer(containerId: string): void {
        this.containers = this.containers.filter(
            (container) => container.id !== containerId
        );
    }

    public addItem(containerId: string, content: string): Item {
        const container = this.containers.find((c) => c.id === containerId);
        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }

        const newItem: Item = {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            content: content.trim(),
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
                item.content = newContent.trim();
            }
        }
    }
}
