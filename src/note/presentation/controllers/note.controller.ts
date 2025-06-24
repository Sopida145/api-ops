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
import { CreateNoteDto } from '../../application/dtos/create-note.dto';
import { UpdateNoteDto } from '../../application/dtos/update-note.dto';
import { CreateNoteCommand } from '../../application/commands/create-note.command';
import { UpdateNoteCommand } from '../../application/commands/update-note.command';
import { GetAllNotesQuery } from '../../application/queries/get-all-notes.query';
import { RolesAndScopesGuard } from '../../../common/presentation/guards/roles-and-scopes.guard';
import { DeleteNoteCommand } from '../../application/commands/delete-note.command';
import { GetNoteByIdQuery } from '../../application/queries/get-note-by-id.query';

@ApiTags('notes')
@Controller('notes')
@ApiBearerAuth() // ใช้ Bearer Token ในการเข้าถึง API นี้
@UseGuards(RolesAndScopesGuard) // ใช้ RolesGuard กับทั้ง controller
export class NoteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note successfully created' })
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @Req() req,
  ) {
    const command = new CreateNoteCommand(
      createNoteDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes with pagination' })
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
  @ApiResponse({ status: 200, description: 'List of all notes' })
  async getAllNotes(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'asc' | 'desc',
    @Query('keyword') keyword: string,
    @Req() req,
  ) {
    sortBy = sortBy && sortBy.trim() !== '' ? sortBy : 'createdAt';
    return await this.queryBus.execute(new GetAllNotesQuery(page, limit, sortBy, sortType, keyword, req.user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({ status: 200, description: 'Note details' })
  async getNoteById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetNoteByIdQuery(id));
  }

  @Put(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiResponse({ status: 200, description: 'Note successfully updated' })
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ) {
    const command = new UpdateNoteCommand(
      id, 
      updateNoteDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiResponse({ status: 200, description: 'Note successfully deleted' })
  async deleteNote(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteNoteCommand(id));
  }
}
