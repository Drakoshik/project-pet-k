import apiClient from '../client.ts';
import type { GetProjectsData } from './types.ts';
import type { NormalizedProject } from '../../store/features/kanban/types.ts';

export const projectsApi = {
    getFullProject: (data: GetProjectsData): Promise<NormalizedProject> => {
        return apiClient.get<NormalizedProject>(
            `/projects?id=${data.id}&full=${data.fullInfo}`
        );
    },
};
