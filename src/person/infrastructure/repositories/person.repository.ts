import { PersonRepositoryInterface } from '../../domain/repositories/person.repository.interface';
import { PersonEntity } from '../../domain/entities/person.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Person } from '../persistence/person.schema';
import { plainToInstance } from 'class-transformer';
import { CommonUtil } from 'src/common/presentation/utils/common.util';

export class PersonRepository implements PersonRepositoryInterface {
  constructor(
    @InjectModel('Person')
    private readonly personModel: Model<Person>,
  ) {}

  async save(person: PersonEntity): Promise<PersonEntity> {
    const createdPerson = new this.personModel(person);

    const savedPerson = await createdPerson.save();
    return this.mapToEntity(savedPerson);
  }

  async findById(id: string): Promise<PersonEntity | null> {
    // แปลง id ที่รับเข้ามาให้เป็น ObjectId ก่อนใช้ในการค้นหา
    if (!Types.ObjectId.isValid(id)) {
      return null; // หรือสามารถโยนข้อผิดพลาดกลับไปได้เช่นกัน
    }
    const objectId = new Types.ObjectId(id);
    const person = await this.personModel.findById(objectId).exec();
    return person ? this.mapToEntity(person) : null;
  }

  async findByName(name: string): Promise<PersonEntity | null> {
    const person = await this.personModel.findOne({ name }).exec();
    return person ? this.mapToEntity(person) : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: PersonEntity[]; totalCount: number }> {
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
    const totalCount = await this.personModel.countDocuments(filter);

    const persons = await this.personModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .exec();
    
    return {
      data: persons.map((t) => this.mapToEntity(t)),
      totalCount,
    };
  }

  async count(): Promise<number> {
    return this.personModel.countDocuments().exec();
  }

  async update(person: PersonEntity): Promise<PersonEntity> {
    const updatedPerson = await this.personModel.findByIdAndUpdate(person.id, person);

    return this.mapToEntity(updatedPerson);
  }

  async delete(id: string): Promise<void> {
    await this.personModel.findByIdAndDelete(id);
  }

  private mapToEntity(person: any): PersonEntity {
    const plainObject = person.toObject();
    const entity = plainToInstance(PersonEntity, plainObject, {
      excludeExtraneousValues: true,
    });

    return entity;
  }
}
