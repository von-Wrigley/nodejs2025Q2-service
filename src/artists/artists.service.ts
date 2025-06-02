import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { artists, Art } from './artists';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateArtistDto } from './dto/createArtist.dto';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
@Injectable()
export class ArtistsService {
  artists: Art[];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private albumService: AlbumsService,
    private trackService: TracksService,
  ) {}

  getAll() {
    return artists;
  }

  create(dto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    artists.push(newArtist);
    return newArtist;
  }

  findById(artistId: string) {
    if (!uuidValidate(artistId)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = artists.find((artist) => artist.id === artistId);

    if (!x) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return x;
  }

  changeById(id: string, dto: CreateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const artist = this.findById(id);

    if (!artist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }
  delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = this.findById(id);

    if (!x) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const artistIndex = artists.findIndex((art) => art.id === id);
    artists.splice(artistIndex, 1);

    this.trackService.nullArtistId(id);
    this.albumService.NullArtistId(id);

    this.favoritesService.deleteArtistFav(id);

    return true;
  }
  getArtistforFavorites(id: string) {
    const x = artists.find((artist) => artist.id === id);
    return x;
  }
}
