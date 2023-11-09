import { Module } from '@nestjs/common';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import DogMapper from './dog.mapper';
import Dog from './dog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DogController],
  providers: [DogService, DogMapper],
  exports: [TypeOrmModule],
})
export class DogModule {}
