import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';

import { PaginatedResponse } from '@shared/interfaces/responses';

import { PolicesGuard } from '@modules/auth/guards/polices.guard';
import { CheckPolicies } from '@modules/auth/helpers/auth';
import { AuthenticatedRequest } from '@modules/auth/interfaces/auth';
import { Action } from '@modules/auth/interfaces/authorization';

import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceQueryDto } from './dto/resource-fields.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { ResourceDataHelperService } from './resource-data-helper.service';
import { ResourceService } from './resource.service';

@UseGuards(PolicesGuard)
@Controller('resource')
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceDataGeneratorService: ResourceDataHelperService,
    ) {}

    @Post()
    create(@Body() createUserDto: CreateResourceDto) {
        return this.resourceService.create(createUserDto);
    }

    @CheckPolicies((ability) => ability.can(Action.Read, Resource))
    @Get()
    findAll(
        @Request() req: AuthenticatedRequest,
        @Query() requestQuery: ResourceQueryDto,
    ): Promise<PaginatedResponse<Resource>> {
        if (!req.ability.can(Action.Manage, Resource))
            requestQuery.userId = req.user._id;

        return this.resourceService.findAll(requestQuery);
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

    @Post('/generate/:id')
    generate(
        @Param('id') id: string,
        @Query('numberOfRows') numberOfRows: number,
    ) {
        return this.resourceDataGeneratorService.generate(id, numberOfRows);
    }
}
