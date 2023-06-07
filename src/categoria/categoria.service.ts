import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { Repository } from 'typeorm';



@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async create(CreateCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity> {
    const existe = await this.categoriaRepository.findOneBy({
      idProducto: CreateCategoriaDto.idProducto,
      nombre: CreateCategoriaDto.nombre.trim(),
      descripcion: CreateCategoriaDto.descripcion.trim(),

    });

    if (existe) {
      throw new ConflictException(
        `la categoria ${CreateCategoriaDto.nombre} ya existe para el producto.`,
      );
    }

    return this.categoriaRepository.save({
      idProducto: CreateCategoriaDto.idProducto,
      nombre: CreateCategoriaDto.nombre.trim(),
      descripcion: CreateCategoriaDto.descripcion.trim(),
      fechaLanzamiento: CreateCategoriaDto.fechaLanzamiento,
    });
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return this.categoriaRepository.find({ relations: { producto: true } });
  }

  async findOne(id: number): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepository.findOne({ where: {id}, relations: {producto: true}});

    if (!categoria) {
      throw new NotFoundException(`El categoria ${id} no existe.`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOneBy({id});

    if (!categoria) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    const categoriaUpdate = Object.assign(categoria, UpdateCategoriaDto);
    return this.categoriaRepository.save(categoriaUpdate);
  }

  async remove(id: number) {
    const existe = await this.categoriaRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    return this.categoriaRepository.delete(id);
  }
}
