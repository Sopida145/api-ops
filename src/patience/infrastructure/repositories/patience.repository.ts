import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { PatienceEntity } from '../../domain/entities/patience.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Patience } from '../persistence/patience.schema';
import { plainToInstance } from 'class-transformer';
import { CommonUtil } from 'src/common/presentation/utils/common.util';

export class PatienceRepository implements PatienceRepositoryInterface {
  constructor(
    @InjectModel('Patience')
    private readonly patienceModel: Model<Patience>,
  ) {}

  async save(patience: PatienceEntity): Promise<PatienceEntity> {
    const createdPatience = new this.patienceModel(patience);

    const savedPatience = await createdPatience.save();
    return this.mapToEntity(savedPatience);
  }

  async findById(hn: string): Promise<PatienceEntity | null> {
    // แปลง id ที่รับเข้ามาให้เป็น ObjectId ก่อนใช้ในการค้นหา
    if (!Types.ObjectId.isValid(hn)) {
      return null; // หรือสามารถโยนข้อผิดพลาดกลับไปได้เช่นกัน
    }
    const objectId = new Types.ObjectId(hn);
    const patience = await this.patienceModel.findById(objectId).exec();
    return patience ? this.mapToEntity(patience) : null;
  }

  async findByName(name: string): Promise<PatienceEntity | null> {
    const patience = await this.patienceModel.findOne({ name }).exec();
    return patience ? this.mapToEntity(patience) : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: PatienceEntity[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const sortOption: { [key: string]: 1 | -1 } = {
      [sortBy]: sortType === 'asc' ? 1 : -1,
    }; // การจัดเรียงตามฟิลด์ที่ระบุ

    const filter: any = { companyId: companyId};

    // Add keyword filter if provided
    if (keyword) {
      filter.$or = [
        {
          name: {
            $regex: CommonUtil.escapeRegExp(keyword),
            $options: 'i',
          },
        },
      ];
    }

    // Fetch total count
    const totalCount = await this.patienceModel.countDocuments(filter);

    const patiences = await this.patienceModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .exec();
    
    return {
      data: patiences.map((t) => this.mapToEntity(t)),
      totalCount,
    };
  }

  async count(): Promise<number> {
    return this.patienceModel.countDocuments().exec();
  }

  async update(patience: PatienceEntity): Promise<PatienceEntity> {
    const updatedPatience = await this.patienceModel.findByIdAndUpdate(patience.hn, patience);

    return this.mapToEntity(updatedPatience);
  }

  async delete(hn: string): Promise<void> {
    await this.patienceModel.findByIdAndDelete(hn);
  }

  private mapToEntity(patience: any): PatienceEntity {
    const plainObject = patience.toObject();
    const entity = plainToInstance(PatienceEntity, plainObject, {
      excludeExtraneousValues: true,
    });

    return entity;
  }
}
