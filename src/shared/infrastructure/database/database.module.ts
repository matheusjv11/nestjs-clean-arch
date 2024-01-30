import { DynamicModule, Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { EnvConfigModule } from '../env-config/env-config.module'
import { PrismaClient } from '@prisma/client'

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [ConfigService, PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService,
        },
      ],
    }
  }
}
