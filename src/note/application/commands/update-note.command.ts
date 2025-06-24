import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { UpdateNoteDto } from '../dtos/update-note.dto';

export class UpdateNoteCommand {
  constructor(
    public readonly id: string,
    public readonly updateNoteDto: UpdateNoteDto,
    public readonly updatedBy: RequestUserDto,
  ) {}
}
