import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordene } from './entities/ordene.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Ordene)
    private readonly ordenRepository:Repository<Ordene>
  ){}

  async create(createOrdeneDto: CreateOrdeneDto) {
    const orden= this.ordenRepository.create(createOrdeneDto)
    return await this.ordenRepository.save(orden)
  }

  async findAll() {
    return await this.ordenRepository.find()
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOneBy({id})
    if(orden){
      return orden;
    }else{
      throw new NotFoundException(`No se encontro la orden con el id: ${id}`)
    }
  }

  async update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    const orden = await this.findOne(id)
    this.ordenRepository.merge(orden,updateOrdeneDto)
    return this.ordenRepository.save(orden)
  }

  async remove(id: number) {
    const orden = await this.findOne(id)
    this.ordenRepository.merge(orden,{IsActive:false})
    return this.ordenRepository.save(orden)
  }
}
