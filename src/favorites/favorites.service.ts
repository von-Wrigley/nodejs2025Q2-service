import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { favorites } from './favorites';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { validate as uuidValidate } from 'uuid';
@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private trackService: TracksService,
  ) {}

  getall() {
    return favorites;
  }
  createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const x = this.trackService.getTrackForFavorites(id);
    if (!x) {
      throw new HttpException('Not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.tracks.push(x);
  }
  deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const trackFound = favorites.tracks.find((user) => user.id === id);

    if (!trackFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const trackIndex = favorites.tracks.findIndex((tr) => tr.id === id);
    favorites.tracks.splice(trackIndex, 1);

    return true;
  }

  deleteTrackFav(id: string) {
    const trackIndex = favorites.tracks.findIndex((tr) => tr.id === id);
    favorites.tracks.splice(trackIndex, 1);
  }

  createAbumk(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const alb = this.albumService.getAlbumForFavorites(id);

    if (!alb) {
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.albums.push(alb);
  }
  deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const albumFound = favorites.albums.find((user) => user.id === id);

    if (!albumFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const AbumIndex = favorites.albums.findIndex((tr) => tr.id === id);
    favorites.albums.splice(AbumIndex, 1);

    return true;
  }
  deleteAlbumFav(id: string) {
    const AbumIndex = favorites.albums.findIndex((tr) => tr.id === id);
    favorites.albums.splice(AbumIndex, 1);
  }

  createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.getArtistforFavorites(id);

    if (!artist) {
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.artists.push(artist);
  }
  deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const artistFound = favorites.artists.find((user) => user.id === id);
    if (!artistFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const artistIndex = favorites.artists.findIndex((tr) => tr.id === id);
    favorites.artists.splice(artistIndex, 1);

    return true;
  }
  deleteArtistFav(id: string) {
    const artistIndex = favorites.artists.findIndex((tr) => tr.id === id);
    favorites.artists.splice(artistIndex, 1);
  }
}
