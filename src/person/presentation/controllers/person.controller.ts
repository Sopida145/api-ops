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
import { CreatePersonDto } from '../../application/dtos/create-person.dto';
import { UpdatePersonDto } from '../../application/dtos/update-person.dto';
import { CreatePersonCommand } from '../../application/commands/create-person.command';
import { UpdatePersonCommand } from '../../application/commands/update-person.command';
import { GetAllPersonsQuery } from '../../application/queries/get-all-persons.query';
import { RolesAndScopesGuard } from '../../../common/presentation/guards/roles-and-scopes.guard';
import { DeletePersonCommand } from '../../application/commands/delete-person.command';
import { GetPersonByIdQuery } from '../../application/queries/get-person-by-id.query';

@ApiTags('persons')
@Controller('persons')
@ApiBearerAuth() // ใช้ Bearer Token ในการเข้าถึง API นี้
@UseGuards(RolesAndScopesGuard) // ใช้ RolesGuard กับทั้ง controller
export class PersonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Create a new person' })
  @ApiResponse({ status: 201, description: 'Person successfully created' })
  async createPerson(
    @Body() createPersonDto: CreatePersonDto,
    @Req() req,
  ) {
    const command = new CreatePersonCommand(
      createPersonDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all persons with pagination' })
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
  @ApiResponse({ status: 200, description: 'List of all persons' })
  async getAllPersons(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'asc' | 'desc',
    @Query('keyword') keyword: string,
    @Req() req,
  ) {
    sortBy = sortBy && sortBy.trim() !== '' ? sortBy : 'createdAt';
    return await this.queryBus.execute(new GetAllPersonsQuery(page, limit, sortBy, sortType, keyword, req.user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person by ID' })
  @ApiResponse({ status: 200, description: 'Person details' })
  async getPersonById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetPersonByIdQuery(id));
  }

  @Put(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Update a person by ID' })
  @ApiResponse({ status: 200, description: 'Person successfully updated' })
  async updatePerson(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @Req() req,
  ) {
    const command = new UpdatePersonCommand(
      id, 
      updatePersonDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Delete a person by ID' })
  @ApiResponse({ status: 200, description: 'Person successfully deleted' })
  async deletePerson(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeletePersonCommand(id));
  }
}
