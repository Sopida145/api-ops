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
    const { id } = command;

    // ตรวจสอบว่าผู้สมัครที่ต้องการลบมีอยู่ในระบบหรือไม่
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Patience with ID ${id} not found`);
    }

    // ลบผู้สมัคร
    await this.noteRepository.delete(id);
  }
  
  // async execute(command: DeleteNoteCommand): Promise<void> {
  //     const { hn } = command;
    
  //     // ✅ ค้นหาจาก hn แทน id
  //     const note = await this.noteRepository['NoteModel'].findOne({ hn });
    
  //     if (!note) {
  //       throw new NotFoundException(`note with hn ${hn} not found`);
  //     }
    
  //     // ✅ ลบจาก hn
  //     await this.noteRepository['NoteModel'].deleteOne({ hn });
  //   }
}
