import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePersonCommand } from './update-person.command';
import { PersonRepositoryInterface } from '../../domain/repositories/person.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { PersonEntity } from 'src/person/domain/entities/person.entity';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler
  implements ICommandHandler<UpdatePersonCommand>
{
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryInterface,
  ) {}

  async execute(command: UpdatePersonCommand): Promise<ResponseDto<PersonEntity>> {
    const { id, updatePersonDto, updatedBy  } = command;

    // หา Person จาก ID
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    Object.assign(person, updatePersonDto);
    person.updatedAt = new Date();
    person.updatedBy = updatedBy.id;
    person.companyId = updatedBy.companySelected;
    // อัปเดตข้อมูลในฐานข้อมูล
    const updPerson = await this.personRepository.update(person);
    return new ResponseDto<PersonEntity>(updPerson);
  }
}
