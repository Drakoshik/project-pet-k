import { useState } from 'react';
import {
    closestCorners,
    DndContext,
    type DragCancelEvent,
    type DragEndEvent,
    type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    type UniqueIdentifier,
    useDroppable,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Item {
    id: string;
    content: string;
}

interface Container {
    id: string;
    title: string;
    items: Item[];
}

function SortableItem({
    id,
    content,
}: {
    id: UniqueIdentifier;
    content: string;
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : 'transform 300ms ease',
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`cursor-grab rounded-md border touch-none
            p-3 active:cursor-grabbing ${
                isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ' +
                      'z-10 opacity-50 shadow-md'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
            }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">⋮</span>
                <span className="dark:text-gray-200">{content}</span>
            </div>
        </li>
    );
}

function DroppableContainer({
    id,
    title,
    items,
}: {
    id: string;
    title: string;
    items: Item[];
}) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="flex h-full flex-col rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
        >
            <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
                {title}
            </h3>
            <div className="flex-1">
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="flex flex-col gap-2">
                        {items.map((item) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                content={item.content}
                            />
                        ))}
                    </ul>
                </SortableContext>
                {items.length === 0 && (
                    <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Drop items here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function KanbanComponent() {
    const [containers, setContainers] = useState<Container[]>([
        {
            id: 'todo',
            title: 'To Do',
            items: [
                {
                    id: 'task-1',
                    content: 'Research @dnd-kit',
                },
                {
                    id: 'task-2',
                    content: 'Create basic example',
                },
                {
                    id: 'task-3',
                    content: 'Write tutorial',
                },
            ],
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            items: [
                {
                    id: 'task-4',
                    content: 'Record demo video',
                },
            ],
        },
        {
            id: 'done',
            title: 'Done',
            items: [
                {
                    id: 'task-5',
                    content: 'Setup project',
                },
            ],
        },
    ]);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const activeItem = activeId
        ? (containers.flatMap((c) => c.items).find((i) => i.id === activeId) ??
          null)
        : null;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
                delay: 50,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function findContainerId(
        itemId: UniqueIdentifier
    ): UniqueIdentifier | undefined {
        if (containers.some((container) => container.id === itemId)) {
            return itemId;
        }
        return containers.find((container) =>
            container.items.some((item) => item.id === itemId)
        )?.id;
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        setActiveId(active.id);
    }

    function handleDragCancel(event: DragCancelEvent) {
        console.log('handleDragCancel');
        void event;
        setActiveId(null);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainerId = findContainerId(activeId);
        const overContainerId = findContainerId(overId);

        if (!activeContainerId || !overContainerId) {
            return;
        }

        console.log(
            `handleDragOver ${activeContainerId} ${overContainerId} 
            ${activeId} ${overId}`
        );

        if (activeContainerId === overContainerId && activeId !== overId) {
            return;
        }
        console.log('activeContainer not found 1');

        if (activeContainerId === overContainerId) {
            return;
        }
        console.log('activeContainer not found 2');

        setContainers((prev) => {
            const activeContainer = prev.find(
                (c) => c.id === activeContainerId
            );
            if (!activeContainer) {
                return prev;
            }

            const activeItem = activeContainer.items.find(
                (i) => i.id === activeId
            );

            if (!activeItem) return prev;

            const newContaienrs = prev.map((container) => {
                if (container.id === activeContainerId) {
                    return {
                        ...container,
                        items: container.items.filter((i) => i.id !== activeId),
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
                                ...container.items.slice(0, overItemIndex + 1),
                                activeItem,
                                ...container.items.slice(overItemIndex + 1),
                            ],
                        };
                    }
                }

                return container;
            });
            return newContaienrs;
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        console.log(`handleDragEnd ${active} ${over}`);
        if (!over) {
            setActiveId(null);
            return;
        }

        const activeContainerId = findContainerId(active.id);
        const overContainerId = findContainerId(over.id);

        if (!activeContainerId || !overContainerId) {
            setActiveId(null);
            return;
        }

        if (activeContainerId === overContainerId && active.id !== over.id) {
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
    }

    return (
        <div className="mx-auto w-full">
            <h2 className="mb-4 text-xl font-bold dark:text-white">
                Kanban Board
            </h2>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                onDragOver={handleDragOver}
            >
                <div className="grid gap-4 md:grid-cols-3">
                    {containers.map((container) => (
                        <DroppableContainer
                            key={container.id}
                            id={container.id}
                            title={container.title}
                            items={container.items}
                        />
                    ))}
                </div>
                <DragOverlay
                    adjustScale={false}
                    dropAnimation={{ duration: 150 }}
                >
                    {activeItem ? (
                        <li className="cursor-grabbing rounded-md border p-3 bg-white dark:bg-gray-800 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 dark:text-gray-400">
                                    ⋮
                                </span>
                                <span className="dark:text-gray-200">
                                    {activeItem.content}
                                </span>
                            </div>
                        </li>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
