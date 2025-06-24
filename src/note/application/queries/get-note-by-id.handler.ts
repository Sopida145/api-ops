import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { GetNoteByIdQuery } from './get-note-by-id.query';
import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { NoteEntity } from '../../domain/entities/note.entity';

@QueryHandler(GetNoteByIdQuery)
export class GetNoteByIdHandler
  implements IQueryHandler<GetNoteByIdQuery>
{
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepositoryInterface,
  ) {}

  async execute(query: GetNoteByIdQuery): Promise<ResponseDto<NoteEntity>> {
    const { id } = query;

    // ดึงข้อมูลผู้สมัครตาม ID
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return new ResponseDto<NoteEntity>(note);
  }
}
