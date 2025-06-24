import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { PatienceEntity } from 'src/patience/domain/entities/patience.entity';

@Schema()
export class Patience extends PatienceEntity {}

export const PatienceSchema = SchemaFactory.createForClass(Patience);
