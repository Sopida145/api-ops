import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateNoteCommand } from './update-note.command';
import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { NoteEntity } from 'src/note/domain/entities/note.entity';

@CommandHandler(UpdateNoteCommand)
export class UpdateNoteHandler
  implements ICommandHandler<UpdateNoteCommand>
{
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepositoryInterface,
  ) {}

  async execute(command: UpdateNoteCommand): Promise<ResponseDto<NoteEntity>> {
    const { id, updateNoteDto, updatedBy  } = command;

    // หา Note จาก ID
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    Object.assign(note, updateNoteDto);
    note.updatedAt = new Date();
    note.updatedBy = updatedBy.id;
    note.companyId = updatedBy.companySelected;
    // อัปเดตข้อมูลในฐานข้อมูล
    const updNote = await this.noteRepository.update(note);
    return new ResponseDto<NoteEntity>(updNote);
  }
}
