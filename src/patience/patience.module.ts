import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Reflector } from '@nestjs/core';
import { RolesAndScopesGuard } from 'src/common/presentation/guards/roles-and-scopes.guard';
import { PatienceController } from './presentation/controllers/patience.controller';
import { CreatePatienceHandler } from './application/commands/create-patience.handler';
import { UpdatePatienceHandler } from './application/commands/update-patience.handler';
import { DeletePatienceHandler } from './application/commands/delete-patience.handler';
import { GetAllPatiencesHandler } from './application/queries/get-all-patiences.handler';
import { GetPatienceByIdHandler } from './application/queries/get-patience-by-id.handler';
import { PatienceRepository } from './infrastructure/repositories/patience.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PatienceSchema } from './infrastructure/persistence/patience.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Patience', schema: PatienceSchema }])
  ],
  controllers: [PatienceController],
  providers: [
    Reflector,
    RolesAndScopesGuard,
    CreatePatienceHandler,
    UpdatePatienceHandler,
    DeletePatienceHandler,
    GetAllPatiencesHandler,
    GetPatienceByIdHandler,
    {
      provide: 'PatienceRepository',
      useClass: PatienceRepository,
    },
  ],
})
export class PatienceModule {}
