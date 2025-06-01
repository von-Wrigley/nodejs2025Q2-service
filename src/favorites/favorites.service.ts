import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { favorites, FavoritesType } from './favorites';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { validate as uuidValidate } from 'uuid';
@Injectable()
export class FavoritesService {
  constructor(
    private artistService: ArtistsService,
    private albumService: AlbumsService,
    private trackService: TracksService,
  ) {}

  getall() {
    return favorites;
  }
  createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = this.trackService.getTrack(id);

    if (!x) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.tracks.push(x);
  }
  deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const trackFound = favorites.tracks.find((user) => user.id === id);
    console.log(trackFound);
    console.log('wdwwd');

    if (!trackFound) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const trackIndex = favorites.tracks.findIndex((tr) => tr.id === id);
    favorites.tracks.splice(trackIndex, 1);

    return true;
  }

  createAbumk(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const alb = this.albumService.getById(id);

    if (!alb) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.albums.push(alb);
  }
  deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const albumFound = favorites.albums.find((user) => user.id === id);
    console.log(albumFound);
    console.log('wdwwd');

    if (!albumFound) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const AbumIndex = favorites.albums.findIndex((tr) => tr.id === id);
    favorites.albums.splice(AbumIndex, 1);

    return true;
  }

  createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.findById(id);

    if (!artist) {
      // throw new NotFoundException('NOT_FOUND')
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
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const artistIndex = favorites.artists.findIndex((tr) => tr.id === id);
    favorites.artists.splice(artistIndex, 1);

    return true;
  }
}
