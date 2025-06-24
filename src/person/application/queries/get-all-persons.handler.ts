import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPersonsQuery } from './get-all-persons.query';
import { PersonRepositoryInterface } from '../../domain/repositories/person.repository.interface';
import { Inject } from '@nestjs/common';
import { PersonEntity } from '../../domain/entities/person.entity';
import { PaginatedResponseDto } from 'src/common/presentation/dtos/paginated-response.dto';

@QueryHandler(GetAllPersonsQuery)
export class GetAllPersonsHandler
  implements IQueryHandler<GetAllPersonsQuery>
{
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryInterface,
  ) {}

  async execute(
    query: GetAllPersonsQuery,
  ): Promise<PaginatedResponseDto<PersonEntity>> {
    const { page, limit, sortBy, sortType, keyword, queryBy } = query;

    // คำนวณและดึงรายการผู้สมัครงานตาม page และ limit
    const persons = await this.personRepository.findAllPaginated(
      page,
      limit,
      sortBy,
      sortType,
      keyword,
      queryBy.companySelected,
    );

    // ดึงจำนวนรายการทั้งหมด
    const totalItems = persons.totalCount;

    // ส่งข้อมูลแบบแบ่งหน้า
    return new PaginatedResponseDto(persons.data, totalItems, limit, page);
  }
}
