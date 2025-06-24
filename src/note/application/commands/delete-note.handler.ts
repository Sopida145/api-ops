import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNoteCommand } from './delete-note.command';
import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteNoteCommand)
export class DeleteNoteHandler
  implements ICommandHandler<DeleteNoteCommand>
{
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepositoryInterface,
  ) {}

  
  async execute(command: DeleteNoteCommand): Promise<void> {
      const { hn } = command;
    
      // ✅ ค้นหาจาก hn แทน id
      const patience = await this.noteRepository['patienceModel'].findOne({ hn });
    
      if (!patience) {
        throw new NotFoundException(`Patience with hn ${hn} not found`);
      }
    
      // ✅ ลบจาก hn
      await this.noteRepository['patienceModel'].deleteOne({ hn });
    }
}
