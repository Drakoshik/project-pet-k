import { useState, useCallback } from 'react';
import type {
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DragCancelEvent,
} from '@dnd-kit/core';
import { type Container, KanbanDataService } from '../types/kanban.ts';
import { arrayMove } from '@dnd-kit/sortable';

export function useKanbanDrag(initialContainers: Container[]) {
    const [containers, setContainers] =
        useState<Container[]>(initialContainers);
    const [activeId, setActiveId] = useState<string | null>(null);
    const kanbanDataService = KanbanDataService.getInstance();

    // const [activeItem, setActiveItem] = useState<Item | null>(null);

    const activeItem = activeId
        ? (containers.flatMap((c) => c.items).find((i) => i.id === activeId) ??
          null)
        : null;

    const findContainerId = useCallback(
        (itemId: string) =>
            containers.find((c) => c.items.some((i) => i.id === itemId))?.id ??
            containers.find((c) => c.id === itemId)?.id ??
            null,
        [containers]
    );

    const handleDragStart = useCallback((event: DragStartEvent) => {
        // if (event.activatorEvent.target instanceof Element) {
        //     const button = event.activatorEvent.target.closest('button');
        //     if (button) {
        //         console.log('Drag заблоковано — це кнопка');
        //         return;
        //     }
        // }
        console.log(`handleDragStart`);
        setActiveId(event.active.id as string);
    }, []);

    const handleDragOver = useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event;
            if (!over) return;

            const activeId = active.id as string;
            const overId = over.id as string;

            const activeContainerId = findContainerId(activeId);
            const overContainerId = findContainerId(overId);

            if (!activeContainerId || !overContainerId) return;
            if (activeContainerId === overContainerId) return;

            setContainers((prev) => {
                const activeContainer = prev.find(
                    (c) => c.id === activeContainerId
                );
                if (!activeContainer) return prev;

                const activeItem = activeContainer.items.find(
                    (i) => i.id === activeId
                );

                if (!activeItem) return prev;

                return prev.map((container) => {
                    if (container.id === activeContainerId) {
                        return {
                            ...container,
                            items: container.items.filter(
                                (i) => i.id !== activeId
                            ),
                        };
                    }
                    if (container.id === overContainerId) {
                        if (overId === overContainerId) {
                            return {
                                ...container,
                                items: [...container.items, activeItem],
                            };
                        }
                        const overItemIndex = container.items.findIndex(
                            (i) => i.id === overId
                        );
                        if (overItemIndex !== -1) {
                            return {
                                ...container,
                                items: [
                                    ...container.items.slice(
                                        0,
                                        overItemIndex + 1
                                    ),
                                    activeItem,
                                    ...container.items.slice(overItemIndex + 1),
                                ],
                            };
                        }
                    }
                    return container;
                });
            });
        },
        [findContainerId]
    );

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            console.log(`handleDragEnd ${active} ${over}`);
            if (!over) {
                setActiveId(null);
                return;
            }

            const activeId = active.id as string;
            const overId = over.id as string;

            const activeContainerId = findContainerId(activeId);
            const overContainerId = findContainerId(overId);

            if (!activeContainerId || !overContainerId) {
                setActiveId(null);
                return;
            }

            if (
                activeContainerId === overContainerId &&
                active.id !== over.id
            ) {
                const containerIndex = containers.findIndex(
                    (c) => c.id === activeContainerId
                );
                if (containerIndex === -1) {
                    setActiveId(null);
                    return;
                }

                const container = containers[containerIndex];
                const activeIndex = container.items.findIndex(
                    (i) => i.id === active.id
                );
                const overIndex = container.items.findIndex(
                    (i) => i.id === over.id
                );

                if (activeIndex !== -1 && overIndex !== -1) {
                    const newItems = arrayMove(
                        container.items,
                        activeIndex,
                        overIndex
                    );
                    setContainers((containers) => {
                        return containers.map((c, index) => {
                            if (index === containerIndex) {
                                return {
                                    ...c,
                                    items: newItems,
                                };
                            }
                            return c;
                        });
                    });
                }

                setActiveId(null);
            }
            kanbanDataService.updateContainers([...containers]);
        },
        [findContainerId, containers]
    );

    const handleDragCancel = useCallback((event: DragCancelEvent) => {
        void event;
        setActiveId(null);
    }, []);

    return {
        containers,
        activeId,
        activeItem,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDragCancel,
        setContainers,
    };
}
