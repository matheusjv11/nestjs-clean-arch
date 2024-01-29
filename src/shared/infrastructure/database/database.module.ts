import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { EnvConfigModule } from '../env-config/env-config.module'

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [ConfigService, PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
