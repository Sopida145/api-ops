import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { UpdatePatienceDto } from '../dtos/update-patience.dto';

export class UpdatePatienceCommand {
  constructor(
    public readonly id: string,
    public readonly updatePatienceDto: UpdatePatienceDto,
    public readonly updatedBy: RequestUserDto,
  ) {}
}
