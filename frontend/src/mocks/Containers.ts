import type { List } from '../components/kanban/types/kanban.ts';

const containerData: List[] = [
    {
        id: 'todo',
        title: 'To Do',
        items: [
            {
                id: 'task-1',
                description: 'Research @dnd-kit',
            },
            {
                id: 'task-2',
                description:
                    'Create basic example Create basic example Create basic example Create basic example Create basic example Create basic example',
            },
            {
                id: 'task-3',
                description: 'Write tutorial',
            },
        ],
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        items: [
            {
                id: 'task-4',
                description: 'Record demo video',
            },
        ],
    },

    {
        id: 'done',
        title: 'Done',
        items: [
            {
                id: 'task-5',
                description: 'Setup project',
            },
        ],
    },
    {
        id: 'done1',
        title: 'Done1',
        items: [
            {
                id: 'task-51',
                description: 'Setup project',
            },
        ],
    },
    {
        id: 'done2',
        title: 'Done2',
        items: [
            {
                id: 'task-52',
                description: 'Setup project',
            },
        ],
    },
];

export default containerData;
