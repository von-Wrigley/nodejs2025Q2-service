import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { artists, Art } from './artists';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateArtistDto } from './dto/createArtist.dto';
@Injectable()
export class ArtistsService {
  artists: Art[];

  getAll() {
    console.log(artists);
    return artists;
  }

  create(dto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    artists.push(newArtist);
    return artists;
  }

  findById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = artists.find((task) => task.id === id);

    if (!x) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return x;
  }
}
