import { useState } from 'react';
import { KanbanBoard } from '../kanban/KanbanBoard.tsx';

function BoardHandler() {
    const [activeTab, setActiveTab] = useState<
        'basic' | 'sortable' | 'multiple'
    >('multiple');

    return (
        <div className="mx-auto p-4">
            <div className="mb-6">
                <div className="flex border-b dark:border-gray-700">
                    <button
                        className={`px-4 py-2 ${
                            activeTab === 'multiple'
                                ? 'border-b-2 border-cyan-500 font-medium  dark:text-purple-400 text-black'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('multiple')}
                    >
                        Your Kanban Board
                    </button>
                </div>
            </div>

            <div className="rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800 min-h-[calc(75vh)]">
                {activeTab === 'multiple' && (
                    <div className="min-h-[calc(60vh)]">
                        <h2 className="mb-4 text-xl font-bold dark:text-white">
                            Project name
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            description
                        </p>
                        <KanbanBoard />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoardHandler;
