import { Controller } from '@nestjs/common';
import { DogService } from './dog.service';
import Dog from './dog.entity';
import DogDTO from './dog.dto';
import AbstractController from 'nest-crud-abstraction/dist/controller/AbstractController';
import AbstractCrudService from 'nest-crud-abstraction/dist/service/AbstractCrudService';

@Controller('/dogs')
export class DogController extends AbstractController<Dog, DogDTO> {
  constructor(private readonly dogService: DogService) {
    super();
  }

  protected getService(): AbstractCrudService<Dog, DogDTO> {
    return this.dogService;
  }
}
