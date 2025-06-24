import { PatienceEntity } from '../entities/patience.entity';

export interface PatienceRepositoryInterface {
  // บันทึกข้อมูลใหม่
  save(patience: PatienceEntity): Promise<PatienceEntity>;

  // ค้นหาโดยใช้ ID
  findById(id: string): Promise<PatienceEntity | null>;

  // ค้นหาโดยใช้ Name
  findByName(firstName: string): Promise<PatienceEntity | null>;

  // ดึงข้อมูลทั้งหมด (แบบแบ่งหน้า)
  findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: PatienceEntity[]; totalCount: number }>

  // นับจำนวนทั้งหมด
  count(): Promise<number>;

  // อัปเดตข้อมูล
  update(patience: PatienceEntity): Promise<PatienceEntity>;

  // ลบตาม ID
  delete(hn: string): Promise<void>;
}
