import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNoteCommand } from './create-note.command';
import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { NoteEntity } from '../../domain/entities/note.entity';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler
  implements ICommandHandler<CreateNoteCommand>
{
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepositoryInterface,
  ) {}

  async execute(command: CreateNoteCommand): Promise<ResponseDto<NoteEntity>> {
    const { createNoteDto, createdBy } = command;
    const existingNote = await this.noteRepository.findByName(
      createNoteDto.hn,
    );
    if (existingNote) {
      throw new BadRequestException('Note already exists');
    }
    const today = new Date();
    const note = new NoteEntity();
    Object.assign(note, createNoteDto);
    note.companyId = createdBy.companySelected;
    note.createdBy = createdBy.id;
    note.createdAt = today;
    const newNote = await this.noteRepository.save(note);
    return new ResponseDto<NoteEntity>(newNote);
  }
}
