import type { Container } from '../components/kanban/types/kanban.ts';

const containerData: Container[] = [
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
                content:
                    'Create basic example Create basic example Create basic example Create basic example Create basic example Create basic example',
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
    {
        id: 'done1',
        title: 'Done1',
        items: [
            {
                id: 'task-51',
                content: 'Setup project',
            },
        ],
    },
    {
        id: 'done2',
        title: 'Done2',
        items: [
            {
                id: 'task-52',
                content: 'Setup project',
            },
        ],
    },
];

export default containerData;
