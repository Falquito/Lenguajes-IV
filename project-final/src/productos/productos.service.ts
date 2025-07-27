import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
      private readonly productoRepository:Repository<Producto>
  ){}

  async create(createProductoDto: CreateProductoDto) {
    const product = this.productoRepository.create(createProductoDto)
    return await this.productoRepository.save(product)

  }

  async findAll() {
    return await this.productoRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productoRepository.findOneBy({id})
    if(product){
      return product
    }
    else{
      throw new NotFoundException(`No se encontro el producto con el id: ${id}`)
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    //busco el producto en mi base de datos, si no esta saltara el error del notfound
    const product = await this.findOne(id)
    const updatedProduct = this.productoRepository.merge(product,updateProductoDto)

    return await this.productoRepository.save(updatedProduct);
  }

  async softRemove(id: number) {
    let product = await this.findOne(id)

    // product = {...product,IsActive:false}
    //MERGEO LA ENTIDAD CON LA ISACTIVE FALSE
    this.productoRepository.merge(product,{IsActive:false})
    return await this.productoRepository.save(product)

  }


  async updateDiscount(objForm){
    const {descuento} = objForm
    return await this.productoRepository
    .createQueryBuilder()
    .update()
    .set({ descuento })
    .execute();
  }
}
