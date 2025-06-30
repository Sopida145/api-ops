import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePatienceDto } from '../../application/dtos/create-patience.dto';
import { UpdatePatienceDto } from '../../application/dtos/update-patience.dto';
import { CreatePatienceCommand } from '../../application/commands/create-patience.command';
import { UpdatePatienceCommand } from '../../application/commands/update-patience.command';
import { GetAllPatiencesQuery } from '../../application/queries/get-all-patiences.query';
import { RolesAndScopesGuard } from '../../../common/presentation/guards/roles-and-scopes.guard';
import { DeletePatienceCommand } from '../../application/commands/delete-patience.command';
import { GetPatienceByIdQuery } from '../../application/queries/get-patience-by-id.query';

@ApiTags('patiences')
@Controller('patiences')
@ApiBearerAuth() // ใช้ Bearer Token ในการเข้าถึง API นี้
@UseGuards(RolesAndScopesGuard) // ใช้ RolesGuard กับทั้ง controller
export class PatienceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Create a new patience' })
  @ApiResponse({ status: 201, description: 'Patience successfully created' })
  async createPatience(
    @Body() createPatienceDto: CreatePatienceDto,
    @Req() req,
  ) {
    const command = new CreatePatienceCommand(
      createPatienceDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patiences with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'sort by field name',
    type: String,
  })
  @ApiQuery({
    name: 'sortType',
    required: false,
    description: 'sort type order by asc desc',
    type: String,
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'keyword for search',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'List of all patiences' })
  async getAllPatiences(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'asc' | 'desc',
    @Query('keyword') keyword: string,
    @Req() req,
  ) {
    sortBy = sortBy && sortBy.trim() !== '' ? sortBy : 'createdAt';
    return await this.queryBus.execute(new GetAllPatiencesQuery(page, limit, sortBy, sortType, keyword, req.user));
  }

  @Get(':hn')
  @ApiOperation({ summary: 'Get a patience by ID' })
  @ApiResponse({ status: 200, description: 'Patience details' })
  async getPatienceById(@Param('hn') hn: string) {
    return await this.queryBus.execute(new GetPatienceByIdQuery(hn));
  }

  

  @Put(':hn')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Update a patience by ID' })
  @ApiResponse({ status: 200, description: 'Patience successfully updated' })
  async updatePatience(
    @Param('hn') hn: string,
    @Body() updatePatienceDto: UpdatePatienceDto,
    @Req() req,
  ) {
    const command = new UpdatePatienceCommand(
      hn, 
      updatePatienceDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Delete a patience by ID' })
  @ApiResponse({ status: 200, description: 'Patience successfully deleted' })
  async deletePatience(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeletePatienceCommand(id));
  }
}
