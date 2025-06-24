import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { CreatePersonDto } from '../dtos/create-person.dto';

export class CreatePersonCommand {
  constructor(
    public readonly createPersonDto: CreatePersonDto,
    public readonly createdBy: RequestUserDto,
  ) {}
}
