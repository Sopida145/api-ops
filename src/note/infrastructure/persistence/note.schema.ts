import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { NoteEntity } from 'src/note/domain/entities/note.entity';

@Schema()
export class Note extends NoteEntity {}

export const NoteSchema = SchemaFactory.createForClass(Note);
