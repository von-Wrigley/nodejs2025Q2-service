import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { albums, AlbumType } from './albums';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { creteAlbumDto } from './dto/creteAlbumDto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
@Injectable()
export class AlbumsService {
  albums: AlbumType[];

  constructor(
    private TrackService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll() {
    return albums;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = albums.find((album) => album.id === id);

    if (!x) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return x;
  }
  create(dto: creteAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, dto: creteAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const albumFound = albums.find((album) => album.id === id);

    if (!albumFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    albumFound.artistId = dto.artistId;
    albumFound.name = dto.name;
    albumFound.year = dto.year;
    return albumFound;
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const albumFound = albums.find((alb) => alb.id === id);

    if (!albumFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const albIndex = albums.findIndex((tr) => tr.id === id);
    albums.splice(albIndex, 1);

    this.TrackService.nullAlbumId(id);

    this.favoritesService.deleteAlbumFav(id);

    return true;
  }
  NullArtistId(id: string) {
    albums.map((album) =>
      album.artistId === id ? (album.artistId = null) : album,
    );
  }

  getAlbumForFavorites(id: string) {
    const x = albums.find((album) => album.id === id);
    return x;
  }
}
