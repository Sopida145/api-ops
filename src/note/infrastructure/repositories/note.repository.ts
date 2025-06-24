import { NoteRepositoryInterface } from '../../domain/repositories/note.repository.interface';
import { NoteEntity } from '../../domain/entities/note.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note } from '../persistence/note.schema';
import { plainToInstance } from 'class-transformer';
import { CommonUtil } from 'src/common/presentation/utils/common.util';

export class NoteRepository implements NoteRepositoryInterface {
  constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<Note>,
  ) {}

  async save(note: NoteEntity): Promise<NoteEntity> {
    const createdNote = new this.noteModel(note);

    const savedNote = await createdNote.save();
    return this.mapToEntity(savedNote);
  }

  async findById(id: string): Promise<NoteEntity | null> {
    // แปลง id ที่รับเข้ามาให้เป็น ObjectId ก่อนใช้ในการค้นหา
    if (!Types.ObjectId.isValid(id)) {
      return null; // หรือสามารถโยนข้อผิดพลาดกลับไปได้เช่นกัน
    }
    const objectId = new Types.ObjectId(id);
    const note = await this.noteModel.findById(objectId).exec();
    return note ? this.mapToEntity(note) : null;
  }

  async findByName(name: string): Promise<NoteEntity | null> {
    const note = await this.noteModel.findOne({ name }).exec();
    return note ? this.mapToEntity(note) : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: NoteEntity[]; totalCount: number }> {
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
    const totalCount = await this.noteModel.countDocuments(filter);

    const notes = await this.noteModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .exec();
    
    return {
      data: notes.map((t) => this.mapToEntity(t)),
      totalCount,
    };
  }

  async count(): Promise<number> {
    return this.noteModel.countDocuments().exec();
  }

  async update(note: NoteEntity): Promise<NoteEntity> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(note.id, note);

    return this.mapToEntity(updatedNote);
  }

  async delete(id: string): Promise<void> {
    await this.noteModel.findByIdAndDelete(id);
  }

  private mapToEntity(note: any): NoteEntity {
    const plainObject = note.toObject();
    const entity = plainToInstance(NoteEntity, plainObject, {
      excludeExtraneousValues: true,
    });

    return entity;
  }
}
