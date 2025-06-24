import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPatiencesQuery } from './get-all-patiences.query';
import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { Inject } from '@nestjs/common';
import { PatienceEntity } from '../../domain/entities/patience.entity';
import { PaginatedResponseDto } from 'src/common/presentation/dtos/paginated-response.dto';

@QueryHandler(GetAllPatiencesQuery)
export class GetAllPatiencesHandler
  implements IQueryHandler<GetAllPatiencesQuery>
{
  constructor(
    @Inject('PatienceRepository')
    private readonly patienceRepository: PatienceRepositoryInterface,
  ) {}

  async execute(
    query: GetAllPatiencesQuery,
  ): Promise<PaginatedResponseDto<PatienceEntity>> {
    const { page, limit, sortBy, sortType, keyword, queryBy } = query;

    // คำนวณและดึงรายการผู้สมัครงานตาม page และ limit
    const patiences = await this.patienceRepository.findAllPaginated(
      page,
      limit,
      sortBy,
      sortType,
      keyword,
      queryBy.companySelected,
    );

    // ดึงจำนวนรายการทั้งหมด
    const totalItems = patiences.totalCount;

    // ส่งข้อมูลแบบแบ่งหน้า
    return new PaginatedResponseDto(patiences.data, totalItems, limit, page);
  }
}
