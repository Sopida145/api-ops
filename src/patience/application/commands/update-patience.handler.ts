import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePatienceCommand } from './update-patience.command';
import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { PatienceEntity } from 'src/patience/domain/entities/patience.entity';

@CommandHandler(UpdatePatienceCommand)
export class UpdatePatienceHandler
  implements ICommandHandler<UpdatePatienceCommand>
{
  constructor(
    @Inject('PatienceRepository')
    private readonly patienceRepository: PatienceRepositoryInterface,
  ) {}

  async execute(command: UpdatePatienceCommand): Promise<ResponseDto<PatienceEntity>> {
    const { id, updatePatienceDto, updatedBy  } = command;

    // หา Patience จาก ID
    const patience = await this.patienceRepository.findById(id);
    if (!patience) {
      throw new NotFoundException(`Patience with HN ${id} not found`);
    }

    Object.assign(patience, updatePatienceDto);
    patience.updatedAt = new Date();
    patience.updatedBy = updatedBy.id;
    patience.companyId = updatedBy.companySelected;
    // อัปเดตข้อมูลในฐานข้อมูล
    const updPatience = await this.patienceRepository.update(patience);
    return new ResponseDto<PatienceEntity>(updPatience);
  }
}
