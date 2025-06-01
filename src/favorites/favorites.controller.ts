import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
// npm test -- test/favorites.e2e.spec.ts
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getall();
  }
}
