import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { creteAlbumDto } from './dto/creteAlbumDto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.albumsService.getById(id);
  }
  @Post()
  createAlbum(@Body() dto: creteAlbumDto) {
    return this.albumsService.create(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  changeById(@Param('id') id: string, @Body() dto: creteAlbumDto) {
    return this.albumsService.update(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.albumsService.delete(id);
  }
}
