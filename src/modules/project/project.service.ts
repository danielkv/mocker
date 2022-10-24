import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({
      _id: new ObjectId(id).toHexString(),
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(
      { _id: new ObjectId(id).toHexString() },
      updateProjectDto,
    );
  }

  remove(id: string) {
    return this.projectRepository.delete({
      _id: new ObjectId(id).toHexString(),
    });
  }
}
