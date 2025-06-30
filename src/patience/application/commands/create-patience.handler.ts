import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePatienceCommand } from './create-patience.command';
import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { PatienceEntity } from '../../domain/entities/patience.entity';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';

@CommandHandler(CreatePatienceCommand)
export class CreatePatienceHandler
  implements ICommandHandler<CreatePatienceCommand>
{
  constructor(
    @Inject('PatienceRepository')
    private readonly patienceRepository: PatienceRepositoryInterface,
  ) {}

  async execute(command: CreatePatienceCommand): Promise<ResponseDto<PatienceEntity>> {
    const { createPatienceDto, createdBy } = command;
    const existingPatience = await this.patienceRepository.findByName(
      createPatienceDto.firstName,
      
    );
    if (existingPatience) {
      throw new BadRequestException('Patience already exists');
    }
    const today = new Date();
    const patience = new PatienceEntity();
    Object.assign(patience, createPatienceDto);
    patience.companyId = createdBy.companySelected;
    patience.createdBy = createdBy.hn;
    patience.createdAt = today;
    const newPatience = await this.patienceRepository.save(patience);
    return new ResponseDto<PatienceEntity>(newPatience);
  }
}
