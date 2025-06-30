import { NoteEntity } from '../entities/note.entity';

export interface NoteRepositoryInterface {
  // บันทึกข้อมูลใหม่
  save(note: NoteEntity): Promise<NoteEntity>;

  // ค้นหาโดยใช้ ID
  findById(hn: string): Promise<NoteEntity | null>;

  // ค้นหาโดยใช้ Name
  findByName(bloodPressure: string): Promise<NoteEntity | null>;

  // ดึงข้อมูลทั้งหมด (แบบแบ่งหน้า)
  findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: NoteEntity[]; totalCount: number }>

  // นับจำนวนทั้งหมด
  count(): Promise<number>;

  // อัปเดตข้อมูล
  update(note: NoteEntity): Promise<NoteEntity>;

  // ลบตาม ID
  delete(hn: string): Promise<void>;
}
