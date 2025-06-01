import { Injectable } from '@nestjs/common';
import { favorites, FavoritesType } from './favorites';

@Injectable()
export class FavoritesService {
  getall() {
    return favorites;
  }
}
