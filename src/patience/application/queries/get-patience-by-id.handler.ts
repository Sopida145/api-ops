import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { GetPatienceByIdQuery } from './get-patience-by-id.query';
import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { PatienceEntity } from '../../domain/entities/patience.entity';

@QueryHandler(GetPatienceByIdQuery)
export class GetPatienceByIdHandler
  implements IQueryHandler<GetPatienceByIdQuery>
{
  constructor(
    @Inject('PatienceRepository')
    private readonly patienceRepository: PatienceRepositoryInterface,
  ) {}

  async execute(query: GetPatienceByIdQuery): Promise<ResponseDto<PatienceEntity>> {
    const { id } = query;

    // ดึงข้อมูลผู้สมัครตาม ID
    const patience = await this.patienceRepository.findById(id);
    if (!patience) {
      throw new NotFoundException(`Patience with ID ${id} not found`);
    }

    return new ResponseDto<PatienceEntity>(patience);
  }
}
