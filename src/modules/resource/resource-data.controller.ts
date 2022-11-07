import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceData } from './interfaces/resources';
import { ResourceDataService } from './resource-data.service';

@Controller('api/:projectId/:resourcePath')
export class ResourceDataController {
    constructor(private resourceDataService: ResourceDataService) {}

    @Post()
    async create(
        @Param('projectId') projectId: string,
        @Param('resourcePath') resourcePath: string,
        @Body() createUserDto: CreateResourceDto,
    ) {
        return this.resourceDataService.create(
            projectId,
            resourcePath,
            createUserDto,
        );
    }

    @Get()
    findAll(
        @Param('projectId') projectId: string,
        @Param('resourcePath') resourcePath: string,
    ) {
        return this.resourceDataService.findAll(projectId, resourcePath);
    }

    @Get(':id')
    findOne(
        @Param('projectId') projectId: string,
        @Param('resourcePath') resourcePath: string,
        @Param('id') id: string,
    ) {
        return this.resourceDataService.findOne(projectId, resourcePath, id);
    }

    @Patch(':id')
    update(
        @Param('projectId') projectId: string,
        @Param('resourcePath') resourcePath: string,
        @Param('id') id: string,
        @Body() data: ResourceData,
    ) {
        return this.resourceDataService.update(
            projectId,
            resourcePath,
            id,
            data,
        );
    }

    @Delete(':id')
    remove(
        @Param('projectId') projectId: string,
        @Param('resourcePath') resourcePath: string,
        @Param('id') id: string,
    ) {
        return this.resourceDataService.remove(projectId, resourcePath, id);
    }
}
