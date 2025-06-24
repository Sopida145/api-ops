import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePatienceCommand } from './delete-patience.command';
import { PatienceRepositoryInterface } from '../../domain/repositories/patience.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePatienceCommand)
export class DeletePatienceHandler
  implements ICommandHandler<DeletePatienceCommand>
{
  constructor(
    @Inject('PatienceRepository')
    private readonly patienceRepository: PatienceRepositoryInterface,
  ) {}

  // async execute(command: DeletePatienceCommand): Promise<void> {
  //   const { hn } = command;

  //   // ตรวจสอบว่าผู้สมัครที่ต้องการลบมีอยู่ในระบบหรือไม่
  //   const patience = await this.patienceRepository.findById(hn);
  //   if (!patience) {
  //     throw new NotFoundException(`Patience with ID ${hn} not found`);
  //   }

  //   // ลบผู้สมัคร
  //   await this.patienceRepository.delete(hn);
  // }

  async execute(command: DeletePatienceCommand): Promise<void> {
    const { hn } = command;
  
    // ✅ ค้นหาจาก hn แทน id
    const patience = await this.patienceRepository['patienceModel'].findOne({ hn });
  
    if (!patience) {
      throw new NotFoundException(`Patience with hn ${hn} not found`);
    }
  
    // ✅ ลบจาก hn
    await this.patienceRepository['patienceModel'].deleteOne({ hn });
  }
}
