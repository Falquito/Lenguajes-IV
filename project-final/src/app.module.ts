import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { OrdenesModule } from './ordenes/ordenes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,//carga automaticamente las entidades
      synchronize:true //los cambios en las tablas se sincronizan
    }),
    ProductosModule,
    ClientesModule,
    OrdenesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
