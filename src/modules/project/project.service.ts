import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private projectRepository: Model<Project>,
    ) {}

    create(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectRepository.create(createProjectDto);
    }

    findAll(filter?: ProjectFilterDto) {
        const query: FilterQuery<Project> = {};
        if (filter.name) query.name = new RegExp(filter.name, 'i');
        if (filter.userId) query.userId = filter.userId;

        return this.projectRepository.find(query);
    }

    findOne(id: string) {
        return this.projectRepository.findById(id);
    }

    update(id: string, updateProjectDto: UpdateProjectDto) {
        return this.projectRepository.updateOne({ _id: id }, updateProjectDto);
    }

    remove(id: string) {
        return this.projectRepository.deleteOne({ _id: id });
    }
}
