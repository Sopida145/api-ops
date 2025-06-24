import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { CreateNoteDto } from '../dtos/create-note.dto';

export class CreateNoteCommand {
  constructor(
    public readonly createNoteDto: CreateNoteDto,
    public readonly createdBy: RequestUserDto,
  ) {}
}
