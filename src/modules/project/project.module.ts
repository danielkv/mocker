import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_CONN } from '@shared/db/config';

import { Project, ProjectSchema } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Project.name, schema: ProjectSchema }],
            MAIN_CONN,
        ),
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
