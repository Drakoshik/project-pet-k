import {
    closestCorners,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    type UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useKanbanDrag } from './hooks/useKanbanDrag.ts';
import { KanbanContainer } from './KanbanContainer.tsx';
import { DragOverlayItem } from './DragOverlayItem.tsx';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import '../../styles/Scrolbar.css';
import { KanbanDataService } from './types/kanban.ts';

export function KanbanBoard() {
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const kanbanDataService = KanbanDataService.getInstance();
    const initialContainers = kanbanDataService.getContainers();

    const {
        containers,
        activeItem,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDragCancel,
        setContainers,
    } = useKanbanDrag(initialContainers);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
                delay: 0,
                tolerance: 5,
                // eventOptions: { passive: false },
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddColumn = () => {
        if (newColumnTitle.trim()) {
            const newContainer = kanbanDataService.addContainer(newColumnTitle);
            setContainers([...containers, newContainer]);
            setNewColumnTitle('');
            setIsAddingColumn(false);
        }
    };

    const handleCancelAddColumn = () => {
        setNewColumnTitle('');
        setIsAddingColumn(false);
    };

    const handleRemoveColumn = (containerId: string) => {
        kanbanDataService.removeContainer(containerId);
        setContainers(
            containers.filter((container) => container.id !== containerId)
        );
    };

    const handleRemoveItem = (
        containerId: string,
        itemId: UniqueIdentifier
    ) => {
        kanbanDataService.removeItem(containerId, itemId);
        setContainers([...kanbanDataService.getContainers()]);
    };

    const handleUpdateItem = (
        containerId: string,
        itemId: UniqueIdentifier,
        newContent: string
    ) => {
        kanbanDataService.updateItemContent(containerId, itemId, newContent);
        setContainers([...kanbanDataService.getContainers()]);
    };

    const handleAddItem = (containerId: string, content: string) => {
        kanbanDataService.addItem(containerId, content);
        setContainers([...kanbanDataService.getContainers()]);
    };

    return (
        <div className="w-full h-[calc(55vh)]">
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
                <div
                    className="styled-scrollbar
                        h-[55vh] gap-5 overflow-x-auto"
                >
                    <div className=" flex gap-5 pb-4">
                        {containers.map((container) => (
                            <KanbanContainer
                                key={container.id}
                                id={container.id}
                                title={container.title}
                                items={container.items}
                                onRemoveContainer={() =>
                                    handleRemoveColumn(container.id)
                                }
                                onAddItem={handleAddItem}
                                onRemoveItem={handleRemoveItem}
                                onUpdateItem={handleUpdateItem}
                            />
                        ))}

                        {isAddingColumn ? (
                            <div className="min-w-80 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                                <input
                                    type="text"
                                    value={newColumnTitle}
                                    onChange={(e) =>
                                        setNewColumnTitle(e.target.value)
                                    }
                                    placeholder="Enter column title..."
                                    className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    autoFocus
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddColumn();
                                        }
                                    }}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddColumn}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={handleCancelAddColumn}
                                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingColumn(true)}
                                className="min-w-80 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add Column
                            </button>
                        )}
                    </div>
                </div>
                <DragOverlay
                    adjustScale={false}
                    dropAnimation={{ duration: 150 }}
                >
                    {activeItem ? <DragOverlayItem item={activeItem} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
