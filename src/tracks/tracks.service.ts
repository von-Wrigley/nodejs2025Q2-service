import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { tracks, trackstype } from './tracks';
// npm test -- test/tracks.e2e.spec.ts
import { validate as uuidValidate } from 'uuid';
@Injectable()
export class TracksService {
  tracks: trackstype[];
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
}
