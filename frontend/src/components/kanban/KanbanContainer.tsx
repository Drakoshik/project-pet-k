import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Item } from './types/kanban.ts';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { KanbanItem } from './KanbanItem.tsx';

interface KanbanContainerProps {
    id: string;
    title: string;
    items: Item[];
    onRemoveContainer?: () => void;
    onAddItem?: (containerId: string, content: string) => void;
    onRemoveItem?: (containerId: string, itemId: UniqueIdentifier) => void;
    onUpdateItem?: (
        containerId: string,
        itemId: UniqueIdentifier,
        newContent: string
    ) => void;
    isRemovable?: boolean;
}

export function KanbanContainer({
    id,
    title,
    items,
    onRemoveContainer,
    onAddItem,
    onRemoveItem,
    onUpdateItem,
    isRemovable = true,
}: KanbanContainerProps) {
    const { setNodeRef } = useDroppable({ id });
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState('');

    const handleAddTask = () => {
        if (newTaskContent.trim() && onAddItem) {
            onAddItem(id, newTaskContent); // ← Правильный вызов
            setNewTaskContent('');
            setIsAddingTask(false);
        }
    };

    const handleCancelAddTask = () => {
        setNewTaskContent('');
        setIsAddingTask(false);
    };

    return (
        <div
            ref={setNodeRef}
            className="min-w-80 max-h-[50vh] flex h-full flex-col rounded-md border
            border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50
            relative group"
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                    {title}
                </h3>
                {isRemovable && onRemoveContainer && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemoveContainer();
                        }}
                        className="opacity-0 group-hover:opacity-100
                                  transition-opacity
                        p-1 text-purple-300 hover:text-purple-500 rounded
                        focus:opacity-100 focus:outline-none"
                        title="Remove column"
                        aria-label={`Remove ${title} column`}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="flex flex-col gap-2 overflow-y-auto max-h-110 mb-2">
                        {items.map((item) => (
                            <KanbanItem
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                onRemove={(itemId: UniqueIdentifier) =>
                                    onRemoveItem?.(id, itemId)
                                }
                                onUpdate={(
                                    itemId: UniqueIdentifier,
                                    newContent: string
                                ) => onUpdateItem?.(id, itemId, newContent)}
                            />
                        ))}
                    </ul>
                </SortableContext>

                {isAddingTask ? (
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                        <textarea
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                            placeholder="Enter task content..."
                            className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded
                                     dark:bg-gray-600 dark:text-white text-sm resize-none"
                            rows={3}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.ctrlKey) {
                                    handleAddTask();
                                }
                                if (e.key === 'Escape') {
                                    handleCancelAddTask();
                                }
                            }}
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={handleAddTask}
                                className="px-2 py-1 bg-cyan-400  text-white text-xs rounded hover:bg-cyan-700 dark:hover:bg-cyan-900"
                                disabled={!newTaskContent.trim()}
                            >
                                Add
                            </button>
                            <button
                                onClick={handleCancelAddTask}
                                className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAddingTask(true)}
                        className="flex items-center gap-1 p-2 text-sm text-gray-600 dark:text-gray-400
                                 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors
                                 justify-center mt-auto"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                )}

                {items.length === 0 && !isAddingTask && (
                    <div
                        className="flex h-20 items-center justify-center rounded-md border border-dashed
                    border-cyan-300 bg-gray-50 dark:border-cyan-300 dark:bg-gray-800/30 mt-2"
                    >
                        <p className="text-sm text-purple-500 dark:text-purple-400">
                            Drop items here or add a task
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
