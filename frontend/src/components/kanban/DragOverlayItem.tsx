import type { Item } from './types/kanban.ts';

export function DragOverlayItem({ item }: { item: Item }) {
    return (
        <div className="cursor-grabbing rounded-md border border-cyan-500 p-3 bg-gray-100 dark:bg-gray-800 shadow-lg">
            <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">⋮</span>
                <span className="dark:text-gray-200">{item.content}</span>
            </div>
        </div>
    );
}
