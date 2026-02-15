// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import type { UniqueIdentifier } from '@dnd-kit/core';
//
// export function KanbanItem({
//     id,
//     content,
// }: {
//     id: UniqueIdentifier;
//     content: string;
// }) {
//     const { attributes, listeners, setNodeRef, transform, isDragging } =
//         useSortable({ id });
//
//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition: isDragging ? 'none' : 'transform 300ms ease',
//     };
//
//     return (
//         <li
//             ref={setNodeRef}
//             style={style}
//             {...attributes}
//             {...listeners}
//             className={`cursor-grab rounded-md border touch-none
//             p-3 active:cursor-grabbing ${
//                 isDragging
//                     ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ' +
//                       'z-10 opacity-50 shadow-md'
//                     : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
//             }`}
//         >
//             <div className="flex items-center gap-3">
//                 <span className="text-gray-500 dark:text-gray-400">⋮</span>
//                 <span className="dark:text-gray-200">{content}</span>
//             </div>
//         </li>
//     );
// }

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

interface KanbanItemProps {
    id: UniqueIdentifier;
    content: string;
    onRemove?: (id: UniqueIdentifier) => void;
    onUpdate?: (id: UniqueIdentifier, newContent: string) => void;
}

export function KanbanItem({
    id,
    content,
    onRemove,
    onUpdate,
}: KanbanItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleSaveEdit = () => {
        if (editedContent.trim() && onUpdate) {
            onUpdate(id, editedContent);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedContent(content);
        setIsEditing(false);
    };

    return (
        <li ref={setNodeRef} style={style}>
            {isEditing ? (
                <div className="space-y-2">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded
                                 dark:bg-gray-600 dark:text-white text-sm resize-none"
                        rows={3}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                                handleSaveEdit();
                            }
                            if (e.key === 'Escape') {
                                handleCancelEdit();
                            }
                        }}
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={handleSaveEdit}
                            className="px-2 py-1 bg-cyan-400 text-white text-xs rounded hover:bg-cyan-700"
                            disabled={!editedContent.trim()}
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="group relative ">
                    <div
                        {...attributes}
                        {...listeners}
                        className="p-3 rounded-md border border-gray-200 bg-white
                dark:border-gray-600 dark:bg-gray-700 dark:text-white
                cursor-grab active:cursor-grabbing"
                    >
                        <div className="text-sm break-words cursor-grab">
                            {content}
                        </div>
                    </div>

                    <div
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100
                                  transition-opacity flex gap-1 bg-white dark:bg-gray-700 rounded"
                    >
                        {onUpdate && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Edit button clicked');
                                    setIsEditing(true);
                                }}
                                className="p-1 text-cyan-400 hover:text-cyan-700 rounded"
                                title="Edit task"
                            >
                                <Edit2 className="w-3 h-3" />
                            </button>
                        )}
                        {onRemove && (
                            <button
                                onClick={(e) => {
                                    console.log('Remove button clicked');
                                    e.stopPropagation();
                                    onRemove(id);
                                }}
                                className="p-1 text-purple-300 hover:text-purple-500 rounded"
                                title="Delete task"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
}
