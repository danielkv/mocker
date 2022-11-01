import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { MAIN_CONN } from '@shared/db/config';
import { DeleteResult } from '@shared/interfaces/responses';

import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name, MAIN_CONN)
        private projectRepository: Model<Project>,
    ) {}

    create(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectRepository.create(createProjectDto);
    }

    findAll(filter?: ProjectFilterDto): Promise<Project[]> {
        const query: FilterQuery<Project> = {};
        if (filter.name) query.name = new RegExp(filter.name, 'i');
        if (filter.userId) query.userId = filter.userId;

        return this.projectRepository.find(query).exec();
    }

    findOne(id: string): Promise<Project> {
        return this.projectRepository.findById(id).exec();
    }

    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        return this.projectRepository
            .findByIdAndUpdate(id, updateProjectDto)
            .exec();
    }

    remove(id: string): Promise<DeleteResult> {
        return this.projectRepository.deleteOne({ _id: id }).exec();
    }
}
