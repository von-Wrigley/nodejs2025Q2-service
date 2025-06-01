import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { tracks, trackstype } from './tracks';
// npm test -- test/tracks.e2e.spec.ts
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { createTrackDto } from './dto/createTrackDto';
import { FavoritesService } from 'src/favorites/favorites.service';
@Injectable()
export class TracksService {
  tracks: trackstype[];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll() {
    return tracks;
  }
  getTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = tracks.find((track) => track.id === id);

    if (!x) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return x;
  }
  create(dto: createTrackDto) {
    const newtrack = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };

    tracks.push(newtrack);
    return newtrack;
  }
  changeById(id: string, dto: createTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const trackfound = tracks.find((track) => track.id === id);

    if (!trackfound) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    trackfound.name = dto.name;
    trackfound.artistId = dto.artistId;
    trackfound.albumId = dto.albumId;
    trackfound.duration = dto.duration;
    return trackfound;
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const trackFound = tracks.find((user) => user.id === id);

    if (!trackFound) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const trackIndex = tracks.findIndex((tr) => tr.id === id);
    tracks.splice(trackIndex, 1);

    this.favoritesService.deleteTrackFav(id);

    return true;
  }

  nullArtistId(id: string) {
    tracks.map((track) =>
      track.artistId === id ? (track.artistId = null) : track,
    );
  }

  nullAlbumId(id: string) {
    tracks.map((track) =>
      track.albumId === id ? (track.albumId = null) : track,
    );
  }

  getTrackForFavorites(id: string) {
    const x = tracks.find((track) => track.id === id);
    return x;
  }
}
