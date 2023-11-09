import Dog from './dog.entity';
import DogDTO from './dog.dto';
import { Injectable } from '@nestjs/common';
import AbstractMapper from 'nest-crud-abstraction/dist/mapper/AbstractMapper';

@Injectable()
export default class DogMapper extends AbstractMapper<Dog, DogDTO> {
  toDTO(entity: Dog): DogDTO {
    const dto = new DogDTO();

    return dto;
  }

  toEntity(dto: DogDTO): Dog {
    const entity = new Dog();

    return entity;
  }
}
