import AbstractEntity from 'nest-crud-abstraction/dist/model/AbstractEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'dogs' })
export default class Dog extends AbstractEntity {}