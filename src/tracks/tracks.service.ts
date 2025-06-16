import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { trackstype } from './tracks';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { createTrackDto } from './dto/createTrackDto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma_client';
@Injectable()
export class TracksService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    const tracks = await this.prisma.track.findMany();
    console.log('DB Tracks:', tracks); // Check what's actually returned
    console.log('Current DB URL:', process.env.DATABASE_URL);

    return tracks;
  }
  async getTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return track;
  }
  // create(dto: createTrackDto) {
  //   const newtrack = {
  //     id: uuidv4(),
  //     name: dto.name,
  //     artistId: dto.artistId || null,
  //     albumId: dto.albumId ?? null,
  //     duration: dto.duration,
  //   };

  //   tracks.push(newtrack);
  //   return newtrack;
  // }

  async create(dto: createTrackDto) {
    return this.prisma.track.create({
      data: {
        name: dto.name,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : null,

        album: dto.albumId ? { connect: { id: dto.albumId } } : null,
        duration: dto.duration,
      },
    });
  }

  async changeById(id: string, dto: createTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    // const trackfound = tracks.find((track) => track.id === id);
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    // trackfound.name = dto.name;
    // trackfound.artistId = dto.artistId;
    // trackfound.albumId = dto.albumId;
    // trackfound.duration = dto.duration;
    // return trackfound;

    const x = await this.prisma.track.update({
      where: { id },
      data: {
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId || null,
        albumId: dto.albumId || null,
      },
    });
    return x;
  }

  async delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    // const trackIndex = tracks.findIndex((tr) => tr.id === id);
    // tracks.splice(trackIndex, 1);

    await this.favoritesService.deleteTrackFav(id);

    return true;
  }

  // nullArtistId(id: string) {
  //   tracks.map((track) =>
  //     track.artistId === id ? (track.artistId = null) : track,
  //   );
  // }

  // nullAlbumId(id: string) {
  //   tracks.map((track) =>
  //     track.albumId === id ? (track.albumId = null) : track,
  //   );
  // }
  async nullifyArtistId(artistId: string) {
    await this.prisma.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async nullifyAlbumId(albumId: string) {
    await this.prisma.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }
  async getTrackForFavorites(id: string) {
    const x = await this.prisma.track.findUnique({ where: { id } });
    return x;
  }
}
