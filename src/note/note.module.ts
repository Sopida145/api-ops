import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Reflector } from '@nestjs/core';
import { RolesAndScopesGuard } from 'src/common/presentation/guards/roles-and-scopes.guard';
import { NoteController } from './presentation/controllers/note.controller';
import { CreateNoteHandler } from './application/commands/create-note.handler';
import { UpdateNoteHandler } from './application/commands/update-note.handler';
import { DeleteNoteHandler } from './application/commands/delete-note.handler';
import { GetAllNotesHandler } from './application/queries/get-all-notes.handler';
import { GetNoteByIdHandler } from './application/queries/get-note-by-id.handler';
import { NoteRepository } from './infrastructure/repositories/note.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './infrastructure/persistence/note.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])
  ],
  controllers: [NoteController],
  providers: [
    Reflector,
    RolesAndScopesGuard,
    CreateNoteHandler,
    UpdateNoteHandler,
    DeleteNoteHandler,
    GetAllNotesHandler,
    GetNoteByIdHandler,
    {
      provide: 'NoteRepository',
      useClass: NoteRepository,
    },
  ],
})
export class NoteModule {}
