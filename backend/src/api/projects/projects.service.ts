import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { CreateProjectDTO, ProjectResponseDTO } from './projects.contracts';
import { RequestContext } from '../../utils/request-context';
import { ListsRepository } from '../../repositories/Lists/lists.repository';
import { CardsRepository } from '../../repositories/Cards/cards.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private projectsRepository: ProjectsRepository,
    private listRepository: ListsRepository,
    private cardsRepository: CardsRepository,
  ) {}

  public async findAll(): Promise<ProjectResponseDTO[] | null> {
    return this.projectsRepository.findAll();
  }

  public async getOne(id: number): Promise<ProjectResponseDTO | null> {
    const project = await this.projectsRepository.getOne(id);
    if (!project) throw new NotFoundException();
    return project;
  }

  public async getProjectsFully(id: number): Promise<any> {
    const project = await this.projectsRepository.getOne(id);
    if (!project) throw new NotFoundException();

    const lists = await this.listRepository.getListsByProjectId(id);

    // Отримуємо всі картки одним запитом (ефективніше)
    const listIds = lists.map((list) => list.id);
    const allCards = await this.cardsRepository.getCardsByListIds(listIds);

    // Групуємо картки за listId
    const cardsByList = allCards.reduce((acc, card) => {
      if (!acc[card.listId]) acc[card.listId] = [];
      acc[card.listId].push(card);
      return acc;
    }, {});

    // Повертаємо в нормалізованому форматі для Redux
    return {
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        listIds: lists.map((l) => l.id),
      },
      lists: lists.map((list) => ({
        id: list.id,
        title: list.title,
        position: list.position,
        projectId: list.projectId,
        cardIds: (cardsByList[list.id] || []).map((c) => c.id),
      })),
      cards: allCards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        position: card.position,
        listId: card.listId,
        assigneeId: card.assigneeId,
      })),
    };
  }

  public async create(dto: CreateProjectDTO): Promise<ProjectResponseDTO> {
    const userId = RequestContext.get<number>('userId')!;
    if (!userId) throw new NotFoundException();
    return this.projectsRepository.createWithOwner(dto, userId);
  }

  public async delete(id: number) {
    await this.projectsRepository.delete(id);
    return {
      success: true,
    };
  }
}
