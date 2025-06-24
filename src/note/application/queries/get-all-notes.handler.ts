import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllNotesQuery } from './get-all-notes.query';
import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { Inject } from '@nestjs/common';
import { NoteEntity } from '../../domain/entities/note.entity';
import { PaginatedResponseDto } from 'src/common/presentation/dtos/paginated-response.dto';

@QueryHandler(GetAllNotesQuery)
export class GetAllNotesHandler
  implements IQueryHandler<GetAllNotesQuery>
{
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepositoryInterface,
  ) {}

  async execute(
    query: GetAllNotesQuery,
  ): Promise<PaginatedResponseDto<NoteEntity>> {
    const { page, limit, sortBy, sortType, keyword, queryBy } = query;

    // คำนวณและดึงรายการผู้สมัครงานตาม page และ limit
    const notes = await this.noteRepository.findAllPaginated(
      page,
      limit,
      sortBy,
      sortType,
      keyword,
      queryBy.companySelected,
    );

    // ดึงจำนวนรายการทั้งหมด
    const totalItems = notes.totalCount;

    // ส่งข้อมูลแบบแบ่งหน้า
    return new PaginatedResponseDto(notes.data, totalItems, limit, page);
  }
}
