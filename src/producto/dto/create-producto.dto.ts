import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateProductoDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
    readonly nombre: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo marca no debe ser vacío' })
    @IsString({ message: 'El campo marca debe ser de tipo cadena' })
    @MaxLength(30, { message: 'El campo marca no debe ser mayor a 30 caracteres' })
    readonly marca: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precio no debe ser vacío' })
    @IsString({ message: 'El campo precio debe ser de tipo cadena' })
    @MaxLength(30, { message: 'El campo precio no debe ser mayor a 30 caracteres' })
    readonly precio: string;

}
