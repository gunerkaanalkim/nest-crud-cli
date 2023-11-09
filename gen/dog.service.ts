import { Injectable } from '@nestjs/common';
import Dog from './dog.entity';
import DogDTO from './dog.dto';
import AbstractCrudService from 'nest-crud-abstraction/dist/service/AbstractCrudService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DogMapper from './dog.mapper';
import AbstractMapper from 'nest-crud-abstraction/dist/mapper/AbstractMapper';

@Injectable()
export class DogService extends AbstractCrudService<Dog, DogDTO> {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    private readonly dogMapper: DogMapper,
  ) {
    super();
  }

  protected getRepository(): Repository<Dog> {
    return this.dogRepository;
  }

  protected getMapper(): AbstractMapper<Dog, DogDTO> {
    return this.dogMapper;
  }
}
