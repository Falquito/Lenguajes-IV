import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientRepository:Repository<Cliente>
  ){}
  async create(createClienteDto: CreateClienteDto) {
    const client = this.clientRepository.create(createClienteDto)
    return await this.clientRepository.save(client)
  }

  async findAll() {
    return await this.clientRepository.find()
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({id}) 
    if(client){
      return client
    }else{
      throw new NotFoundException(`No se encuentra el cliente con el id ${id}`)
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const client = await this.findOne(id)
    await this.clientRepository.merge(client,updateClienteDto)
    return await this.clientRepository.save(client)
  }

  async remove(id: number) {
    const client  = await this.findOne(id)
    this.clientRepository.merge(client,{IsActive:false})
    return await this.clientRepository.save(client)
  }
}
