import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { CreatePatienceDto } from '../dtos/create-patience.dto';

export class CreatePatienceCommand {
  constructor(
    public readonly createPatienceDto: CreatePatienceDto,
    public readonly createdBy: RequestUserDto,
  ) {}
}
