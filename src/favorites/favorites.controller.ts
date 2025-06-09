import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getall();
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    return this.favoritesService.createTrack(id);
  }
  @HttpCode(204)
  @Delete('track/:id')
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.createAbumk(id);
  }
  @HttpCode(204)
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  createArists(@Param('id') id: string) {
    return this.favoritesService.createArtist(id);
  }
  @HttpCode(204)
  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
