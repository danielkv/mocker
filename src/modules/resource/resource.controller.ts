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
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Post()
    create(@Body() createUserDto: CreateResourceDto) {
        return this.resourceService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.resourceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.resourceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateResourceDto) {
        return this.resourceService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.resourceService.remove(id);
    }
}
